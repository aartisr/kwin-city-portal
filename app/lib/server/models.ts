export type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
};

export type UserPreference = {
  persona: 'investor' | 'resident' | 'researcher' | 'journalist' | 'citizen';
  favoriteTopics: string[];
  digestFrequency: 'daily' | 'weekly' | 'monthly';
  emailUpdates: boolean;
};

export type PreferencesStore = Record<string, UserPreference>;

export type DiscussionReply = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export type DiscussionPost = {
  id: string;
  author: string;
  title: string;
  text: string;
  likes: number;
  createdAt: string;
  replies: DiscussionReply[];
};

export type DatabaseUserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string | null;
  password_salt: string | null;
  created_at: string;
};

export type DatabaseUserPreferenceRow = {
  id: string;
  email: string;
  persona: UserPreference['persona'];
  favorite_topics: string[] | null;
  digest_frequency: UserPreference['digestFrequency'];
  email_updates: boolean;
  updated_at?: string;
};

export type DatabaseDiscussionReplyRow = {
  id: string;
  post_id: string;
  author: string;
  text: string;
  created_at: string;
};

export type DatabaseDiscussionPostRow = {
  id: string;
  author: string;
  title: string;
  text: string;
  likes: number | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: DatabaseUserRow;
        Insert: DatabaseUserRow;
        Update: Partial<DatabaseUserRow>;
        Relationships: [];
      };
      user_preferences: {
        Row: DatabaseUserPreferenceRow;
        Insert: Omit<DatabaseUserPreferenceRow, 'id'> & { id?: string };
        Update: Partial<DatabaseUserPreferenceRow>;
        Relationships: [];
      };
      discussion_posts: {
        Row: DatabaseDiscussionPostRow;
        Insert: DatabaseDiscussionPostRow;
        Update: Partial<DatabaseDiscussionPostRow>;
        Relationships: [];
      };
      discussion_replies: {
        Row: DatabaseDiscussionReplyRow;
        Insert: DatabaseDiscussionReplyRow;
        Update: Partial<DatabaseDiscussionReplyRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_post_likes: {
        Args: {
          post_id: string;
        };
        Returns: number;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
