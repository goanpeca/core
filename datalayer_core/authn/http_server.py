# Copyright (c) 2023-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

"""HTTP server for authentication in Datalayer Core."""

from __future__ import annotations

import contextlib
import json
import logging
import signal
import socket
import sys
import typing as t
import urllib
import urllib.parse
from http import HTTPStatus
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from socketserver import BaseRequestHandler

from datalayer_core.__version__ import __version__
from datalayer_core.authn.keys import DATALAYER_IAM_TOKEN_KEY, DATALAYER_IAM_USER_KEY
from datalayer_core.authn.pages import AUTH_SUCCESS_PAGE, LANDING_PAGE, OAUTH_ERROR_PAGE
from datalayer_core.authn.state import set_server_port
from datalayer_core.serverapplication import launch_new_instance
from datalayer_core.utils.utils import find_http_port

HERE = Path(__file__).parent


# Do not set it to True, the Jupyter Server
# handlers are not yet implemented.
USE_JUPYTER_SERVER_FOR_LOGIN: bool = False


logger = logging.getLogger(__name__)


class LoginRequestHandler(SimpleHTTPRequestHandler):
    """
    Handle HTTP requests for authentication flow.

    This handler serves static files from a directory and handles
    receiving the authentication token for CLI usage.
    """

    server_version = "LoginHTTP/" + __version__

    def _save_token(self, query: str) -> None:
        """
        Save authentication token from OAuth callback.

        Parameters
        ----------
        query : str
            The query string from the OAuth callback URL.
        """
        arguments = urllib.parse.parse_qs(query)
        error = arguments.get("error", [""])[0]
        if error:
            provider = arguments.get("provider", ["<unknown>"])[0]
            content = OAUTH_ERROR_PAGE.format(
                error=error,
                provider=provider,
                base_url="/",
            ).encode("utf-8")
            self.send_error(HTTPStatus.UNAUTHORIZED)
            self.send_header("Content-type", "text/html")
            self.send_header("Content-Length", str(sys.getsizeof(content)))
            self.end_headers()
            self.wfile.write(content)
            return

        user_raw = arguments.get("user", [""])[0]
        token = arguments.get("token", [""])[0]

        if not user_raw or not token:
            self.send_error(HTTPStatus.BAD_REQUEST, "User and token must be provided.")
        user = json.loads(urllib.parse.unquote(user_raw))
        content = AUTH_SUCCESS_PAGE.format(
            user_key=DATALAYER_IAM_USER_KEY,
            uid=user.get("uid"),
            handle=user["handle_s"],
            first_name=user["first_name_t"],
            last_name=user["last_name_t"],
            email=user["email_s"],
            display_name=" ".join((user["first_name_t"], user["last_name_t"])).strip(),
            token_key=DATALAYER_IAM_TOKEN_KEY,
            token=token,
            base_url="/",
        ).encode("UTF-8", "replace")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-type", "text/html")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def do_GET(self) -> None:
        """Handle GET requests for authentication flow."""
        parts = urllib.parse.urlsplit(self.path)
        if parts[2].strip("/").endswith("oauth/callback"):
            self._save_token(parts[3])
        elif parts[2] in {"/", "/datalayer/login/cli"}:
            content = LANDING_PAGE.format(
                config=json.dumps(
                    {
                        "runUrl": self.server.run_url,  # type: ignore
                        "iamRunUrl": self.server.run_url,  # type: ignore
                        "whiteLabel": False,
                    }
                )
            ).encode("UTF-8", "replace")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-type", "text/html")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        else:
            super().do_GET()

    def do_POST(self) -> None:
        """Handle POST requests with authentication data."""
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length)
        response = post_data.decode("utf-8")
        content = json.loads(response)
        self.server.token = content["token"]  # type: ignore
        self.server.user_handle = content["user_handle"]  # type: ignore

        self.send_response(HTTPStatus.CREATED)
        self.send_header("Content-Length", "0")
        self.end_headers()

        signal.raise_signal(signal.SIGINT)

    def log_message(self, format: str, *args: t.Tuple[t.Any]) -> None:
        """
        Log HTTP server messages.

        Parameters
        ----------
        format : str
            Format string for the log message.
        *args : tuple[Any]
            Arguments for the format string.
        """
        message = format % args
        logger.debug(
            "%s - - [%s] %s\n"
            % (
                self.address_string(),
                self.log_date_time_string(),
                message.translate(self._control_char_table),  # type: ignore
            )
        )


