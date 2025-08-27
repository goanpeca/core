/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type {
  BaseResponse,
  CreateTokenRequest,
  UpdateTokenRequest,
  Token,
  TokensResponse,
} from '../types';

/**
 * Get all tokens for the current user
 */
export async function getTokens(
  config: RequestConfig,
): Promise<TokensResponse> {
  return makeRequest<TokensResponse>(config, '/api/iam/v1/tokens');
}

/**
 * Create a new API token
 */
export async function createToken(
  config: RequestConfig,
  request: CreateTokenRequest,
): Promise<{ success: boolean; token?: Token }> {
  return makeRequest<{ success: boolean; token?: Token }>(
    config,
    '/api/iam/v1/tokens',
    {
      method: 'POST',
      body: request,
    },
  );
}

/**
 * Get token by ID
 */
export async function getToken(
  config: RequestConfig,
  id: string,
): Promise<{ success: boolean; token?: Token }> {
  return makeRequest<{ success: boolean; token?: Token }>(
    config,
    `/api/iam/v1/tokens/${id}`,
  );
}

/**
 * Update token
 */
export async function updateToken(
  config: RequestConfig,
  id: string,
  request: UpdateTokenRequest,
): Promise<{ success: boolean; token?: Token }> {
  return makeRequest<{ success: boolean; token?: Token }>(
    config,
    `/api/iam/v1/tokens/${id}`,
    {
      method: 'PUT',
      body: request,
    },
  );
}

/**
 * Delete token
 */
export async function deleteToken(
  config: RequestConfig,
  id: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, `/api/iam/v1/tokens/${id}`, {
    method: 'DELETE',
  });
}
