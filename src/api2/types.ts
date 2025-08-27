/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// Re-export existing model types
export type { IUser } from './models/User';
export type { IOrganization } from './models/Organization';
export type { ITeam } from './models/Team';
export type { IAccount } from './models/Account';
export type { IUserSettings } from './models/UserSettings';
export type { IUserOnboarding } from './models/UserOnboarding';
export type { IIAMToken } from './models/IAMToken';

// Base API response
export interface BaseResponse {
  success: boolean;
  message?: string;
  errors?: string[];
  warnings?: string[];
}

// Authentication types
export interface LoginRequest {
  handle?: string;
  password?: string;
  token?: string;
  mfa_code?: string;
}

export interface LoginResponse extends BaseResponse {
  user?: any;
  token?: string;
  external_token?: string;
  mfa_required?: boolean;
}

export interface OAuth2AuthzUrlResponse extends BaseResponse {
  url?: string;
}

// User types
export interface UpdateUserRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

export interface SearchUsersRequest {
  pattern: string;
  limit?: number;
  offset?: number;
}

export interface SearchUsersResponse extends BaseResponse {
  users?: any[];
  total?: number;
}

// Organization types
export interface CreateOrganizationRequest {
  name: string;
  handle: string;
  description?: string;
  type?: string;
}

export interface UpdateOrganizationRequest {
  name?: string;
  description?: string;
  avatar_url?: string;
}

export interface OrganizationMemberRole {
  user_id: string;
  role: string;
}

// Team types
export interface CreateTeamRequest {
  name: string;
  handle: string;
  description?: string;
  organization_id: string;
}

export interface UpdateTeamRequest {
  name?: string;
  description?: string;
}

// Token types
export interface CreateTokenRequest {
  name: string;
  description?: string;
  expires_at?: string;
  scopes?: string[];
}

export interface UpdateTokenRequest {
  name?: string;
  description?: string;
  scopes?: string[];
}

export interface Token {
  id: string;
  name: string;
  token?: string; // Only returned on creation
  description?: string;
  created_at: string;
  expires_at?: string;
  last_used_at?: string;
  scopes?: string[];
}

export interface TokensResponse extends BaseResponse {
  tokens?: Token[];
}

// Secret types
export interface CreateSecretRequest {
  name: string;
  value: string;
  description?: string;
}

export interface UpdateSecretRequest {
  name?: string;
  value?: string;
  description?: string;
}

export interface Secret {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at?: string;
}

export interface SecretsResponse extends BaseResponse {
  secrets?: Secret[];
}

// Usage types
export interface Credits {
  balance: number;
  reserved: number;
  available: number;
  consumed: number;
}

export interface CreditsResponse extends BaseResponse {
  credits?: Credits;
}

export interface UpdateCreditsRequest {
  amount: number;
  operation: 'add' | 'remove';
  reason?: string;
}

export interface Quota {
  limit: number;
  used: number;
  remaining: number;
}

export interface QuotaResponse extends BaseResponse {
  quota?: Quota;
}

export interface CreateReservationRequest {
  amount: number;
  description?: string;
  expires_at?: string;
}

export interface Reservation {
  id: string;
  amount: number;
  description?: string;
  created_at: string;
  expires_at?: string;
  status: string;
}

export interface ReservationsResponse extends BaseResponse {
  reservations?: Reservation[];
}

export interface Usage {
  period: string;
  credits_consumed: number;
  runtime_hours: number;
  storage_gb: number;
  network_gb: number;
}

export interface UsageResponse extends BaseResponse {
  usage?: Usage[];
}

// MFA types
export interface MFASetupResponse extends BaseResponse {
  qr_code?: string;
  secret?: string;
  backup_codes?: string[];
}

export interface MFAValidateRequest {
  code: string;
}

// Checkout types
export interface CheckoutPortalRequest {
  return_url?: string;
  product_id?: string;
  price_id?: string;
}

export interface CheckoutPortalResponse extends BaseResponse {
  url?: string;
  session_id?: string;
}

// Settings types
export interface UpdateUserSettingsRequest {
  [key: string]: any;
}

// Onboarding types
export interface UpdateOnboardingRequest {
  step?: string;
  completed?: boolean;
  data?: Record<string, any>;
}

// Password types
export interface RequestPasswordResetRequest {
  email: string;
}

export interface ConfirmPasswordResetRequest {
  password: string;
  confirm_password: string;
}

