import { createAlertSubscription, disableAlertSubscription } from '@/lib/server/data-layer';
import type { AlertSubscription, AlertSubscriptionResponse } from '@/types/value-add';

export async function createSubscription(input: AlertSubscription): Promise<AlertSubscriptionResponse> {
  return createAlertSubscription(input);
}

export async function disableSubscription(subscriptionId: string): Promise<AlertSubscriptionResponse | null> {
  return disableAlertSubscription(subscriptionId);
}

export function isValidCadence(value: string): value is AlertSubscription['cadence'] {
  return value === 'daily' || value === 'weekly' || value === 'monthly';
}

export function isValidPersona(value: string): value is AlertSubscription['persona'] {
  return value === 'resident' || value === 'investor' || value === 'researcher' || value === 'journalist' || value === 'citizen';
}