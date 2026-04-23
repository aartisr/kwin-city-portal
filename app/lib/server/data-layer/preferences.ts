import type { PreferencesStore, UserPreference } from '../models';
import { readJsonFile, writeJsonFile } from '../store';
import { getSupabase } from '../supabase-client';

export async function getPreferences(email: string): Promise<UserPreference | null> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase.from('user_preferences').select('*').eq('email', email).single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Supabase getPreferences error:', error);
        }
      } else if (data) {
        return {
          persona: data.persona,
          favoriteTopics: data.favorite_topics || [],
          digestFrequency: data.digest_frequency,
          emailUpdates: data.email_updates,
        };
      }
    } catch (error) {
      console.error('Supabase getPreferences exception:', error);
    }
  }

  const store = await readJsonFile<PreferencesStore>('preferences.json', {});
  return store[email] || null;
}

export async function setPreferences(email: string, prefs: UserPreference): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data: existing, error: checkError } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Supabase setPreferences check error:', checkError);
      }

      const payload = {
        email,
        persona: prefs.persona,
        favorite_topics: prefs.favoriteTopics,
        digest_frequency: prefs.digestFrequency,
        email_updates: prefs.emailUpdates,
        updated_at: new Date().toISOString(),
      };

      if (existing) {
        const { error } = await supabase.from('user_preferences').update(payload).eq('email', email);
        if (error) {
          console.error('Supabase setPreferences update error:', error);
          throw error;
        }
      } else {
        const { error } = await supabase.from('user_preferences').insert([payload]);
        if (error) {
          console.error('Supabase setPreferences insert error:', error);
          throw error;
        }
      }

      return;
    } catch (error) {
      console.error('Supabase setPreferences exception:', error);
    }
  }

  const store = await readJsonFile<PreferencesStore>('preferences.json', {});
  store[email] = prefs;
  await writeJsonFile('preferences.json', store);
}
