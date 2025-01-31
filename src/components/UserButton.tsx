import LoginButton from '@/components/LoginButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserButtonDropdownContent from '@/components/UserButtonDropdownContent';
import { auth } from '@/lib/auth';

export default async function UserButton() {
  const session = await auth();
  if (!session?.user) return <LoginButton />;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='size-8 select-none cursor-pointer'>
            <AvatarImage src={session.user.image ?? undefined} />
            <AvatarFallback />
          </Avatar>
        </DropdownMenuTrigger>
        <UserButtonDropdownContent session={session} />
      </DropdownMenu>
    </div>
  );
}
