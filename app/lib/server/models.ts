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
