# Copyright (c) 2023-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

"""Index handler."""

from tornado.web import authenticated

from datalayer_core.handlers.base import BaseTemplateHandler


# pylint: disable=W0223
class IndexHandler(BaseTemplateHandler):
    """The handler for the index."""

    @authenticated
    def get(self) -> None:
        """The index page."""
        self.write(self.render_template("index.html"))
