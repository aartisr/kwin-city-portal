// @vitest-environment node

import { getPublishingReadiness } from '../publisher';

const ENV_KEYS = [
  'SOCIAL_PUBLISHING_ENABLED',
  'SOCIAL_AUTO_APPROVE',
  'META_PAGE_ID',
  'META_PAGE_ACCESS_TOKEN',
  'INSTAGRAM_BUSINESS_ACCOUNT_ID',
  'SOCIAL_DEFAULT_IMAGE_URL',
  'LINKEDIN_ACCESS_TOKEN',
  'LINKEDIN_AUTHOR_URN',
  'LINKEDIN_VERSION',
  'X_USER_ACCESS_TOKEN',
] as const;

const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

describe('KWIN SEO agency publishing readiness', () => {
  afterEach(() => {
    for (const key of ENV_KEYS) {
      const value = originalEnv[key];
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  });

  it('reports direct publishing as disabled when the global flag is off', () => {
    delete process.env.SOCIAL_PUBLISHING_ENABLED;

    const readiness = getPublishingReadiness();
    const instagram = readiness.find((item) => item.id === 'instagram');

    expect(instagram?.status).toBe('disabled');
    expect(instagram?.detail).toContain('SOCIAL_PUBLISHING_ENABLED');
  });

  it('reports configured social channels as ready without exposing secret values', () => {
    process.env.SOCIAL_PUBLISHING_ENABLED = 'true';
    process.env.SOCIAL_AUTO_APPROVE = 'true';
    process.env.META_PAGE_ID = 'page-id';
    process.env.META_PAGE_ACCESS_TOKEN = 'secret-token';
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID = 'ig-id';
    process.env.LINKEDIN_ACCESS_TOKEN = 'linkedin-secret-token';
    process.env.LINKEDIN_AUTHOR_URN = 'urn:li:organization:123';
    process.env.X_USER_ACCESS_TOKEN = 'x-secret-token';

    const readiness = getPublishingReadiness();
    const instagram = readiness.find((item) => item.id === 'instagram');
    const facebook = readiness.find((item) => item.id === 'facebook');
    const linkedin = readiness.find((item) => item.id === 'linkedin');
    const x = readiness.find((item) => item.id === 'x');

    expect(instagram?.status).toBe('ready');
    expect(facebook?.status).toBe('ready');
    expect(linkedin?.status).toBe('ready');
    expect(x?.status).toBe('ready');
    expect(JSON.stringify(readiness)).not.toContain('secret-token');
  });
});
