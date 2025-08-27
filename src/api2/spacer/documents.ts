/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ApiClient } from '../base';
import type {
  ApiDocument,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  UpdateDocumentModelRequest,
  CloneDocumentRequest,
} from '../types';

export class DocumentsClient extends ApiClient {
  /**
   * Create a new document
   */
  async createDocument(
    request: CreateDocumentRequest,
  ): Promise<{ success: boolean; document?: ApiDocument }> {
    return this.post<{ success: boolean; document?: ApiDocument }>(
      '/api/spacer/v1/lexicals',
      request,
    );
  }

  /**
   * Get document by ID
   */
  async getDocument(
    id: string,
  ): Promise<{ success: boolean; document?: ApiDocument }> {
    return this.get<{ success: boolean; document?: ApiDocument }>(
      `/api/spacer/v1/lexicals/${id}`,
    );
  }

  /**
   * Update document by ID
   */
  async updateDocument(
    id: string,
    request: UpdateDocumentRequest,
  ): Promise<{ success: boolean; document?: ApiDocument }> {
    return this.put<{ success: boolean; document?: ApiDocument }>(
      `/api/spacer/v1/lexicals/${id}`,
      request,
    );
  }

  /**
   * Update document model by ID
   */
  async updateDocumentModel(
    id: string,
    request: UpdateDocumentModelRequest,
  ): Promise<{ success: boolean; document?: ApiDocument }> {
    return this.put<{ success: boolean; document?: ApiDocument }>(
      `/api/spacer/v1/lexicals/${id}/model`,
      request,
    );
  }

  /**
   * Clone document by ID
   */
  async cloneDocument(
    id: string,
    request: CloneDocumentRequest,
  ): Promise<{ success: boolean; document?: ApiDocument }> {
    return this.post<{ success: boolean; document?: ApiDocument }>(
      `/api/spacer/v1/lexicals/${id}/clone`,
      request,
    );
  }
}
