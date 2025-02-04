import ThemeChangeButton from '@/components/ThemeChangeButton';
import UserButton from '@/components/UserButton';

export default function Header() {
  return (
    <div className='fixed w-[calc(100dvw-2rem)] rounded backdrop-blur-lg bg-transparent z-100 p-4 flex justify-between'>
      <ThemeChangeButton />
      <UserButton />
    </div>
  );
}
