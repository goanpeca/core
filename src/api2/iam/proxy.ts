/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';

export interface ProxyRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
}

/**
 * Make a proxy request through the IAM service
 */
export async function proxyRequest(
  config: RequestConfig,
  request: ProxyRequest,
): Promise<any> {
  return makeRequest<any>(config, '/api/iam/v1/proxy/request', {
    method: 'POST',
    body: request,
  });
}
