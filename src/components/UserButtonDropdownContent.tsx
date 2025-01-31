import { signOut } from '@/actions/signOut';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import type { Session } from 'next-auth';

type Props = { session: Session };

export default function UserButtonDropdownContent({ session }: Props) {
  if (session.user)
    return (
      <>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </>
    );
  return null;
}
