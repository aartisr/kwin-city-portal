export type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
};

export type UserPreference = {
  persona: "investor" | "resident" | "researcher" | "journalist" | "citizen";
  favoriteTopics: string[];
  digestFrequency: "daily" | "weekly" | "monthly";
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
  persona: UserPreference["persona"];
  favorite_topics: string[] | null;
  digest_frequency: UserPreference["digestFrequency"];
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

export type DatabaseSeoAgencyRunRow = {
  id: string;
  run_date: string;
  generated_at: string;
  payload: unknown;
  created_at?: string;
};

export type DatabaseNewsletterSignupRow = {
  id: string;
  email: string;
  name: string | null;
  interests: string | null;
  created_at: string;
};

export type DatabaseSocialPublishReservationRow = {
  id: string;
  platform: string;
  fingerprint: string;
  source_url: string;
  run_id: string;
  status: "reserved" | "published" | "failed" | "indeterminate";
  lease_token: string;
  lease_expires_at: string;
  attempts: number;
  platform_post_id: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type DatabaseOperationalVerificationAttemptRow = {
  id: string; idempotency_key: string; suite: string; outcome: string; qualified: boolean;
  policy_version: string; started_at: string; completed_at: string; commit_sha: string | null;
  environment: string; provider: string; provider_run_id: string | null; provider_run_url: string | null;
  trigger_name: string; controls: unknown; manifest: unknown; manifest_sha256: string;
  failure_code: string | null; failure_summary: string | null; created_at: string;
};

export type DatabaseOperationalFreshnessQualificationRow = {
  id: string; rail: string; attempt_id: string; qualified_at: string; expires_at: string;
  policy_version: string; commit_sha: string | null; created_at: string;
};

export type DatabaseOperationalSchedulerHeartbeatRow = {
  id: string; idempotency_key: string; provider: string; schedule_id: string; invocation_id: string;
  outcome: string; duration_ms: number | null; failure_code: string | null; received_at: string; completed_at: string | null;
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
        Insert: Omit<DatabaseUserPreferenceRow, "id"> & { id?: string };
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
      seo_agency_runs: {
        Row: DatabaseSeoAgencyRunRow;
        Insert: Omit<DatabaseSeoAgencyRunRow, "created_at"> & {
          created_at?: string;
        };
        Update: Partial<DatabaseSeoAgencyRunRow>;
        Relationships: [];
      };
      newsletter_signups: {
        Row: DatabaseNewsletterSignupRow;
        Insert: Omit<DatabaseNewsletterSignupRow, "id"> & { id?: string };
        Update: Partial<DatabaseNewsletterSignupRow>;
        Relationships: [];
      };
      social_publish_reservations: {
        Row: DatabaseSocialPublishReservationRow;
        Insert: Omit<
          DatabaseSocialPublishReservationRow,
          "id" | "created_at" | "updated_at" | "published_at"
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: Partial<DatabaseSocialPublishReservationRow>;
        Relationships: [];
      };
      operational_verification_attempts: {
        Row: DatabaseOperationalVerificationAttemptRow;
        Insert: Omit<DatabaseOperationalVerificationAttemptRow, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: never;
        Relationships: [];
      };
      operational_freshness_qualifications: {
        Row: DatabaseOperationalFreshnessQualificationRow;
        Insert: Omit<DatabaseOperationalFreshnessQualificationRow, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: never;
        Relationships: [];
      };
      operational_scheduler_heartbeats: {
        Row: DatabaseOperationalSchedulerHeartbeatRow;
        Insert: Omit<DatabaseOperationalSchedulerHeartbeatRow, 'id' | 'received_at'> & { id?: string; received_at?: string };
        Update: Partial<DatabaseOperationalSchedulerHeartbeatRow>;
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
      acquire_social_publish_reservation: {
        Args: {
          p_platform: string;
          p_fingerprint: string;
          p_source_url: string;
          p_run_id: string;
          p_lease_token: string;
        };
        Returns: Array<{ acquired: boolean; reservation_id: string | null }>;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
