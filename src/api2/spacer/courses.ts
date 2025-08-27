/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ApiClient } from '../base';
import type { ApiCourse, UpdateCourseRequest, CoursesResponse } from '../types';

export class CoursesClient extends ApiClient {
  /**
   * Get course by ID
   */
  async getCourse(
    id: string,
  ): Promise<{ success: boolean; course?: ApiCourse }> {
    return this.get<{ success: boolean; course?: ApiCourse }>(
      `/api/spacer/v1/courses/${id}`,
    );
  }

  /**
   * Update course by ID
   */
  async updateCourse(
    id: string,
    request: UpdateCourseRequest,
  ): Promise<{ success: boolean; course?: ApiCourse }> {
    return this.put<{ success: boolean; course?: ApiCourse }>(
      `/api/spacer/v1/courses/${id}`,
      request,
    );
  }

  /**
   * Get current user's course enrollments
   */
  async getUserCourseEnrollments(): Promise<CoursesResponse> {
    return this.get<CoursesResponse>('/api/spacer/v1/courses/enrollments/me');
  }
}
