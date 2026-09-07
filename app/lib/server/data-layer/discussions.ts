import type {
  DatabaseDiscussionPostRow,
  DiscussionPost,
  DiscussionReply,
} from '../models';
import { readJsonFile, writeJsonFile } from '../store';
import { getSupabase } from '../supabase-client';
import { mapPostRow } from './mappers';

export async function getAllPosts(): Promise<DiscussionPost[]> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data: posts, error: postsError } = await supabase
        .from('discussion_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Supabase getAllPosts error:', postsError);
      } else if (posts) {
        const postsWithReplies: DiscussionPost[] = [];

        for (const post of posts) {
          const { data: replies, error: repliesError } = await supabase
            .from('discussion_replies')
            .select('*')
            .eq('post_id', post.id)
            .order('created_at', { ascending: true });

          if (repliesError) {
            console.error('Supabase getReplies error:', repliesError);
          }

          postsWithReplies.push(mapPostRow(post, replies || []));
        }

        return postsWithReplies;
      }
    } catch (error) {
      console.error('Supabase getAllPosts exception:', error);
    }
  }

  return readJsonFile<DiscussionPost[]>('community.json', []);
}

export async function getPostById(postId: string): Promise<DiscussionPost | null> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data: post, error: postError } = await supabase
        .from('discussion_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (postError) {
        if (postError.code !== 'PGRST116') {
          console.error('Supabase getPostById error:', postError);
        }
      } else if (post) {
        const { data: replies, error: repliesError } = await supabase
          .from('discussion_replies')
          .select('*')
          .eq('post_id', postId)
          .order('created_at', { ascending: true });

        if (repliesError) {
          console.error('Supabase getReplies error:', repliesError);
        }

        return mapPostRow(post, replies || []);
      }
    } catch (error) {
      console.error('Supabase getPostById exception:', error);
    }
  }

  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  return posts.find((post) => post.id === postId) || null;
}

export async function createPost(post: DiscussionPost): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { error } = await supabase.from('discussion_posts').insert([
        {
          id: post.id,
          author: post.author,
          title: post.title,
          text: post.text,
          likes: post.likes,
          created_at: post.createdAt,
        },
      ]);

      if (error) {
        console.error('Supabase createPost error:', error);
        throw error;
      }

      return;
    } catch (error) {
      console.error('Supabase createPost exception:', error);
    }
  }

  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  posts.push(post);
  await writeJsonFile('community.json', posts);
}

export async function updatePost(postId: string, updates: Partial<DiscussionPost>): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const updateData: Partial<DatabaseDiscussionPostRow> = {};
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.text !== undefined) updateData.text = updates.text;
      if (updates.likes !== undefined) updateData.likes = updates.likes;

      const { error } = await supabase.from('discussion_posts').update(updateData).eq('id', postId);

      if (error) {
        console.error('Supabase updatePost error:', error);
        throw error;
      }

      return;
    } catch (error) {
      console.error('Supabase updatePost exception:', error);
    }
  }

  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...updates };
    await writeJsonFile('community.json', posts);
  }
}

export async function addReplyToPost(postId: string, reply: DiscussionReply): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { error } = await supabase.from('discussion_replies').insert([
        {
          id: reply.id,
          post_id: postId,
          author: reply.author,
          text: reply.text,
          created_at: reply.createdAt,
        },
      ]);

      if (error) {
        console.error('Supabase addReplyToPost error:', error);
        throw error;
      }

      return;
    } catch (error) {
      console.error('Supabase addReplyToPost exception:', error);
    }
  }

  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  const post = posts.find((item) => item.id === postId);
  if (post) {
    post.replies.push(reply);
    await writeJsonFile('community.json', posts);
  }
}

export async function incrementPostLikes(postId: string): Promise<number> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase.rpc('increment_post_likes', {
        post_id: postId,
      });

      if (error) {
        console.error('Supabase incrementPostLikes error:', error);
        const { data: post } = await supabase.from('discussion_posts').select('likes').eq('id', postId).single();

        if (post) {
          const newLikes = (post.likes || 0) + 1;
          await supabase.from('discussion_posts').update({ likes: newLikes }).eq('id', postId);
          return newLikes;
        }

        throw error;
      }

      return data || 0;
    } catch (error) {
      console.error('Supabase incrementPostLikes exception:', error);
    }
  }

  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  const post = posts.find((item) => item.id === postId);
  if (post) {
    post.likes += 1;
    await writeJsonFile('community.json', posts);
    return post.likes;
  }

  return 0;
}
