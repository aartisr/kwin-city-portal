import { readJsonFile, writeJsonFile } from '../store';
import { getSupabase } from '../supabase-client';
import type { UserRecord } from '../models';
import { mapUserRowToRecord } from './mappers';

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Supabase findUserByEmail error:', error);
        }
      } else if (data) {
        return mapUserRowToRecord(data);
      }
    } catch (error) {
      console.error('Supabase findUserByEmail exception:', error);
    }
  }

  const users = await readJsonFile<UserRecord[]>('users.json', []);
  return users.find((user) => user.email === email) || null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Supabase findUserById error:', error);
        }
      } else if (data) {
        return mapUserRowToRecord(data);
      }
    } catch (error) {
      console.error('Supabase findUserById exception:', error);
    }
  }

  const users = await readJsonFile<UserRecord[]>('users.json', []);
  return users.find((user) => user.id === id) || null;
}

export async function createUser(user: UserRecord): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { error } = await supabase.from('users').insert([
        {
          id: user.id,
          name: user.name,
          email: user.email,
          password_hash: user.passwordHash,
          password_salt: user.passwordSalt,
          created_at: user.createdAt,
        },
      ]);

      if (error) {
        console.error('Supabase createUser error:', error);
        throw error;
      }

      return;
    } catch (error) {
      console.error('Supabase createUser exception:', error);
    }
  }

  const users = await readJsonFile<UserRecord[]>('users.json', []);
  users.push(user);
  await writeJsonFile('users.json', users);
}
