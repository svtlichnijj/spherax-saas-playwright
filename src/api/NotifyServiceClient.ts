import { ApiClient } from '~api/ApiClient.js';
import type { GetInTouchDto, HealthApiResponseDto, ContactApiResponseDto } from '~types/api.notify.types.js';

export class NotifyServiceClient {
  private client: ApiClient;
  private readonly version: string;

  constructor(client: ApiClient, version: string = '1') {
    this.client = client;
    this.version = version;
  }

  /**
   * Health check
   *
   * @see /notify/health (GET)
   */
  async getHealth(): Promise<HealthApiResponseDto> {
    const response = await this.client.get<HealthApiResponseDto>('/notify/health', undefined, {
      'x-api-version': this.version,
    });
    return response.data;
  }

  /**
   * Submit a contact form
   *
   * @see /notify/get-in-touch (POST)
   */
  async submitGetInTouch(payload: GetInTouchDto): Promise<ContactApiResponseDto> {
    const response = await this.client.post<ContactApiResponseDto>('/notify/get-in-touch', payload, {
      'x-api-version': this.version,
    });
    return response.data;
  }
}
