'use client';
import { signInGoogle } from '@/actions/signIn';
import { Button } from '@/components/ui/button';

export default function LoginButton() {
  return <Button onClick={signInGoogle}>Login!</Button>;
}
