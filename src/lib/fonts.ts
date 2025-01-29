import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';

// フォント定義
const notoSansJP = Noto_Sans_JP({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-Noto_Sans_JP',
});
const notoSerifJP = Noto_Serif_JP({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-Noto_Serif_JP',
});

export const variables = [notoSansJP, notoSerifJP]
  .map((e) => e.variable)
  .join(' ');
