/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type {
  BaseResponse,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  IOrganization,
  ITeam,
} from '../types';

/**
 * Get organizations for the current authenticated user
 */
export async function getOrganizations(config: RequestConfig): Promise<{
  success: boolean;
  organizations?: IOrganization[];
}> {
  return makeRequest<{ success: boolean; organizations?: IOrganization[] }>(
    config,
    '/api/iam/v1/organizations',
  );
}

/**
 * Create a new organization
 */
export async function createOrganization(
  config: RequestConfig,
  request: CreateOrganizationRequest,
): Promise<{ success: boolean; organization?: IOrganization }> {
  return makeRequest<{ success: boolean; organization?: IOrganization }>(
    config,
    '/api/iam/v1/organizations',
    {
      method: 'POST',
      body: request,
    },
  );
}

/**
 * Get organization by ID
 */
export async function getOrganization(
  config: RequestConfig,
  id: string,
): Promise<{ success: boolean; organization?: IOrganization }> {
  return makeRequest<{ success: boolean; organization?: IOrganization }>(
    config,
    `/api/iam/v1/organizations/${id}`,
  );
}

/**
 * Update organization
 */
export async function updateOrganization(
  config: RequestConfig,
  id: string,
  request: UpdateOrganizationRequest,
): Promise<{ success: boolean; organization?: IOrganization }> {
  return makeRequest<{ success: boolean; organization?: IOrganization }>(
    config,
    `/api/iam/v1/organizations/${id}`,
    {
      method: 'PUT',
      body: request,
    },
  );
}

/**
 * Get organizations by type
 */
export async function getOrganizationsByType(
  config: RequestConfig,
  type: string,
): Promise<{ success: boolean; organizations?: IOrganization[] }> {
  return makeRequest<{ success: boolean; organizations?: IOrganization[] }>(
    config,
    `/api/iam/v1/organizations/types/${type}`,
  );
}

/**
 * Add a member to an organization
 */
export async function addMember(
  config: RequestConfig,
  organizationId: string,
  userId: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/organizations/${organizationId}/members/${userId}`,
    {
      method: 'POST',
    },
  );
}

/**
 * Remove a member from an organization
 */
export async function removeMember(
  config: RequestConfig,
  organizationId: string,
  userId: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/organizations/${organizationId}/members/${userId}`,
    {
      method: 'DELETE',
    },
  );
}

/**
 * Add a role to an organization member
 */
export async function addMemberRole(
  config: RequestConfig,
  organizationId: string,
  userId: string,
  role: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/organizations/${organizationId}/members/${userId}/roles/${role}`,
    {
      method: 'POST',
    },
  );
}

/**
 * Remove a role from an organization member
 */
export async function removeMemberRole(
  config: RequestConfig,
  organizationId: string,
  userId: string,
  role: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/organizations/${organizationId}/members/${userId}/roles/${role}`,
    {
      method: 'DELETE',
    },
  );
}

/**
 * Get teams in an organization
 */
export async function getTeams(
  config: RequestConfig,
  organizationId: string,
): Promise<{ success: boolean; teams?: ITeam[] }> {
  return makeRequest<{ success: boolean; teams?: ITeam[] }>(
    config,
    `/api/iam/v1/organizations/${organizationId}/teams`,
  );
}
