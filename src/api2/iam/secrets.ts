/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type {
  BaseResponse,
  CreateSecretRequest,
  UpdateSecretRequest,
  Secret,
  SecretsResponse,
} from '../types';

/**
 * Get all secrets for the current user
 */
export async function getSecrets(
  config: RequestConfig,
): Promise<SecretsResponse> {
  return makeRequest<SecretsResponse>(config, '/api/iam/v1/secrets');
}

/**
 * Create a new secret
 */
export async function createSecret(
  config: RequestConfig,
  request: CreateSecretRequest,
): Promise<{ success: boolean; secret?: Secret }> {
  return makeRequest<{ success: boolean; secret?: Secret }>(
    config,
    '/api/iam/v1/secrets',
    {
      method: 'POST',
      body: request,
    },
  );
}

/**
 * Get secret by ID
 */
export async function getSecret(
  config: RequestConfig,
  id: string,
): Promise<{ success: boolean; secret?: Secret; value?: string }> {
  return makeRequest<{ success: boolean; secret?: Secret; value?: string }>(
    config,
    `/api/iam/v1/secrets/${id}`,
  );
}

/**
 * Update secret
 */
export async function updateSecret(
  config: RequestConfig,
  id: string,
  request: UpdateSecretRequest,
): Promise<{ success: boolean; secret?: Secret }> {
  return makeRequest<{ success: boolean; secret?: Secret }>(
    config,
    `/api/iam/v1/secrets/${id}`,
    {
      method: 'PUT',
      body: request,
    },
  );
}

/**
 * Delete secret
 */
export async function deleteSecret(
  config: RequestConfig,
  id: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, `/api/iam/v1/secrets/${id}`, {
    method: 'DELETE',
  });
}