class DualStackServer(HTTPServer):
    """
    HTTP server supporting both IPv4 and IPv6.

    Parameters
    ----------
    server_address : tuple[str | bytes | bytearray, int]
        The server address and port.
    RequestHandlerClass : Callable
        The request handler class.
    run_url : str
        The runtime URL.
    bind_and_activate : bool, default True
        Whether to bind and activate the server.
    """

    def __init__(
        self,
        server_address: tuple[str | bytes | bytearray, int],
        RequestHandlerClass: t.Callable[[t.Any, t.Any, t.Self], BaseRequestHandler],
        run_url: str,
        bind_and_activate: bool = True,
    ) -> None:
        """
        Initialize the dual stack HTTP server.

        Parameters
        ----------
        server_address : tuple[str | bytes | bytearray, int]
            The server address and port.
        RequestHandlerClass : Callable
            The request handler class.
        run_url : str
            The runtime URL.
        bind_and_activate : bool, default True
            Whether to bind and activate the server.
        """
        try:
            import datalayer_ui  # noqa: F401
        except Exception:
            print("Sorry, I can not show the login page...")
            print(
                "Check the datalayer_ui python package is available in your environment"
            )
            import sys

            sys.exit(-1)
        self.run_url = run_url
        self.user_handle = None
        self.token = None
        super().__init__(server_address, RequestHandlerClass, bind_and_activate)

    def server_bind(self) -> None:
        """
        Bind the server socket, supporting both IPv4 and IPv6.

        Returns
        -------
        None
            This method does not return a value.
        """
        # Suppress exception when protocol is IPv4.
        with contextlib.suppress(Exception):
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        return super().server_bind()

    def finish_request(self, request: t.Any, client_address: str) -> None:
        """
        Complete an incoming request.

        Parameters
        ----------
        request : Any
            The request object.
        client_address : str
            The client address.
        """
        import datalayer_ui

        DATALAYER_UI_PATH = Path(datalayer_ui.__file__).parent
        self.RequestHandlerClass(
            request,
            client_address,
            self,  # type: ignore[arg-type]
            directory=str(DATALAYER_UI_PATH / "static"),  # type: ignore[call-arg]
        )


def get_token(
    run_url: str, port: int | None = None, logger: logging.Logger = logger
) -> tuple[str, str] | None:
    """
    Get the user handle and token.

    Parameters
    ----------
    run_url : str
        The runtime URL.
    port : int or None, default None
        The port to use for the authentication server.
    logger : logging.Logger, default logger
        The logger instance to use.

    Returns
    -------
    tuple[str, str] or None
        A tuple containing the user handle and token, or None if authentication fails.
    """

    server_address = ("", port or find_http_port())
    port = server_address[1]

    if USE_JUPYTER_SERVER_FOR_LOGIN:
        set_server_port(port)
        logger.info(
            f"Waiting for user logging, open http://localhost:{port}. Press CTRL+C to abort.\n"
        )
        sys.argv = [
            "",
            "--DatalayerExtensionApp.run_url",
            run_url,
            "--ServerApp.disable_check_xsrf",
            "True",
        ]
        launch_new_instance()
        logger.debug("Authentication finished.")
        #        return None if httpd.token is None else (httpd.user_handle, httpd.token)
        return None
    else:
        httpd = DualStackServer(server_address, LoginRequestHandler, run_url)
        logger.info(
            f"Waiting for user logging, open http://localhost:{port}. Press CTRL+C to abort.\n"
        )
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
        httpd.server_close()
        logger.debug("Authentication finished.")
        return None if httpd.token is None else (httpd.user_handle, httpd.token)
