import { describe, expect, it } from 'vitest';
import * as dataLayer from '@/lib/server/data-layer';

describe('server/data-layer facade', () => {
  it('re-exports the public data-layer contract', () => {
    expect(typeof dataLayer.findUserByEmail).toBe('function');
    expect(typeof dataLayer.findUserById).toBe('function');
    expect(typeof dataLayer.createUser).toBe('function');
    expect(typeof dataLayer.getPreferences).toBe('function');
    expect(typeof dataLayer.setPreferences).toBe('function');
    expect(typeof dataLayer.getAllPosts).toBe('function');
    expect(typeof dataLayer.getPostById).toBe('function');
    expect(typeof dataLayer.createPost).toBe('function');
    expect(typeof dataLayer.updatePost).toBe('function');
    expect(typeof dataLayer.addReplyToPost).toBe('function');
    expect(typeof dataLayer.incrementPostLikes).toBe('function');
  });
});
