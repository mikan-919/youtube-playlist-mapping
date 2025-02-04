import FetchTest from '@/components/FetchTest';
import EmbeddingTest from '@/components/EmbeddingTest';
import { auth } from '@/lib/auth';
import { EmbeddingProvider } from '@/components/providers/EmbeddingProvider';
import { unauthorized } from 'next/navigation';
import SessionProvider from '@/components/providers/SessionProvider';
import PlaylistItems from '@/components/PlaylistItems';

export default async function page() {
  const session = await auth();
  if (!session) unauthorized();
  if (!session.accessToken) unauthorized();
  return (
    <SessionProvider session={session}>
      <div className='m-auto min-w-48 space-y-2'>
        <PlaylistItems />
      </div>
    </SessionProvider>
  );
}
