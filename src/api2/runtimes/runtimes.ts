/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ApiClient } from '../base';
import type {
  BaseResponse,
  CreateRuntimeRequest,
  UpdateRuntimeRequest,
  Runtime,
  RuntimesResponse,
  EnvironmentsResponse,
  CreateSnapshotRequest,
  UpdateSnapshotRequest,
  RuntimeSnapshot,
  SnapshotsResponse,
} from '../types';

export class RuntimesClient extends ApiClient {
  /**
   * Get available environments
   */
  async getEnvironments(): Promise<EnvironmentsResponse> {
    return this.get<EnvironmentsResponse>('/api/runtimes/v1/environments');
  }

  /**
   * Create a new runtime
   */
  async createRuntime(
    request: CreateRuntimeRequest,
  ): Promise<{ success: boolean; runtime?: Runtime }> {
    return this.post<{ success: boolean; runtime?: Runtime }>(
      '/api/runtimes/v1/runtimes',
      request,
    );
  }

  /**
   * Get all runtimes for the current user
   */
  async getRuntimes(): Promise<RuntimesResponse> {
    return this.get<RuntimesResponse>('/api/runtimes/v1/runtimes');
  }

  /**
   * Get runtime by pod name
   */
  async getRuntime(
    podName: string,
  ): Promise<{ success: boolean; runtime?: Runtime }> {
    return this.get<{ success: boolean; runtime?: Runtime }>(
      `/api/runtimes/v1/runtimes/${podName}`,
    );
  }

  /**
   * Delete runtime by pod name
   */
  async deleteRuntime(podName: string, reason?: string): Promise<BaseResponse> {
    const query = reason ? { reason } : undefined;
    return this.delete<BaseResponse>(
      `/api/runtimes/v1/runtimes/${podName}`,
      query,
    );
  }

  /**
   * Update runtime (typically to restore from a snapshot)
   */
  async updateRuntime(
    podName: string,
    request: UpdateRuntimeRequest,
  ): Promise<BaseResponse> {
    return this.put<BaseResponse>(
      `/api/runtimes/v1/runtimes/${podName}`,
      request,
    );
  }

  /**
   * Get all runtime snapshots for the current user
   */
  async getSnapshots(): Promise<SnapshotsResponse> {
    return this.get<SnapshotsResponse>('/api/runtimes/v1/runtime-snapshots');
  }

  /**
   * Create a runtime snapshot
   */
  async createSnapshot(
    request: CreateSnapshotRequest,
  ): Promise<{ success: boolean; snapshot?: RuntimeSnapshot }> {
    return this.post<{ success: boolean; snapshot?: RuntimeSnapshot }>(
      '/api/runtimes/v1/runtime-snapshots',
      request,
    );
  }

  /**
   * Get snapshot by ID
   */
  async getSnapshot(
    id: string,
  ): Promise<{ success: boolean; snapshot?: RuntimeSnapshot }> {
    return this.get<{ success: boolean; snapshot?: RuntimeSnapshot }>(
      `/api/runtimes/v1/runtime-snapshots/${id}`,
    );
  }

  /**
   * Update snapshot metadata
   */
  async updateSnapshot(
    id: string,
    request: UpdateSnapshotRequest,
  ): Promise<{ success: boolean; snapshot?: RuntimeSnapshot }> {
    return this.patch<{ success: boolean; snapshot?: RuntimeSnapshot }>(
      `/api/runtimes/v1/runtime-snapshots/${id}`,
      request,
    );
  }

  /**
   * Delete snapshot
   */
  async deleteSnapshot(id: string): Promise<BaseResponse> {
    return this.delete<BaseResponse>(
      `/api/runtimes/v1/runtime-snapshots/${id}`,
    );
  }

  /**
   * Get snapshot download URL
   */
  getSnapshotDownloadUrl(
    id: string,
    config: { baseUrl: string; token?: string },
  ): string {
    return `${config.baseUrl}/api/runtimes/v1/runtime-snapshots/${id}?download=1&token=${config.token || ''}`;
  }

  /**
   * Health check endpoint
   */
  async ping(): Promise<BaseResponse> {
    return this.get<BaseResponse>('/api/runtimes/v1/ping');
  }
}
