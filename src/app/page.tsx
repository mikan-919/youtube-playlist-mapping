'use client';
import ThemeChangeButton from '@/components/ThemeChangeButton';

export default function Home() {
  return (
    <div className='items-center justify-items-center h-[calc(100dvh-2rem)] m-4 p-4 shadow-md rounded-lg bg-background'>
      <ThemeChangeButton />
    </div>
  );
}
