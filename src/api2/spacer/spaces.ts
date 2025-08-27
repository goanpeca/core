/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ApiClient } from '../base';
import type {
  ApiSpace,
  CreateSpaceRequest,
  UpdateSpaceRequest,
  SpacesResponse,
} from '../types';

export class SpacesClient extends ApiClient {
  /**
   * Create a new space
   */
  async createSpace(
    request: CreateSpaceRequest,
  ): Promise<{ success: boolean; space?: ApiSpace }> {
    return this.post<{ success: boolean; space?: ApiSpace }>(
      '/api/spacer/v1/spaces',
      request,
    );
  }

  /**
   * Update space by ID
   */
  async updateSpace(
    id: string,
    request: UpdateSpaceRequest,
  ): Promise<{ success: boolean; space?: ApiSpace }> {
    return this.put<{ success: boolean; space?: ApiSpace }>(
      `/api/spacer/v1/spaces/${id}`,
      request,
    );
  }

  /**
   * Get all spaces for the current user
   */
  async getUserSpaces(): Promise<SpacesResponse> {
    return this.get<SpacesResponse>('/api/spacer/v1/spaces/users/me');
  }

  /**
   * Get spaces by type
   */
  async getSpacesByType(type: string): Promise<SpacesResponse> {
    return this.get<SpacesResponse>(`/api/spacer/v1/spaces/types/${type}`);
  }
}
