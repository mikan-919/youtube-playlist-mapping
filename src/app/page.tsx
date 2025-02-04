export default async function Home() {
  return (
    <main className='flex flex-col space-y-4 items-center justify-center h-full'>
      <h1 className='font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl p-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-animation'>
        Youtube Playlist Mapping Tool
      </h1>
      <p className='text-base text-muted-foreground'>
        Log in with your Google account to get started.
      </p>
    </main>
  );
}
