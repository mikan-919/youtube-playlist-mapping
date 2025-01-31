import { signInGoogle } from '@/actions/signIn';
import { Button } from '@/components/ui/button';
import { Rocket, Ship } from 'lucide-react';

export default function LoginButton() {
  return (
    <Button variant='outline' onClick={signInGoogle}>
      Login
      <Rocket />
    </Button>
  );
}
