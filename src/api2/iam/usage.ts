/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type {
  BaseResponse,
  CreditsResponse,
  UpdateCreditsRequest,
  QuotaResponse,
  CreateReservationRequest,
  Reservation,
  ReservationsResponse,
  UsageResponse,
  CheckoutPortalRequest,
  CheckoutPortalResponse,
} from '../types';

/**
 * Get current credits balance for the authenticated user
 */
export async function getCredits(
  config: RequestConfig,
): Promise<CreditsResponse> {
  return makeRequest<CreditsResponse>(config, '/api/iam/v1/usage/credits');
}

/**
 * Get credits for a specific user
 */
export async function getUserCredits(
  config: RequestConfig,
  userId: string,
): Promise<CreditsResponse> {
  return makeRequest<CreditsResponse>(
    config,
    `/api/iam/v1/usage/credits/users/${userId}`,
  );
}

/**
 * Update (add/remove) credits for a user
 */
export async function updateUserCredits(
  config: RequestConfig,
  userId: string,
  request: UpdateCreditsRequest,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/usage/credits/users/${userId}`,
    {
      method: 'PUT',
      body: request,
    },
  );
}

/**
 * Get user quota
 */
export async function getQuota(config: RequestConfig): Promise<QuotaResponse> {
  return makeRequest<QuotaResponse>(config, '/api/iam/v1/usage/quota');
}

/**
 * Update user quota
 */
export async function updateQuota(
  config: RequestConfig,
  limit: number,
): Promise<QuotaResponse> {
  return makeRequest<QuotaResponse>(config, '/api/iam/v1/usage/quota', {
    method: 'PUT',
    body: { limit },
  });
}

/**
 * Get reservations for the current authenticated user
 */
export async function getReservations(
  config: RequestConfig,
): Promise<ReservationsResponse> {
  return makeRequest<ReservationsResponse>(
    config,
    '/api/iam/v1/usage/reservations',
  );
}

/**
 * Create a new reservation
 */
export async function createReservation(
  config: RequestConfig,
  request: CreateReservationRequest,
): Promise<{ success: boolean; reservation?: Reservation }> {
  return makeRequest<{ success: boolean; reservation?: Reservation }>(
    config,
    '/api/iam/v1/usage/reservations',
    {
      method: 'POST',
      body: request,
    },
  );
}

/**
 * Get reservation by ID
 */
export async function getReservation(
  config: RequestConfig,
  id: string,
): Promise<{ success: boolean; reservation?: Reservation }> {
  return makeRequest<{ success: boolean; reservation?: Reservation }>(
    config,
    `/api/iam/v1/usage/reservations/${id}`,
  );
}

/**
 * Delete reservation
 */
export async function deleteReservation(
  config: RequestConfig,
  id: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/usage/reservations/${id}`,
    {
      method: 'DELETE',
    },
  );
}

/**
 * Get authenticated user usage
 */
export async function getUserUsage(
  config: RequestConfig,
): Promise<UsageResponse> {
  return makeRequest<UsageResponse>(config, '/api/iam/v1/usage/user');
}

/**
 * Get usage for a specific user
 */
export async function getSpecificUserUsage(
  config: RequestConfig,
  userId: string,
): Promise<UsageResponse> {
  return makeRequest<UsageResponse>(
    config,
    `/api/iam/v1/usage/users/${userId}`,
  );
}

/**
 * Get platform usage
 */
export async function getPlatformUsage(
  config: RequestConfig,
): Promise<UsageResponse> {
  return makeRequest<UsageResponse>(config, '/api/iam/v1/usage/platform');
}

/**
 * Create a checkout portal session
 */
export async function createCheckoutPortal(
  config: RequestConfig,
  request: CheckoutPortalRequest,
): Promise<CheckoutPortalResponse> {
  return makeRequest<CheckoutPortalResponse>(
    config,
    '/api/iam/v1/checkout/portal',
    {
      method: 'POST',
      body: request,
    },
  );
}
