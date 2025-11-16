import { test, expect } from '~fixtures/api-fixtures.js';
import { faker } from '@faker-js/faker';

test.describe('Notify Service API', () => {
  test('Get service health status', async ({ notifyService }) => {
    const response = await notifyService.getHealth();

    expect(response.success).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);

    if (response.data[0]) {
      expect(response.data[0].service).toBeDefined();
    } else {
      throw new Error('Unexpected health response data');
    }
  });

  test('Submit "Get in Touch" form successfully', async ({ notifyService }) => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      more: faker.lorem.sentence(),
    };

    const response = await notifyService.submitGetInTouch(payload);

    expect(response.success).toBe(true);
    expect(response.data.length).toBe(1);

    if (response.data[0]) {
      expect(response.data[0].success).toBe(true);
      expect(response.data[0].status).toContain('Contact processed. Emails sent successfully. ');
      expect(response.data[0].status).toContain(`From ${payload.name} <${payload.email}>: ${payload.company}`);
    } else {
      throw new Error('Unexpected submit response data');
    }
  });

  test('Error when submitting form without required fields', async ({ notifyService }) => {
    const payload = {
      name: faker.person.fullName(),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const response = await notifyService.submitGetInTouch(payload);

    expect(response.success).toBe(false);
    expect(response.error).toContain('email should not be empty');
    expect(response.error).toContain('email must be an email');
  });
});
