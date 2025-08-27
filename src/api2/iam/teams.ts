/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { makeRequest, type RequestConfig } from '../base';
import type {
  BaseResponse,
  CreateTeamRequest,
  UpdateTeamRequest,
  ITeam,
} from '../types';

/**
 * Create a new team
 */
export async function createTeam(
  config: RequestConfig,
  request: CreateTeamRequest,
): Promise<{ success: boolean; team?: ITeam }> {
  return makeRequest<{ success: boolean; team?: ITeam }>(
    config,
    '/api/iam/v1/teams',
    {
      method: 'POST',
      body: request,
    },
  );
}

/**
 * Get team by ID
 */
export async function getTeam(
  config: RequestConfig,
  id: string,
): Promise<{ success: boolean; team?: ITeam }> {
  return makeRequest<{ success: boolean; team?: ITeam }>(
    config,
    `/api/iam/v1/teams/${id}`,
  );
}

/**
 * Update team
 */
export async function updateTeam(
  config: RequestConfig,
  id: string,
  request: UpdateTeamRequest,
): Promise<{ success: boolean; team?: ITeam }> {
  return makeRequest<{ success: boolean; team?: ITeam }>(
    config,
    `/api/iam/v1/teams/${id}`,
    {
      method: 'PUT',
      body: request,
    },
  );
}

/**
 * Add a member to a team
 */
export async function addMember(
  config: RequestConfig,
  teamId: string,
  userId: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/teams/${teamId}/members/${userId}`,
    {
      method: 'POST',
    },
  );
}

/**
 * Remove a member from a team
 */
export async function removeMember(
  config: RequestConfig,
  teamId: string,
  userId: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/teams/${teamId}/members/${userId}`,
    {
      method: 'DELETE',
    },
  );
}

/**
 * Add a role to a team member
 */
export async function addMemberRole(
  config: RequestConfig,
  teamId: string,
  userId: string,
  role: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/teams/${teamId}/members/${userId}/roles/${role}`,
    {
      method: 'POST',
    },
  );
}

/**
 * Remove a role from a team member
 */
export async function removeMemberRole(
  config: RequestConfig,
  teamId: string,
  userId: string,
  role: string,
): Promise<BaseResponse> {
  return makeRequest<BaseResponse>(
    config,
    `/api/iam/v1/teams/${teamId}/members/${userId}/roles/${role}`,
    {
      method: 'DELETE',
    },
  );
}
