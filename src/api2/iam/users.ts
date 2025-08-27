/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type {
  BaseResponse,
  UpdateUserRequest,
  SearchUsersRequest,
  SearchUsersResponse,
  UpdateUserSettingsRequest,
  UpdateOnboardingRequest,
  IUser,
  IUserSettings,
  IUserOnboarding,
} from '../types';

/**
 * Get the current authenticated user
 */
export async function getMe(
  config: RequestConfig,
): Promise<{ success: boolean; user?: IUser }> {
  return makeRequest<{ success: boolean; user?: IUser }>(
    config,
    '/api/iam/v1/me',
  );
}

/**
 * Update the current authenticated user
 */
export async function updateMe(
  config: RequestConfig,
  request: UpdateUserRequest,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/me', {
    method: 'PUT',
    body: request,
  });
}

/**
 * Request email update for the current user
 */
export async function requestEmailUpdate(
  config: RequestConfig,
  email: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/me/email', {
    method: 'PUT',
    body: { email },
  });
}

/**
 * Confirm email update with verification code
 */
export async function confirmEmailUpdate(
  config: RequestConfig,
  code: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/me/email', {
    method: 'POST',
    body: { code },
  });
}

/**
 * Get detailed information about the current authenticated user
 */
export async function whoami(
  config: RequestConfig,
): Promise<{ success: boolean; user?: IUser }> {
  return makeRequest<{ success: boolean; user?: IUser }>(
    config,
    '/api/iam/v1/whoami',
  );
}

/**
 * Get user by ID
 */
export async function getUser(
  config: RequestConfig,
  id: string,
): Promise<{ success: boolean; user?: IUser }> {
  return makeRequest<{ success: boolean; user?: IUser }>(
    config,
    `/api/iam/v1/users/${id}`,
  );
}

/**
 * Search users
 */
export async function searchUsers(
  config: RequestConfig,
  request: SearchUsersRequest,
): Promise<SearchUsersResponse> {
  return makeRequest<SearchUsersResponse>(config, '/api/iam/v1/users/search', {
    method: 'POST',
    body: request,
  });
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  config: RequestConfig,
  userId: string,
  settings: UpdateUserSettingsRequest,
): Promise<{ success: boolean; settings?: IUserSettings }> {
  return makeRequest<{ success: boolean; settings?: IUserSettings }>(
    config,
    `/api/iam/v1/users/${userId}/settings`,
    {
      method: 'PUT',
      body: settings,
    },
  );
}

/**
 * Check if user has a specific role
 */
export async function checkUserRole(
  config: RequestConfig,
  userId: string,
  role: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/users/${userId}/roles/${role}`,
  );
}

/**
 * Add a role to a user
 */
export async function addUserRole(
  config: RequestConfig,
  userId: string,
  role: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/users/${userId}/roles/${role}`,
    {
      method: 'POST',
    },
  );
}

/**
 * Remove a role from a user
 */
export async function removeUserRole(
  config: RequestConfig,
  userId: string,
  role: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/users/${userId}/roles/${role}`,
    {
      method: 'DELETE',
    },
  );
}

/**
 * Get user onboarding state
 */
export async function getOnboarding(config: RequestConfig): Promise<{
  success: boolean;
  onboarding?: IUserOnboarding;
}> {
  return makeRequest<{ success: boolean; onboarding?: IUserOnboarding }>(
    config,
    '/api/iam/v1/onboardings',
  );
}

/**
 * Update user onboarding state
 */
export async function updateOnboarding(
  config: RequestConfig,
  request: UpdateOnboardingRequest,
): Promise<{ success: boolean; onboarding?: IUserOnboarding }> {
  return makeRequest<{ success: boolean; onboarding?: IUserOnboarding }>(
    config,
    '/api/iam/v1/onboardings',
    {
      method: 'PUT',
      body: request,
    },
  );
}

/**
 * Subscribe user to outbound communications
 */
export async function subscribeToOutbounds(
  config: RequestConfig,
  userId: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/outbounds/users/${userId}`,
    {
      method: 'PUT',
    },
  );
}

/**
 * Unsubscribe user from outbound communications
 */
export async function unsubscribeFromOutbounds(
  config: RequestConfig,
  userId: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/outbounds/users/${userId}`,
    {
      method: 'DELETE',
    },
  );
}
