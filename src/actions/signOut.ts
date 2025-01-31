'use server';
import { signOut as signOutOriginal } from '@/lib/auth';
export async function signOut() {
  await signOutOriginal();
}
