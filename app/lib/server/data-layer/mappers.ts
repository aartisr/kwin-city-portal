import type {
  DatabaseDiscussionPostRow,
  DatabaseDiscussionReplyRow,
  DatabaseUserRow,
  DiscussionPost,
  DiscussionReply,
  UserRecord,
} from '../models';

export function mapUserRowToRecord(row: DatabaseUserRow): UserRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash ?? '',
    passwordSalt: row.password_salt ?? '',
    createdAt: row.created_at,
  };
}

export function mapReplyRow(row: DatabaseDiscussionReplyRow): DiscussionReply {
  return {
    id: row.id,
    author: row.author,
    text: row.text,
    createdAt: row.created_at,
  };
}

export function mapPostRow(
  row: DatabaseDiscussionPostRow,
  replies: DatabaseDiscussionReplyRow[] = [],
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
