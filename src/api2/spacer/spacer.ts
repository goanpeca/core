/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { SpacesClient } from './spaces';
import { NotebooksClient } from './notebooks';
import { DocumentsClient } from './documents';
import { AssignmentsClient } from './assignments';
import { CoursesClient } from './courses';
import { ExercisesClient } from './exercises';
import { DatasetsClient } from './datasets';
import type { RequestConfig } from '../base';

/**
 * Unified Spacer API Client
 *
 * Provides access to all Spacer endpoints through a single client instance.
 * Works in both Node.js and browser environments.
 *
 * @example
 * ```typescript
 * // Create client with configuration
 * const client = new SpacerClient({
 *   baseUrl: 'https://prod1.datalayer.run',
 *   token: 'your-api-token',
 *   externalToken: 'optional-external-token'
 * });
 *
 * // Use various endpoints
 * const spaces = await client.spaces.getUserSpaces();
 * const notebook = await client.notebooks.getNotebook('notebook-id');
 * const courses = await client.courses.getUserCourseEnrollments();
 * ```
 */
export class SpacerClient {
  public readonly spaces: SpacesClient;
  public readonly notebooks: NotebooksClient;
  public readonly documents: DocumentsClient;
  public readonly assignments: AssignmentsClient;
  public readonly courses: CoursesClient;
  public readonly exercises: ExercisesClient;
  public readonly datasets: DatasetsClient;

  constructor(private config: RequestConfig) {
    this.spaces = new SpacesClient(config);
    this.notebooks = new NotebooksClient(config);
    this.documents = new DocumentsClient(config);
    this.assignments = new AssignmentsClient(config);
    this.courses = new CoursesClient(config);
    this.exercises = new ExercisesClient(config);
    this.datasets = new DatasetsClient(config);
  }

  /**
   * Update the client configuration
   */
  updateConfig(config: Partial<RequestConfig>): void {
    Object.assign(this.config, config);
  }

  /**
   * Get current configuration
   */
  getConfig(): RequestConfig {
    return { ...this.config };
  }
}
