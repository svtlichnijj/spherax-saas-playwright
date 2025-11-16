import { ApiClient } from '~api/ApiClient.js';
import type { AuthUrlApiResponseDto, HealthApiResponseDto } from '~types/api.iam.types.js';

export class IamServiceClient {
  private client: ApiClient;
  private readonly version: string;

  constructor(client: ApiClient, version: string = '1') {
    this.client = client;
    this.version = version;
  }

  /**
   * Health check
   *
   * @see /iam/health (GET)
   */
  async getHealth(): Promise<HealthApiResponseDto> {
    const response = await this.client.get<HealthApiResponseDto>('/iam/health', undefined, {
      'x-api-version': this.version,
    });
    return response.data;
  }

  /**
   * Get URL for OAuth-authorization for a specific tenant
   *
   * @param tenant (like "demo")
   * @see /iam/auth/tenant/{tenant} (GET)
   */
  async getTenantAuthUrl(tenant: string): Promise<AuthUrlApiResponseDto> {
    const response = await this.client.get<AuthUrlApiResponseDto>(`/iam/auth/tenant/${tenant}`, undefined, {
      'x-api-version': this.version,
    });
    return response.data;
  }
}
