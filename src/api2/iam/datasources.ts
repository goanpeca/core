/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type { BaseResponse } from '../types';

export interface Datasource {
  id: string;
  name: string;
  type: string;
  description?: string;
  config: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

export interface CreateDatasourceRequest {
  name: string;
  type: string;
  description?: string;
  config: Record<string, any>;
}

export interface UpdateDatasourceRequest {
  name?: string;
  description?: string;
  config?: Record<string, any>;
}

export interface DatasourcesResponse extends BaseResponse {
  datasources?: Datasource[];
}

/**
 * Get all datasources for the current user
 */
export async function getDatasources(
  config: RequestConfig,
): Promise<DatasourcesResponse> {
  return makeRequest<DatasourcesResponse>(config, '/api/iam/v1/datasources');
}

/**
 * Create a new datasource
 */
export async function createDatasource(
  config: RequestConfig,
  request: CreateDatasourceRequest,
): Promise<{ success: boolean; datasource?: Datasource }> {
  return makeRequest<{ success: boolean; datasource?: Datasource }>(
    config,
    '/api/iam/v1/datasources',
    {
      method: 'POST',
      body: request,
    },
  );
}

/**
 * Get datasource by ID
 */
export async function getDatasource(
  config: RequestConfig,
  id: string,
): Promise<{ success: boolean; datasource?: Datasource }> {
  return makeRequest<{ success: boolean; datasource?: Datasource }>(
    config,
    `/api/iam/v1/datasources/${id}`,
  );
}

/**
 * Update datasource
 */
export async function updateDatasource(
  config: RequestConfig,
  id: string,
  request: UpdateDatasourceRequest,
): Promise<{ success: boolean; datasource?: Datasource }> {
  return makeRequest<{ success: boolean; datasource?: Datasource }>(
    config,
    `/api/iam/v1/datasources/${id}`,
    {
      method: 'PUT',
      body: request,
    },
  );
}
