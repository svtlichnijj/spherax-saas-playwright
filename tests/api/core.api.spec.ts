import { test, expect } from '~fixtures/api-fixtures.js';

test.describe('Core Service API', () => {
  test('Get core health status', async ({ coreService }) => {
    const response = await coreService.getHealth();

    expect(response.success).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);

    if (response.data[0]) {
      expect(response.data[0].service).toBeDefined();
    } else {
      throw new Error('Unexpected health response data');
    }
  });
});
