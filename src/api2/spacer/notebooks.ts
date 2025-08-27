/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ApiClient } from '../base';
import type {
  ApiNotebook,
  CreateNotebookRequest,
  UpdateNotebookRequest,
  UpdateNotebookModelRequest,
  CloneNotebookRequest,
} from '../types';

export class NotebooksClient extends ApiClient {
  /**
   * Create a new notebook
   */
  async createNotebook(
    request: CreateNotebookRequest,
  ): Promise<{ success: boolean; notebook?: ApiNotebook }> {
    return this.post<{ success: boolean; notebook?: ApiNotebook }>(
      '/api/spacer/v1/notebooks',
      request,
    );
  }

  /**
   * Get notebook by ID
   */
  async getNotebook(
    id: string,
  ): Promise<{ success: boolean; notebook?: ApiNotebook }> {
    return this.get<{ success: boolean; notebook?: ApiNotebook }>(
      `/api/spacer/v1/notebooks/${id}`,
    );
  }

  /**
   * Update notebook by ID
   */
  async updateNotebook(
    id: string,
    request: UpdateNotebookRequest,
  ): Promise<{ success: boolean; notebook?: ApiNotebook }> {
    return this.put<{ success: boolean; notebook?: ApiNotebook }>(
      `/api/spacer/v1/notebooks/${id}`,
      request,
    );
  }

  /**
   * Update notebook model by ID
   */
  async updateNotebookModel(
    id: string,
    request: UpdateNotebookModelRequest,
  ): Promise<{ success: boolean; notebook?: ApiNotebook }> {
    return this.put<{ success: boolean; notebook?: ApiNotebook }>(
      `/api/spacer/v1/notebooks/${id}/model`,
      request,
    );
  }

  /**
   * Clone notebook by ID
   */
  async cloneNotebook(
    id: string,
    request: CloneNotebookRequest,
  ): Promise<{ success: boolean; notebook?: ApiNotebook }> {
    return this.post<{ success: boolean; notebook?: ApiNotebook }>(
      `/api/spacer/v1/notebooks/${id}/clone`,
      request,
    );
  }
}
