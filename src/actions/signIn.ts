'use server';
import { signIn as signInOriginal } from '@/lib/auth';
export async function signInGoogle() {
  await signInOriginal('google');
}
