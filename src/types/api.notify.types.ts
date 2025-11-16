import type { ApiResponseDto } from '~types/api.main.types.js';

export interface HealthDataDto {
  service: string;
  version: string;
  uptime: number;
}

export type HealthApiResponseDto = ApiResponseDto<HealthDataDto>;

export interface GetInTouchDto {
  name: string;
  email: string;
  company?: string;
  reCaptchaPublicToken?: string;
  more?: string;
}

export interface MessageResponseDto {
  success: boolean;
  status: string;
}

export type ContactApiResponseDto = ApiResponseDto<MessageResponseDto>;
