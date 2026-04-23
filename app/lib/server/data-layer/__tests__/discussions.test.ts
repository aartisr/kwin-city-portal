import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addReplyToPost,
  createPost,
  getAllPosts,
  getPostById,
  incrementPostLikes,
  updatePost,
} from '@/lib/server/data-layer/discussions';

const {
  mockGetSupabase,
  mockReadJsonFile,
  mockWriteJsonFile,
} = vi.hoisted(() => ({
  mockGetSupabase: vi.fn(),
  mockReadJsonFile: vi.fn(),
  mockWriteJsonFile: vi.fn(),
}));

vi.mock('@/lib/server/supabase-client', () => ({
  getSupabase: mockGetSupabase,
}));

vi.mock('@/lib/server/store', () => ({
  readJsonFile: mockReadJsonFile,
  writeJsonFile: mockWriteJsonFile,
}));

describe('server/data-layer discussions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hydrates posts with replies from Supabase records', async () => {
    const orderPosts = vi.fn().mockResolvedValue({
      data: [
        {
          id: 'post-1',
          author: 'Aarti',
          title: 'KWIN question',
          text: 'What is the latest?',
          likes: 3,
          created_at: '2026-04-22T00:00:00.000Z',
        },
      ],
      error: null,
    });
    const orderReplies = vi.fn().mockResolvedValue({
      data: [
        {
          id: 'reply-1',
          post_id: 'post-1',
          author: 'Ravi',
          text: 'Following',
          created_at: '2026-04-22T01:00:00.000Z',
        },
      ],
      error: null,
    });

    const from = vi.fn((table: string) => {
      if (table === 'discussion_posts') {
        return { select: vi.fn().mockReturnValue({ order: orderPosts }) };
      }

      if (table === 'discussion_replies') {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({ order: orderReplies }),
          }),
        };
      }

      throw new Error(`Unexpected table ${table}`);
    });

    mockGetSupabase.mockReturnValue({ from });

    const posts = await getAllPosts();

    expect(posts).toEqual([
      {
        id: 'post-1',
        author: 'Aarti',
        title: 'KWIN question',
        text: 'What is the latest?',
        likes: 3,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [
          {
            id: 'reply-1',
            author: 'Ravi',
            text: 'Following',
            createdAt: '2026-04-22T01:00:00.000Z',
          },
        ],
      },
    ]);
  });

  it('increments likes in fallback storage when Supabase is unavailable', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'post-1',
        author: 'Aarti',
        title: 'KWIN question',
        text: 'What is the latest?',
        likes: 3,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);

    const likes = await incrementPostLikes('post-1');

    expect(likes).toBe(4);
    expect(mockWriteJsonFile).toHaveBeenCalledWith('community.json', [
      {
        id: 'post-1',
        author: 'Aarti',
        title: 'KWIN question',
        text: 'What is the latest?',
        likes: 4,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);
  });

  it('falls back to file posts when Supabase post listing returns an error', async () => {
    const orderPosts = vi.fn().mockResolvedValue({
      data: null,
      error: new Error('posts failed'),
    });
    const from = vi.fn(() => ({
      select: vi.fn().mockReturnValue({ order: orderPosts }),
    }));
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'post-fallback',
        author: 'Fallback',
        title: 'Fallback post',
        text: 'Body',
        likes: 0,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);

    const posts = await getAllPosts();

    expect(posts).toHaveLength(1);
    expect(posts[0].id).toBe('post-fallback');
  });

  it('hydrates posts with empty replies when Supabase reply listing errors', async () => {
    const orderPosts = vi.fn().mockResolvedValue({
      data: [
        {
          id: 'post-replies-error',
          author: 'Aarti',
          title: 'Reply error post',
          text: 'Body',
          likes: 1,
          created_at: '2026-04-22T00:00:00.000Z',
        },
      ],
      error: null,
    });
    const orderReplies = vi.fn().mockResolvedValue({
      data: null,
      error: new Error('reply listing failed'),
    });

    const from = vi.fn((table: string) => {
      if (table === 'discussion_posts') {
        return { select: vi.fn().mockReturnValue({ order: orderPosts }) };
      }

      return {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({ order: orderReplies }),
        }),
      };
    });

    mockGetSupabase.mockReturnValue({ from });

    const posts = await getAllPosts();

    expect(posts).toEqual([
      expect.objectContaining({
        id: 'post-replies-error',
        replies: [],
      }),
    ]);
  });

  it('falls back to file posts when Supabase post listing throws', async () => {
    const orderPosts = vi.fn().mockRejectedValue(new Error('posts exploded'));
    const from = vi.fn(() => ({
      select: vi.fn().mockReturnValue({ order: orderPosts }),
    }));
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'post-catch-fallback',
        author: 'Fallback',
        title: 'Catch fallback',
        text: 'Body',
        likes: 0,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);

    const posts = await getAllPosts();

    expect(posts[0].id).toBe('post-catch-fallback');
  });

  it('gets a single post by id from fallback storage', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'post-2',
        author: 'Ravi',
        title: 'Single post',
        text: 'Body',
        likes: 1,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);

    const post = await getPostById('post-2');

    expect(post?.title).toBe('Single post');
  });

  it('returns null when no fallback post exists', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([]);

    const post = await getPostById('missing-post');

    expect(post).toBeNull();
  });

  it('hydrates a single Supabase post even if replies fetch fails', async () => {
    const single = vi.fn().mockResolvedValue({
      data: {
        id: 'post-2a',
        author: 'Ravi',
        title: 'Supabase single',
        text: 'Body',
        likes: 2,
        created_at: '2026-04-22T00:00:00.000Z',
      },
      error: null,
    });
    const eqSingle = vi.fn().mockReturnValue({ single });
    const selectPosts = vi.fn().mockReturnValue({ eq: eqSingle });

    const orderReplies = vi.fn().mockResolvedValue({
      data: null,
      error: new Error('replies failed'),
    });
    const eqReplies = vi.fn().mockReturnValue({ order: orderReplies });
    const selectReplies = vi.fn().mockReturnValue({ eq: eqReplies });

    const from = vi.fn((table: string) => {
      if (table === 'discussion_posts') {
        return { select: selectPosts };
      }
      return { select: selectReplies };
    });

    mockGetSupabase.mockReturnValue({ from });

    const post = await getPostById('post-2a');

    expect(post?.title).toBe('Supabase single');
    expect(post?.replies).toEqual([]);
  });

  it('creates posts in fallback storage when Supabase is unavailable', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([]);

    await createPost({
      id: 'post-3',
      author: 'Aarti',
      title: 'Created post',
      text: 'Body',
      likes: 0,
      createdAt: '2026-04-22T00:00:00.000Z',
      replies: [],
    });

    expect(mockWriteJsonFile).toHaveBeenCalledWith('community.json', [
      {
        id: 'post-3',
        author: 'Aarti',
        title: 'Created post',
        text: 'Body',
        likes: 0,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);
  });

  it('does not touch fallback storage when Supabase post creation succeeds', async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });

    await createPost({
      id: 'post-success',
      author: 'Aarti',
      title: 'Created post',
      text: 'Body',
      likes: 0,
      createdAt: '2026-04-22T00:00:00.000Z',
      replies: [],
    });

    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file storage when Supabase post creation fails', async () => {
    const insert = vi.fn().mockResolvedValue({ error: new Error('create failed') });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    await createPost({
      id: 'post-create-fallback',
      author: 'Aarti',
      title: 'Fallback create post',
      text: 'Body',
      likes: 0,
      createdAt: '2026-04-22T00:00:00.000Z',
      replies: [],
    });

    expect(mockWriteJsonFile).toHaveBeenCalled();
  });

  it('updates fallback posts in place', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'post-4',
        author: 'Aarti',
        title: 'Old title',
        text: 'Body',
        likes: 0,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);

    await updatePost('post-4', { title: 'New title', likes: 5 });

    expect(mockWriteJsonFile).toHaveBeenCalledWith('community.json', [
      {
        id: 'post-4',
        author: 'Aarti',
        title: 'New title',
        text: 'Body',
        likes: 5,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);
  });

  it('uses Supabase updates when available', async () => {
    const updateEq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq: updateEq });
    const from = vi.fn().mockReturnValue({ update });
    mockGetSupabase.mockReturnValue({ from });

    await updatePost('post-supabase', { title: 'Updated title' });

    expect(update).toHaveBeenCalled();
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file updates when Supabase update fails', async () => {
    const updateEq = vi.fn().mockResolvedValue({ error: new Error('update failed') });
    const update = vi.fn().mockReturnValue({ eq: updateEq });
    const from = vi.fn().mockReturnValue({ update });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'post-update-fallback',
        author: 'Aarti',
        title: 'Old title',
        text: 'Body',
        likes: 0,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);

    await updatePost('post-update-fallback', { text: 'Updated body' });

    expect(mockWriteJsonFile).toHaveBeenCalledWith('community.json', [
      expect.objectContaining({
        id: 'post-update-fallback',
        text: 'Updated body',
      }),
    ]);
  });

  it('skips fallback writes when a local post update targets a missing post', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([]);

    await updatePost('missing-post', { title: 'Ignored' });

    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('adds replies in fallback storage', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'post-5',
        author: 'Aarti',
        title: 'Question',
        text: 'Body',
        likes: 0,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);

    await addReplyToPost('post-5', {
      id: 'reply-5',
      author: 'Ravi',
      text: 'Answer',
      createdAt: '2026-04-22T01:00:00.000Z',
    });

    expect(mockWriteJsonFile).toHaveBeenCalledWith('community.json', [
      {
        id: 'post-5',
        author: 'Aarti',
        title: 'Question',
        text: 'Body',
        likes: 0,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [
          {
            id: 'reply-5',
            author: 'Ravi',
            text: 'Answer',
            createdAt: '2026-04-22T01:00:00.000Z',
          },
        ],
      },
    ]);
  });

  it('uses Supabase inserts for replies when available', async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });

    await addReplyToPost('post-supabase', {
      id: 'reply-supabase',
      author: 'Ravi',
      text: 'Answer',
      createdAt: '2026-04-22T01:00:00.000Z',
    });

    expect(insert).toHaveBeenCalled();
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file reply storage when Supabase reply creation fails', async () => {
    const insert = vi.fn().mockResolvedValue({ error: new Error('reply failed') });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'post-reply-fallback',
        author: 'Aarti',
        title: 'Question',
        text: 'Body',
        likes: 0,
        createdAt: '2026-04-22T00:00:00.000Z',
        replies: [],
      },
    ]);

    await addReplyToPost('post-reply-fallback', {
      id: 'reply-fallback',
      author: 'Ravi',
      text: 'Fallback answer',
      createdAt: '2026-04-22T01:00:00.000Z',
    });

    expect(mockWriteJsonFile).toHaveBeenCalled();
  });

  it('uses the Supabase RPC result for like increments when available', async () => {
    const rpc = vi.fn().mockResolvedValue({ data: 8, error: null });
    mockGetSupabase.mockReturnValue({ rpc });

    const likes = await incrementPostLikes('post-6');

    expect(likes).toBe(8);
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to direct Supabase updates when the like RPC fails', async () => {
    const single = vi.fn().mockResolvedValue({
      data: { likes: 4 },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const updateEq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq: updateEq });
    const from = vi.fn().mockReturnValue({ select, update });
    const rpc = vi.fn().mockResolvedValue({ data: null, error: new Error('rpc failed') });
    mockGetSupabase.mockReturnValue({ rpc, from });

    const likes = await incrementPostLikes('post-rpc-fallback');

    expect(likes).toBe(5);
    expect(update).toHaveBeenCalled();
  });

  it('returns zero when the like RPC resolves without a value', async () => {
    const rpc = vi.fn().mockResolvedValue({ data: null, error: null });
    mockGetSupabase.mockReturnValue({ rpc });

    const likes = await incrementPostLikes('post-no-rpc-value');

    expect(likes).toBe(0);
  });

  it('returns zero when like increment cannot find a Supabase or fallback post', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const update = vi.fn().mockReturnValue({ eq: vi.fn() });
    const from = vi.fn().mockReturnValue({ select, update });
    const rpc = vi.fn().mockResolvedValue({ data: null, error: new Error('rpc failed') });
    mockGetSupabase.mockReturnValue({ rpc, from });
    mockReadJsonFile.mockResolvedValue([]);

    const likes = await incrementPostLikes('missing-like-post');

    expect(likes).toBe(0);
  });
});
