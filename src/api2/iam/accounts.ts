/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type { IAccount } from '../types';

/**
 * Get account details by handle
 */
export async function getAccountByHandle(
  config: RequestConfig,
  handle: string,
): Promise<{ success: boolean; account?: IAccount }> {
  return makeRequest<{ success: boolean; account?: IAccount }>(
    config,
    `/api/iam/v1/accounts/${handle}`,
  );
}
