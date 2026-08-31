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
export { createAlertSubscription, disableAlertSubscription } from './data-layer/value-add-alerts';
export { createExportJob, findExportJob } from './data-layer/value-add-exports';
export { createOpportunityLeadRecord, listOpportunityLeadRecords } from './data-layer/value-add-opportunities';
