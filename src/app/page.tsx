import Header from '@/components/Header';

export default async function Home() {
  return (
    <div className='items-center justify-items-center h-[calc(100dvh-2rem)] m-4 p-4 shadow-md rounded-lg bg-background'>
      <Header />
    </div>
  );
}
