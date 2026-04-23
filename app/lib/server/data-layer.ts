import { getSupabase } from './supabase-client';
import { readJsonFile, writeJsonFile } from './store';
import type {
  UserRecord,
  UserPreference,
  PreferencesStore,
  DiscussionPost,
  DiscussionReply,
  DatabaseUserRow,
  DatabaseDiscussionPostRow,
  DatabaseDiscussionReplyRow,
} from './models';

/**
 * Unified data layer that abstracts between Supabase and file-based storage.
 * If Supabase is configured, it uses it. Otherwise, falls back to the file-based system.
 */

function mapUserRowToRecord(row: DatabaseUserRow): UserRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash ?? '',
    passwordSalt: row.password_salt ?? '',
    createdAt: row.created_at,
  };
}

function mapReplyRow(row: DatabaseDiscussionReplyRow): DiscussionReply {
  return {
    id: row.id,
    author: row.author,
    text: row.text,
    createdAt: row.created_at,
  };
}

function mapPostRow(
  row: DatabaseDiscussionPostRow,
  replies: DatabaseDiscussionReplyRow[] = []
): DiscussionPost {
  return {
    id: row.id,
    author: row.author,
    title: row.title,
    text: row.text,
    likes: row.likes ?? 0,
    createdAt: row.created_at,
    replies: replies.map(mapReplyRow),
  };
}

// ============== USERS ==============

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          // Supabase unavailable/forbidden: fall back to file storage.
          console.error('Supabase findUserByEmail error:', error);
        }
      } else if (data) {
        return mapUserRowToRecord(data);
      }
    } catch (err) {
      console.error('Supabase findUserByEmail exception:', err);
    }
  }

  // Fallback to file-based storage
  const users = await readJsonFile<UserRecord[]>('users.json', []);
  return users.find((u) => u.email === email) || null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Supabase findUserById error:', error);
        }
      } else if (data) {
        return mapUserRowToRecord(data);
      }
    } catch (err) {
      console.error('Supabase findUserById exception:', err);
    }
  }

  // Fallback
  const users = await readJsonFile<UserRecord[]>('users.json', []);
  return users.find((u) => u.id === id) || null;
}

export async function createUser(user: UserRecord): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { error } = await supabase.from('users').insert([
        {
          id: user.id,
          name: user.name,
          email: user.email,
          password_hash: user.passwordHash,
          password_salt: user.passwordSalt,
          created_at: user.createdAt,
        },
      ]);
      if (error) {
        console.error('Supabase createUser error:', error);
        throw error;
      }
      return;
    } catch (err) {
      console.error('Supabase createUser exception:', err);
    }
  }

  // Fallback
  const users = await readJsonFile<UserRecord[]>('users.json', []);
  users.push(user);
  await writeJsonFile('users.json', users);
}

// ============== PREFERENCES ==============

export async function getPreferences(email: string): Promise<UserPreference | null> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Supabase getPreferences error:', error);
        }
      } else if (data) {
        return {
          persona: data.persona,
          favoriteTopics: data.favorite_topics || [],
          digestFrequency: data.digest_frequency,
          emailUpdates: data.email_updates,
        };
      }
    } catch (err) {
      console.error('Supabase getPreferences exception:', err);
    }
  }

  // Fallback
  const store = await readJsonFile<PreferencesStore>('preferences.json', {});
  return store[email] || null;
}

export async function setPreferences(email: string, prefs: UserPreference): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      // Check if preferences already exist
      const { data: existing, error: checkError } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // Unexpected error, log it
        console.error('Supabase setPreferences check error:', checkError);
      }

      const payload = {
        email,
        persona: prefs.persona,
        favorite_topics: prefs.favoriteTopics,
        digest_frequency: prefs.digestFrequency,
        email_updates: prefs.emailUpdates,
        updated_at: new Date().toISOString(),
      };

      // If exists, update; otherwise insert
      if (existing) {
        const { error: updateError } = await supabase
          .from('user_preferences')
          .update(payload)
          .eq('email', email);

        if (updateError) {
          console.error('Supabase setPreferences update error:', updateError);
          throw updateError;
        }
      } else {
        const { error: insertError } = await supabase
          .from('user_preferences')
          .insert([payload]);

        if (insertError) {
          console.error('Supabase setPreferences insert error:', insertError);
          throw insertError;
        }
      }
      return;
    } catch (err) {
      console.error('Supabase setPreferences exception:', err);
    }
  }

  // Fallback
  const store = await readJsonFile<PreferencesStore>('preferences.json', {});
  store[email] = prefs;
  await writeJsonFile('preferences.json', store);
}

// ============== COMMUNITY POSTS ==============

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
        // Fetch replies for each post
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
    } catch (err) {
      console.error('Supabase getAllPosts exception:', err);
    }
  }

  // Fallback
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
    } catch (err) {
      console.error('Supabase getPostById exception:', err);
    }
  }

  // Fallback
  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  return posts.find((p) => p.id === postId) || null;
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
    } catch (err) {
      console.error('Supabase createPost exception:', err);
    }
  }

  // Fallback
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

      const { error } = await supabase
        .from('discussion_posts')
        .update(updateData)
        .eq('id', postId);

      if (error) {
        console.error('Supabase updatePost error:', error);
        throw error;
      }
      return;
    } catch (err) {
      console.error('Supabase updatePost exception:', err);
    }
  }

  // Fallback
  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...updates };
    await writeJsonFile('community.json', posts);
  }
}

// ============== COMMUNITY REPLIES ==============

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
    } catch (err) {
      console.error('Supabase addReplyToPost exception:', err);
    }
  }

  // Fallback
  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  const post = posts.find((p) => p.id === postId);
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
        // Try direct update as fallback
        const { data: post } = await supabase
          .from('discussion_posts')
          .select('likes')
          .eq('id', postId)
          .single();

        if (post) {
          const newLikes = (post.likes || 0) + 1;
          await supabase
            .from('discussion_posts')
            .update({ likes: newLikes })
            .eq('id', postId);
          return newLikes;
        }
        throw error;
      }

      return data || 0;
    } catch (err) {
      console.error('Supabase incrementPostLikes exception:', err);
    }
  }

  // Fallback
  const posts = await readJsonFile<DiscussionPost[]>('community.json', []);
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.likes += 1;
    await writeJsonFile('community.json', posts);
    return post.likes;
  }

  return 0;
}
