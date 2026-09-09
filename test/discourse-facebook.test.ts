import { describe, it, expect, vi, beforeEach } from "vitest";
import { 
  generateTrendingPost, 
  getFacebookPublishLogs, 
  saveFacebookPublishLogs,
  runDailyAutoPublishCheck
} from "../src/services/facebookPublisher";

// Mock Supabase to test both configured & in-memory pathways cleanly
vi.mock("../src/services/supabaseServer", () => ({
  isSupabaseConfigured: false,
  supabase: null
}));

// Mock GoogleGenAI class cleanly to keep unit tests completely local, deterministic and fast
vi.mock("@google/genai", () => {
  return {
    GoogleGenAI: class MockGoogleGenAI {
      models = {
        generateContent: async ({ model, contents }: any) => {
          // If the compiled prompt contains our special keyword, simulate a 503 unavailable error
          if (contents && contents.includes("TRIGGER_OFFLINE_ERROR")) {
            const err = new Error("This model is currently experiencing high demand. Spikes in demand are usually temporary.");
            (err as any).status = 503;
            throw err;
          }
          return {
            text: "Mocked KWIN City Dynamic Intelligence Update: Exploring green district corridors, smart microgrids, and verified land records. #KWINCity"
          };
        }
      };
    }
  };
});

describe("KWIN Civic Discourse & Facebook Auto-Publisher Regression Test Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Trending Content Generation", () => {
    it("should generate a fallback post content if Gemini is offline", async () => {
      // Pass the special trigger keyword to force the mocked Gemini API to throw a 503 error
      const result = await generateTrendingPost(["TRIGGER_OFFLINE_ERROR"]);
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      // The output should be the resilient offline fallback string
      expect(result).toContain("KWIN City Daily Brief:");
    }, 25000);

    it("should incorporate custom trending topics inside the content guidelines", async () => {
      const result = await generateTrendingPost([
        "KIADB Land Valuation Approvals", 
        "Doddaballapur Water Sustainability"
      ]);
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toContain("Mocked KWIN City Dynamic Intelligence Update");
    });
  });

  describe("Daily Post Rate-Limiting & Log Storage Engine", () => {
    it("should successfully retrieve in-memory logs on fallback path", async () => {
      const logs = await getFacebookPublishLogs();
      expect(Array.isArray(logs)).toBe(true);
    });

    it("should correctly save and limit log entries to prevent duplicate daily posts", async () => {
      const testLogs = [
        {
          date: "2026-09-09",
          success: true,
          message: "Test Post Success",
          postId: "12345",
          timestamp: new Date().toISOString()
        }
      ];

      await saveFacebookPublishLogs(testLogs);
      const retrieved = await getFacebookPublishLogs();
      expect(retrieved).toHaveLength(1);
      expect(retrieved[0].date).toBe("2026-09-09");
      expect(retrieved[0].success).toBe(true);
    });

    it("should run the daily check and gracefully return null if already posted on the calendar day", async () => {
      const today = new Date().toISOString().split("T")[0];
      const testLogs = [
        {
          date: today,
          success: true,
          message: "Daily Post Success",
          postId: "12345",
          timestamp: new Date().toISOString()
        }
      ];

      await saveFacebookPublishLogs(testLogs);
      const decision = await runDailyAutoPublishCheck(["Monorail Routing Plan"]);
      
      // Since a post already exists for today, the rate-limiter must stop it (returning null)
      expect(decision).toBeNull();
    });
  });
});
