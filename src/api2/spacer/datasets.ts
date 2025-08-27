/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ApiClient } from '../base';
import type {
  ApiDataset,
  CreateDatasetRequest,
  UpdateDatasetRequest,
} from '../types';

export class DatasetsClient extends ApiClient {
  /**
   * Create a new dataset
   */
  async createDataset(
    request: CreateDatasetRequest,
  ): Promise<{ success: boolean; dataset?: ApiDataset }> {
    return this.post<{ success: boolean; dataset?: ApiDataset }>(
      '/api/spacer/v1/datasets',
      request,
    );
  }

  /**
   * Update dataset by ID
   */
  async updateDataset(
    id: string,
    request: UpdateDatasetRequest,
  ): Promise<{ success: boolean; dataset?: ApiDataset }> {
    return this.put<{ success: boolean; dataset?: ApiDataset }>(
      `/api/spacer/v1/datasets/${id}`,
      request,
    );
  }
}
