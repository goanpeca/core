/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

export class ApiResponseError extends Error {
  constructor(
    public response: Response,
    message: string,
    public errors: string[] = [],
    public warnings: string[] = [],
    public traceback?: string,
  ) {
    super(message);
    this.name = 'ApiResponseError';
  }

  static async create(response: Response): Promise<ApiResponseError> {
    try {
      const data = await response.json();
      const { message, errors, warnings, traceback } = data;
      if (traceback) {
        console.error(traceback);
      }
      return new ApiResponseError(
        response,
        message || `Request failed: ${response.status} ${response.statusText}`,
        errors || [],
        warnings || [],
        traceback,
      );
    } catch {
      return new ApiResponseError(
        response,
        `Request failed: ${response.status} ${response.statusText}`,
      );
    }
  }
}

export class NetworkError extends Error {
  constructor(original: Error) {
    super(original.message);
    this.name = 'NetworkError';
    this.stack = original.stack;
  }
}

export interface RequestConfig {
  baseUrl: string;
  token?: string;
  externalToken?: string;
}

export interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  query?: Record<string, string | number | boolean>;
}

function objectToQueryString(
  obj: Record<string, string | number | boolean>,
): string {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    params.append(key, String(value));
  });
  const str = params.toString();
  return str ? `?${str}` : '';
}

export async function makeRequest<T = any>(
  config: RequestConfig,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const url = `${config.baseUrl}${path}${options.query ? objectToQueryString(options.query) : ''}`;

  const headers = new Headers(options.headers || {});

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (config.token) {
    headers.set('Authorization', `Bearer ${config.token}`);
  }

  if (config.externalToken) {
    headers.set('X-External-Token', config.externalToken);
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'include',
      mode: 'cors',
      cache: 'no-store',
      signal: options.signal,
    });
  } catch (error) {
    throw new NetworkError(error as Error);
  }

  if (!response.ok) {
    throw await ApiResponseError.create(response);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : ({} as T);
}

export class ApiClient {
  constructor(protected config: RequestConfig) {}

  protected async request<T = any>(
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    return makeRequest<T>(this.config, path, options);
  }

  protected async get<T = any>(
    path: string,
    query?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>(path, { method: 'GET', query });
  }

  protected async post<T = any>(
    path: string,
    body?: any,
    query?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>(path, { method: 'POST', body, query });
  }

  protected async put<T = any>(
    path: string,
    body?: any,
    query?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>(path, { method: 'PUT', body, query });
  }

  protected async delete<T = any>(
    path: string,
    query?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>(path, { method: 'DELETE', query });
  }

  protected async patch<T = any>(
    path: string,
    body?: any,
    query?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>(path, { method: 'PATCH', body, query });
  }
}
