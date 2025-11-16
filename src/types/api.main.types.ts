interface ResponseMetaDto {
  traceId: string;
  timestamp: string;
}

export interface ApiResponseDto<T> {
  success: boolean;
  error?: string;
  meta: ResponseMetaDto;
  data: T[];
}
