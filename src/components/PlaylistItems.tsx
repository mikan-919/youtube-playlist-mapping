'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PlaylistSelector from '@/components/PlaylistSelector';

const fetcher = ([input, init]: [
  input: RequestInfo | URL,
  init?: RequestInit,
]) => {
  console.log('Request', input, init);
  return fetch(input, init).then((res) => res.json());
};

export default function PlaylistItems() {
  const [current, setCurrent] = useState();
  const handleClick = () => {
    console.log(current);
  };
  return (
    <div>
      <div className='flex flex-row space-x-2'>
        <PlaylistSelector
          current={current}
          setCurrent={setCurrent}
          apikey={process.env.NEXT_GOOGLE_API_KEY}
        />
        <Button onClick={handleClick} className='flex-shrink-0'>
          Load
        </Button>
      </div>
    </div>
  );
}
