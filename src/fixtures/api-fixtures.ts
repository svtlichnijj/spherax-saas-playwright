import playwright from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { test as base } from '@playwright/test';

import { ApiClient } from '~api/ApiClient.js';
import { IamServiceClient } from '~api/IamServiceClient.js';
import { NotifyServiceClient } from '~api/NotifyServiceClient.js';
import { CoreServiceClient } from '~api/CoreServiceClient.js';

type ApiFixtures = {
  apiClient: ApiClient;
  iamServiceFactory: (version?: string) => IamServiceClient;
  // OR
  // iamService: IamServiceClient;
  // iamServiceV2: IamServiceClient;
  notifyService: NotifyServiceClient;
  coreService: CoreServiceClient;
};

export const test = base.extend<ApiFixtures>({
  // eslint-disable-next-line no-empty-pattern
  apiClient: async ({}, use) => {
    const requestContext: APIRequestContext = await playwright.request.newContext({
      baseURL: process.env.SPHERAX_API_URL || 'https://api.dev01.sphrx.xyz',
    });

    const apiClient = new ApiClient(requestContext);
    await use(apiClient);
    await requestContext.dispose();
  },

  iamServiceFactory: async ({ apiClient }, use) => {
    const createIamService = (version: string = '1'): IamServiceClient => {
      return new IamServiceClient(apiClient, version);
    };

    await use(createIamService);
  },
  // OR
  // iamService: async ({ apiClient }, use) => {
  //   await use(new IamServiceClient(apiClient));
  // },
  // iamServiceV2: async ({ apiClient }, use) => {
  //   await use(new IamServiceClient(apiClient, '2'));
  // },

  notifyService: async ({ apiClient }, use) => {
    await use(new NotifyServiceClient(apiClient));
  },

  coreService: async ({ apiClient }, use) => {
    await use(new CoreServiceClient(apiClient));
  },
});

export { expect } from '@playwright/test';
