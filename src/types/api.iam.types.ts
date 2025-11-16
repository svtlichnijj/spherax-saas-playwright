import type { ApiResponseDto } from '~types/api.main.types.js';

export interface HealthDataDto {
  service: string;
  version: string;
  uptime: number;
}

export type HealthApiResponseDto = ApiResponseDto<HealthDataDto>;

export interface AuthUrlResponseDto {
  authUrl: string;
}

export type AuthUrlApiResponseDto = ApiResponseDto<AuthUrlResponseDto>;
