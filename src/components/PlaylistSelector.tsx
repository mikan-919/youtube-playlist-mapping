'use client';
import { Combobox } from '@/components/ui/combobox';
import useSWR from 'swr';
import { useSession } from '@/components/providers/SessionProvider';

const fetcher = ([input, init]: [
  input: RequestInfo | URL,
  init?: RequestInit,
]) => {
  console.log('Request', input, init);
  return fetch(input, init).then((res) => res.json());
};
type Props = {
  apikey: string;
  current: { value: string; label: string };
  setCurrent: (update: { value: string; label: string }) => void;
};

export default function PlaylistSelector({
  apikey,
  current,
  setCurrent,
}: Props) {
  const { accessToken } = useSession();
  const { data, error, isLoading } = useSWR(
    [
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=${apikey}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      },
    ],
    fetcher,
  );

  const choices = !isLoading
    ? data.items.map((e) => ({
        value: e.id,
        label: e.snippet.title,
      }))
    : [];

  return (
    <Combobox
      current={current}
      setCurrent={setCurrent}
      choices={choices}
      disabled={isLoading}
      selectText='Select Playlist'
    />
  );
}