// Invite types
export interface JoinWithInviteRequest {
  token: string;
  first_name?: string;
  last_name?: string;
  password?: string;
}

// Runtime types
export interface CreateRuntimeRequest {
  environment_name: string;
  type?: string;
  given_name?: string;
  credits_limit: number;
  capabilities?: string[];
  from?: string; // snapshot ID to restore from
}

export interface UpdateRuntimeRequest {
  from?: string; // snapshot ID to restore from
}

export interface Runtime {
  id: string;
  name: string;
  pod_name: string;
  status: string;
  environment_name: string;
  type: string;
  credits_limit: number;
  capabilities?: string[];
  created_at: string;
  updated_at?: string;
  kernel_connection?: any;
}

export interface RuntimesResponse extends BaseResponse {
  runtimes?: Runtime[];
}

export interface Environment {
  name: string;
  display_name: string;
  description?: string;
  kernel_spec: any;
  available: boolean;
}

export interface EnvironmentsResponse extends BaseResponse {
  environments?: Environment[];
}

export interface CreateSnapshotRequest {
  pod_name: string;
  name?: string;
  description?: string;
  stop?: boolean;
}

export interface UpdateSnapshotRequest {
  name?: string;
  description?: string;
}

export interface RuntimeSnapshot {
  id: string;
  name?: string;
  description?: string;
  pod_name: string;
  status: string;
  created_at: string;
  updated_at?: string;
  size?: number;
}

export interface SnapshotsResponse extends BaseResponse {
  snapshots?: RuntimeSnapshot[];
}

// Spacer API types (simple DTOs for API communication)
export interface ApiSpace {
  id: string;
  name: string;
  description?: string;
  type?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateSpaceRequest {
  name: string;
  description?: string;
  type?: string;
}

export interface UpdateSpaceRequest {
  name?: string;
  description?: string;
}

export interface SpacesResponse extends BaseResponse {
  spaces?: ApiSpace[];
}

export interface ApiNotebook {
  id: string;
  name: string;
  description?: string;
  model?: any;
  space_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateNotebookRequest {
  name: string;
  description?: string;
  model?: any;
  space_id?: string;
}

export interface UpdateNotebookRequest {
  name?: string;
  description?: string;
  space_id?: string;
}

export interface UpdateNotebookModelRequest {
  model: any;
}

export interface CloneNotebookRequest {
  name?: string;
  space_id?: string;
}

export interface ApiDocument {
  id: string;
  name: string;
  description?: string;
  model?: any;
  space_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateDocumentRequest {
  name: string;
  description?: string;
  model?: any;
  space_id?: string;
}

export interface UpdateDocumentRequest {
  name?: string;
  description?: string;
  space_id?: string;
}

export interface UpdateDocumentModelRequest {
  model: any;
}

export interface CloneDocumentRequest {
  name?: string;
  space_id?: string;
}

export interface ApiAssignment {
  id: string;
  name: string;
  description?: string;
  course_id?: string;
  due_date?: string;
  points?: number;
  created_at: string;
  updated_at?: string;
}

export interface CreateAssignmentRequest {
  name: string;
  description?: string;
  course_id?: string;
  due_date?: string;
  points?: number;
}

export interface UpdateAssignmentRequest {
  name?: string;
  description?: string;
  due_date?: string;
  points?: number;
}

export interface GradeAssignmentRequest {
  grade: number;
  feedback?: string;
}

export interface ResetAssignmentRequest {
  reason?: string;
}

export interface ApiCourse {
  id: string;
  name: string;
  description?: string;
  instructor_id?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at?: string;
}

export interface UpdateCourseRequest {
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
}

export interface CoursesResponse extends BaseResponse {
  courses?: ApiCourse[];
}

export interface ApiExercise {
  id: string;
  name: string;
  description?: string;
  points?: number;
  difficulty?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateExerciseRequest {
  name: string;
  description?: string;
  points?: number;
  difficulty?: string;
}

export interface UpdateExerciseRequest {
  name?: string;
  description?: string;
  difficulty?: string;
}

export interface UpdateExercisePointsRequest {
  points: number;
}

export interface CloneExerciseRequest {
  name?: string;
}

export interface ApiDataset {
  id: string;
  name: string;
  description?: string;
  type?: string;
  size?: number;
  format?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateDatasetRequest {
  name: string;
  description?: string;
  type?: string;
  format?: string;
}

export interface UpdateDatasetRequest {
  name?: string;
  description?: string;
  type?: string;
  format?: string;
}
