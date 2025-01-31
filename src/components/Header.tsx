import ThemeChangeButton from '@/components/ThemeChangeButton';
import UserButton from '@/components/UserButton';

export default function Header() {
  return (
    <div className='w-full flex justify-between'>
      <ThemeChangeButton />
      <UserButton />
    </div>
  );
}
