/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { RuntimesClient } from './runtimes/runtimes';
import { SpacerClient } from './spacer/spacer';
import type { RequestConfig } from './base';

// Re-export base classes and types
export { ApiClient, ApiResponseError, NetworkError, makeRequest } from './base';
export type { RequestConfig, RequestOptions } from './base';

// Re-export all types
export * from './types';

// Re-export all models
export * from './models';

// Re-export IAM functions
export * as auth from './iam/auth';
export * as users from './iam/users';
export * as organizations from './iam/organizations';
export * as teams from './iam/teams';
export * as tokens from './iam/tokens';
export * as secrets from './iam/secrets';
export * as usage from './iam/usage';
export * as accounts from './iam/accounts';
export * as proxy from './iam/proxy';
export * as datasources from './iam/datasources';

// Re-export remaining clients that haven't been converted yet
export { RuntimesClient } from './runtimes/runtimes';
export { SpacerClient } from './spacer/spacer';

/**
 * Unified Datalayer API Client
 *
 * Provides access to both IAM and Runtimes APIs through a single client instance.
 * Works in both Node.js and browser environments.
 *
 * @example
 * ```typescript
 * // Create client with configuration
 * const client = new DatalayerClient({
 *   baseUrl: 'https://prod1.datalayer.run',
 *   token: 'your-api-token',
 *   externalToken: 'optional-external-token'
 * });
 *
 * // Use Runtime endpoints
 * const environments = await client.runtimes.getEnvironments();
 * const runtimes = await client.runtimes.getRuntimes();
 *
 * // Use Spacer endpoints
 * const spaces = await client.spacer.spaces.getUserSpaces();
 * const notebook = await client.spacer.notebooks.getNotebook('notebook-id');
 * ```
 */
export class DatalayerClient {
  public readonly runtimes: RuntimesClient;
  public readonly spacer: SpacerClient;
  public readonly config: RequestConfig;

  constructor(config: RequestConfig) {
    this.config = config;
    this.runtimes = new RuntimesClient(config);
    this.spacer = new SpacerClient(config);
  }

  /**
   * Update the client configuration for all sub-clients
   */
  updateConfig(newConfig: Partial<RequestConfig>): void {
    Object.assign(this.config, newConfig);
    this.spacer.updateConfig(newConfig);
  }

  /**
   * Get current configuration
   */
  getConfig(): RequestConfig {
    return { ...this.config };
  }
}

/**
 * Create a new Spacer client instance
 */
export function createSpacerClient(config: RequestConfig): SpacerClient {
  return new SpacerClient(config);
}

/**
 * Create a new Datalayer client instance
 */
export function createDatalayerClient(config: RequestConfig): DatalayerClient {
  return new DatalayerClient(config);
}

// Default export
export default DatalayerClient;
