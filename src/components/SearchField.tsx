import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  type HTMLAttributes,
  type KeyboardEvent,
  type FC,
  useState,
} from 'react';

interface SearchFieldProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const SearchField: FC<SearchFieldProps> = ({
  placeholder = 'Search...',
  onSearch,
  className,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className={`flex items-center space-x-2 ${className ?? ''}`}
      {...props}
    >
      <Input
        type='text'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className='w-full'
      />
      <Button
        onClick={handleSearch}
        // variant='secondary'
        size='icon'
        className='flex-shrink-0'
      >
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};
