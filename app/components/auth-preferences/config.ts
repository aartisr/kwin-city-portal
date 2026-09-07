export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export type Preferences = {
  persona: 'investor' | 'resident' | 'researcher' | 'journalist' | 'citizen';
  favoriteTopics: string[];
  digestFrequency: 'daily' | 'weekly' | 'monthly';
  emailUpdates: boolean;
};

export const defaultPreferences: Preferences = {
  persona: 'resident',
  favoriteTopics: ['timeline'],
  digestFrequency: 'weekly',
  emailUpdates: true,
};

export const allTopics = ['timeline', 'sectors', 'sustainability', 'evidence', 'news-intelligence'];
