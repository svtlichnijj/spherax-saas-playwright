import { test, expect } from '~fixtures/api-fixtures.js';

test.describe('IAM Service API (Public Endpoints)', () => {
  test('Get service health status', async ({ iamServiceFactory }) => {
    const iamService = iamServiceFactory();
    const response = await iamService.getHealth();

    expect(response.success).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);

    if (response.data[0] !== undefined) {
      expect(response.data[0].service).toBeDefined();
    } else {
      throw new Error(`Unexpected response data format: "${response.data}"`);
    }
  });

  test('Get tenant authorization URL for "demo" tenant', async ({ iamServiceFactory }) => {
    const iamService = iamServiceFactory();
    const tenantName = 'demo';
    const response = await iamService.getTenantAuthUrl(tenantName);

    expect(response.success).toBe(true);
    expect(response.data.length).toBe(1);

    if (response.data[0] !== undefined) {
      const authUrl = response.data[0].authUrl;

      expect(authUrl).toContain('spherax-saas-dev-dev01.auth.eu-central-1.amazoncognito.com');
      expect(authUrl).toContain(`state=${tenantName}`);
    } else {
      throw new Error(`Unexpected response data format: "${response.data}"`);
    }
  });

  test('Error for a non-existent tenant', async ({ iamServiceFactory }) => {
    const iamService = iamServiceFactory();
    const tenantDoesNotExist = 'this-tenant-does-not-exist-123';
    const response = await iamService.getTenantAuthUrl(tenantDoesNotExist);

    expect(response.success).toBe(false);
    expect(response.error).toContain('Tenant not found for key: ' + tenantDoesNotExist);
  });
});
