-- KWIN City Portal - Supabase Schema
-- Run this SQL in your Supabase dashboard to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- User Preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  persona TEXT NOT NULL DEFAULT 'citizen',
  favorite_topics TEXT[] DEFAULT '{}',
  digest_frequency TEXT NOT NULL DEFAULT 'weekly',
  email_updates BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_preferences_email ON user_preferences(email);

-- Discussion Posts table
CREATE TABLE IF NOT EXISTS discussion_posts (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_discussion_posts_created_at ON discussion_posts(created_at DESC);

-- Discussion Replies table
CREATE TABLE IF NOT EXISTS discussion_replies (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES discussion_posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_discussion_replies_post_id ON discussion_replies(post_id);
CREATE INDEX idx_discussion_replies_created_at ON discussion_replies(created_at ASC);

-- Function to increment post likes (called by increment_post_likes RPC)
CREATE OR REPLACE FUNCTION increment_post_likes(post_id TEXT)
RETURNS INTEGER AS $$
  UPDATE discussion_posts
  SET likes = likes + 1
  WHERE id = post_id
  RETURNING likes;
$$ LANGUAGE SQL;

-- RPC for incrementing likes (optional, can be called directly from client)
CREATE OR REPLACE FUNCTION increment_post_likes_rpc(post_id TEXT)
RETURNS INTEGER AS $$
BEGIN
  UPDATE discussion_posts
  SET likes = likes + 1
  WHERE id = post_id;
  
  RETURN (SELECT likes FROM discussion_posts WHERE id = post_id);
END;
$$ LANGUAGE plpgsql;

-- Set up Row Level Security (RLS) policies (optional, adjust based on your auth needs)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;

-- Public read access for posts and replies
CREATE POLICY "Enable read access for all users" ON discussion_posts
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON discussion_replies
  FOR SELECT USING (true);

-- Allow authenticated users to create posts (adjust auth method as needed)
-- This assumes you have an auth context set up. For now, we'll allow public writes
-- since we're validating auth in the API layer.
CREATE POLICY "Enable insert for all users" ON discussion_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON discussion_replies
  FOR INSERT WITH CHECK (true);

-- Allow updates to post likes
CREATE POLICY "Enable like updates" ON discussion_posts
  FOR UPDATE USING (true) WITH CHECK (true);

-- Policies for users table (public writes for signup, reads for authentication)
CREATE POLICY "Enable read access for users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for users" ON users
  FOR UPDATE USING (true) WITH CHECK (true);

-- Policies for user_preferences table (public writes for preferences, reads for retrieval)
CREATE POLICY "Enable read access for preferences" ON user_preferences
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for preferences" ON user_preferences
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for preferences" ON user_preferences
  FOR UPDATE USING (true) WITH CHECK (true);

-- Seed data (optional - you can comment this out if you prefer to keep it empty)
INSERT INTO discussion_posts (id, author, title, text, likes, created_at)
VALUES (
  '1',
  'Admin',
  'Welcome to KWIN Community Discussion',
  'This is a space for residents, investors, researchers, and journalists to discuss the future of North Bengaluru and the KWIN initiatives.',
  5,
  NOW() - INTERVAL '7 days'
),
(
  '2',
  'Admin',
  'What are your expectations for the innovation hub?',
  'Share your thoughts on how the innovation hub can support startups and entrepreneurs in North Bengaluru.',
  3,
  NOW() - INTERVAL '3 days'
)
ON CONFLICT DO NOTHING;
