import { sendJson } from '../_response';

export default async function handler(req: any, res: any) {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    env: {
      hasFacebookPageId: !!process.env.FACEBOOK_PAGE_ID,
      facebookPageIdValue: process.env.FACEBOOK_PAGE_ID || "not set",
      hasFacebookToken: !!process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      isVercel: !!process.env.VERCEL,
    },
    imports: {}
  };

  try {
    diagnostics.imports.publisherModule = "Checking local _publisher...";
    const { getFacebookPublishLogs, isSupabaseConfigured } = await import('./_publisher');
    const logs = await getFacebookPublishLogs();
    diagnostics.imports.publisherModule = `Loaded successfully! Logs Count: ${logs.length}. Supabase status: ${isSupabaseConfigured}`;
  } catch (e: any) {
    diagnostics.imports.publisherModule = `Failed: ${e.message}\n${e.stack}`;
  }

  try {
    diagnostics.testingFetch = "Checking global fetch...";
    const testRes = await fetch("https://graph.facebook.com/v18.0/me?access_token=test_token_diag");
    diagnostics.testingFetch = `Success (Status: ${testRes.status})`;
  } catch (e: any) {
    diagnostics.testingFetch = `Failed: ${e.message}\n${e.stack}`;
  }

  sendJson(res, diagnostics);
}
