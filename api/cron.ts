import handler from "./facebook/cron";

/**
 * Unified Daily Social Media Cron Job for Vercel
 * 
 * Runs as a single cron task in vercel.json:
 *   {
 *     "path": "/api/cron",
 *     "schedule": "30 3 * * *"
 *   }
 * 
 * Sequentially executes all configured social channels:
 *  1. Facebook Page
 *  2. Instagram Business (@hellokwincityconnect)
 *  3. WhatsApp Cloud API Daily Broadcast
 *  4. LinkedIn Thought Leadership (if configured)
 *  5. X / Twitter (if configured)
 */
export default handler;
