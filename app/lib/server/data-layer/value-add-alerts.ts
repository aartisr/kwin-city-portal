import crypto from 'crypto';
import { readJsonFile, writeJsonFile } from '../store';
import { getSupabase } from '../supabase-client';
import type { AlertSubscription, AlertSubscriptionResponse } from '@/types/value-add';

type AlertSubscriptionRecord = AlertSubscription & {
  id: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};

const STORE_FILE = 'value-add-alert-subscriptions.json';

export async function createAlertSubscription(input: AlertSubscription): Promise<AlertSubscriptionResponse> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const supabase = getSupabase();
  if (supabase) {
    try {
      const client = supabase as any;
      const payload = {
        id,
        email: input.email,
        persona: input.persona,
        topics: input.topics,
        geofilters: input.geofilters ?? [],
        cadence: input.cadence,
        status: 'active',
        created_at: now,
        updated_at: now,
      };

      const { error } = await client.from('value_add_alert_subscriptions').insert([payload]);
      if (!error) {
        return {
          subscriptionId: id,
          status: 'active',
        };
      }

      console.error('Supabase createAlertSubscription error:', error);
    } catch (error) {
      console.error('Supabase createAlertSubscription exception:', error);
    }
  }

  const records = await readJsonFile<AlertSubscriptionRecord[]>(STORE_FILE, []);
  records.push({
    ...input,
    id,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  });
  await writeJsonFile(STORE_FILE, records);

  return {
    subscriptionId: id,
    status: 'active',
  };
}

export async function disableAlertSubscription(subscriptionId: string): Promise<AlertSubscriptionResponse | null> {
  const now = new Date().toISOString();

  const supabase = getSupabase();
  if (supabase) {
    try {
      const client = supabase as any;
      const { data: existing, error: getError } = await client
        .from('value_add_alert_subscriptions')
        .select('id')
        .eq('id', subscriptionId)
        .single();

      if (getError) {
        if (getError.code !== 'PGRST116') {
          console.error('Supabase disableAlertSubscription fetch error:', getError);
        }
      } else if (existing) {
        const { error: updateError } = await client
          .from('value_add_alert_subscriptions')
          .update({ status: 'inactive', updated_at: now })
          .eq('id', subscriptionId);

        if (!updateError) {
          return {
            subscriptionId,
            status: 'inactive',
          };
        }

        console.error('Supabase disableAlertSubscription update error:', updateError);
      }
    } catch (error) {
      console.error('Supabase disableAlertSubscription exception:', error);
    }
  }

  const records = await readJsonFile<AlertSubscriptionRecord[]>(STORE_FILE, []);
  const index = records.findIndex((record) => record.id === subscriptionId);
  if (index === -1) {
    return null;
  }

  records[index] = {
    ...records[index],
    status: 'inactive',
    updatedAt: now,
  };

  await writeJsonFile(STORE_FILE, records);
  return {
    subscriptionId,
    status: 'inactive',
  };
}
