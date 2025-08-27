/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ApiClient } from '../base';
import type {
  ApiExercise,
  CreateExerciseRequest,
  UpdateExerciseRequest,
  UpdateExercisePointsRequest,
  CloneExerciseRequest,
} from '../types';

export class ExercisesClient extends ApiClient {
  /**
   * Create a new exercise
   */
  async createExercise(
    request: CreateExerciseRequest,
  ): Promise<{ success: boolean; exercise?: ApiExercise }> {
    return this.post<{ success: boolean; exercise?: ApiExercise }>(
      '/api/spacer/v1/exercises',
      request,
    );
  }

  /**
   * Update exercise by ID
   */
  async updateExercise(
    id: string,
    request: UpdateExerciseRequest,
  ): Promise<{ success: boolean; exercise?: ApiExercise }> {
    return this.put<{ success: boolean; exercise?: ApiExercise }>(
      `/api/spacer/v1/exercises/${id}`,
      request,
    );
  }

  /**
   * Update exercise points by ID
   */
  async updateExercisePoints(
    id: string,
    request: UpdateExercisePointsRequest,
  ): Promise<{ success: boolean; exercise?: ApiExercise }> {
    return this.put<{ success: boolean; exercise?: ApiExercise }>(
      `/api/spacer/v1/exercises/${id}/points`,
      request,
    );
  }

  /**
   * Clone exercise by ID
   */
  async cloneExercise(
    id: string,
    request: CloneExerciseRequest,
  ): Promise<{ success: boolean; exercise?: ApiExercise }> {
    return this.post<{ success: boolean; exercise?: ApiExercise }>(
      `/api/spacer/v1/exercises/${id}/clone`,
      request,
    );
  }
}
