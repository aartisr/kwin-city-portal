import { describe, expect, it } from 'vitest';
import { mapPostRow, mapReplyRow, mapUserRowToRecord } from '@/lib/server/data-layer/mappers';

describe('server/data-layer mappers', () => {
  it('maps nullable user credentials to safe empty strings', () => {
    expect(
      mapUserRowToRecord({
        id: 'user-1',
        name: 'Aarti',
        email: 'aarti@example.com',
        password_hash: null,
        password_salt: null,
        created_at: '2026-04-22T00:00:00.000Z',
      }),
    ).toEqual({
      id: 'user-1',
      name: 'Aarti',
      email: 'aarti@example.com',
      passwordHash: '',
      passwordSalt: '',
      createdAt: '2026-04-22T00:00:00.000Z',
    });
  });

  it('maps replies and defaults missing likes to zero', () => {
    expect(
      mapPostRow(
        {
          id: 'post-1',
          author: 'Aarti',
          title: 'KWIN question',
          text: 'Body',
          likes: null,
          created_at: '2026-04-22T00:00:00.000Z',
        },
        [
          {
            id: 'reply-1',
            post_id: 'post-1',
            author: 'Ravi',
            text: 'Following',
            created_at: '2026-04-22T01:00:00.000Z',
          },
        ],
      ),
    ).toEqual({
      id: 'post-1',
      author: 'Aarti',
      title: 'KWIN question',
      text: 'Body',
      likes: 0,
      createdAt: '2026-04-22T00:00:00.000Z',
      replies: [
        {
          id: 'reply-1',
          author: 'Ravi',
          text: 'Following',
          createdAt: '2026-04-22T01:00:00.000Z',
        },
      ],
    });
  });

  it('maps reply rows directly', () => {
    expect(
      mapReplyRow({
        id: 'reply-2',
        post_id: 'post-2',
        author: 'Meera',
        text: 'Noted',
        created_at: '2026-04-22T02:00:00.000Z',
      }),
    ).toEqual({
      id: 'reply-2',
      author: 'Meera',
      text: 'Noted',
      createdAt: '2026-04-22T02:00:00.000Z',
    });
  });
});
