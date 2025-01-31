import LoginButton from '@/components/LoginButton';
import ThemeChangeButton from '@/components/ThemeChangeButton';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();
  // console.log(session?.accessToken);
  return (
    <div className='items-center justify-items-center h-[calc(100dvh-2rem)] m-4 p-4 shadow-md rounded-lg bg-background'>
      <ThemeChangeButton />
      <LoginButton />
    </div>
  );
}
