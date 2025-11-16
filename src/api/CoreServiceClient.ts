import { ApiClient } from '~api/ApiClient.js';
import type { HealthApiResponseDto } from '~types/api.notify.types.js';

export class CoreServiceClient {
  private client: ApiClient;
  private readonly version: string;

  constructor(client: ApiClient, version: string = '1') {
    this.client = client;
    this.version = version;
  }

  /**
   * Health check
   *
   * @see /core/health (GET)
   */
  async getHealth(): Promise<HealthApiResponseDto> {
    const response = await this.client.get<HealthApiResponseDto>('/core/health', undefined, {
      'x-api-version': this.version,
    });
    return response.data;
  }
}
