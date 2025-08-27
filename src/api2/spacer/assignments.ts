/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ApiClient } from '../base';
import type {
  BaseResponse,
  ApiAssignment,
  CreateAssignmentRequest,
  GradeAssignmentRequest,
  ResetAssignmentRequest,
} from '../types';

export class AssignmentsClient extends ApiClient {
  /**
   * Create a new assignment
   */
  async createAssignment(
    request: CreateAssignmentRequest,
  ): Promise<{ success: boolean; assignment?: ApiAssignment }> {
    return this.post<{ success: boolean; assignment?: ApiAssignment }>(
      '/api/spacer/v1/assignments',
      request,
    );
  }

  /**
   * Get assignment by ID
   */
  async getAssignment(
    id: string,
  ): Promise<{ success: boolean; assignment?: ApiAssignment }> {
    return this.get<{ success: boolean; assignment?: ApiAssignment }>(
      `/api/spacer/v1/assignments/${id}`,
    );
  }

  /**
   * Grade assignment for a student
   */
  async gradeAssignment(
    id: string,
    studentId: string,
    request: GradeAssignmentRequest,
  ): Promise<BaseResponse> {
    return this.put<BaseResponse>(
      `/api/spacer/v1/assignments/${id}/students/${studentId}/grade`,
      request,
    );
  }

  /**
   * Reset assignment
   */
  async resetAssignment(
    id: string,
    request?: ResetAssignmentRequest,
  ): Promise<BaseResponse> {
    return this.post<BaseResponse>(
      `/api/spacer/v1/assignments/${id}/reset`,
      request || {},
    );
  }
}
