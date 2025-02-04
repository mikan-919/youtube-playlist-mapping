'use client';
import type { Session } from 'next-auth';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

const fetcher = ([input, init]: [
  input: RequestInfo | URL,
  init?: RequestInit,
]) => fetch(input, init).then((res) => res.json());

type Props = { session: Session };

export default function FetchTest({ session, apikey }: Props) {
  return (
    <div className='bg-muted rounded p-2 overflow-auto'>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
