/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type {
  BaseResponse,
  LoginRequest,
  LoginResponse,
  OAuth2AuthzUrlResponse,
  MFASetupResponse,
  MFAValidateRequest,
  RequestPasswordResetRequest,
  ConfirmPasswordResetRequest,
  JoinWithInviteRequest,
} from '../types';

/**
 * Login to the platform
 */
export async function login(
  config: RequestConfig,
  request: LoginRequest,
): Promise<LoginResponse> {
  return makeRequest<LoginResponse>(config, '/api/iam/v1/login', {
    method: 'POST',
    body: request,
  });
}

/**
 * Logout the current user
 */
export async function logout(config: RequestConfig): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/logout');
}

/**
 * Check authentication status
 */
export async function checkAuth(config: RequestConfig): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/auth');
}

/**
 * Get OAuth2 authorization URL
 */
export async function getOAuth2AuthzUrl(
  config: RequestConfig,
  provider: 'github' | 'linkedin' | 'okta',
  redirectUri?: string,
  state?: string,
): Promise<OAuth2AuthzUrlResponse> {
  const query: Record<string, string> = { provider };
  if (redirectUri) query.redirect_uri = redirectUri;
  if (state) query.state = state;
  return makeRequest<OAuth2AuthzUrlResponse>(
    config,
    '/api/iam/v1/oauth2/authz/url',
    { query },
  );
}

/**
 * Get OAuth2 authorization URL for linking accounts
 */
export async function getOAuth2AuthzUrlForLink(
  config: RequestConfig,
  provider: 'github' | 'linkedin' | 'okta',
  redirectUri?: string,
): Promise<OAuth2AuthzUrlResponse> {
  const query: Record<string, string> = { provider };
  if (redirectUri) query.redirect_uri = redirectUri;
  return makeRequest<OAuth2AuthzUrlResponse>(
    config,
    '/api/iam/v1/oauth2/authz/url/link',
    { query },
  );
}

/**
 * Setup MFA for the current user
 */
export async function setupMFA(
  config: RequestConfig,
): Promise<MFASetupResponse> {
  return makeRequest<MFASetupResponse>(config, '/api/iam/v1/mfa', {
    method: 'PUT',
  });
}

/**
 * Validate MFA code
 */
export async function validateMFA(
  config: RequestConfig,
  request: MFAValidateRequest,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/mfa', {
    method: 'POST',
    body: request,
  });
}

/**
 * Remove MFA from the current user
 */
export async function removeMFA(config: RequestConfig): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/mfa', {
    method: 'DELETE',
  });
}

/**
 * Request a password reset URL
 */
export async function requestPasswordReset(
  config: RequestConfig,
  request: RequestPasswordResetRequest,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/password', {
    method: 'PUT',
    body: request,
  });
}

/**
 * Request a password reset token
 */
export async function requestPasswordToken(
  config: RequestConfig,
  request: RequestPasswordResetRequest,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(config, '/api/iam/v1/password/token', {
    method: 'POST',
    body: request,
  });
}

/**
 * Confirm password reset
 */
export async function confirmPasswordReset(
  config: RequestConfig,
  handle: string,
  token: string,
  request: ConfirmPasswordResetRequest,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/password/confirm/users/${handle}/tokens/${token}`,
    {
      method: 'PUT',
      body: request,
    },
  );
}

/**
 * Join with an invite token
 */
export async function joinWithInvite(
  config: RequestConfig,
  request: JoinWithInviteRequest,
): Promise<LoginResponse> {
  return makeRequest<LoginResponse>(config, '/api/iam/v1/join/invites/token', {
    method: 'POST',
    body: request,
  });
}
