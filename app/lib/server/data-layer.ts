/**
 * Unified data layer facade.
 *
 * This keeps the public import path stable for API routes while the actual
 * persistence concerns stay split by domain underneath.
 */

export { findUserByEmail, findUserById, createUser } from './data-layer/users';
export { getPreferences, setPreferences } from './data-layer/preferences';
export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  addReplyToPost,
  incrementPostLikes,
} from './data-layer/discussions';
