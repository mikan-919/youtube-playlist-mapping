import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { variables } from '@/lib/fonts';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Youtube Playlist Mapping',
  description: 'No description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body
        className={`${variables} body font-Sans h-screen p-0 m-0 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-animation `}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='h-[calc(100dvh-2rem)] overflow-hidden overflow-y-auto no-scrollbar m-4 shadow-md rounded-lg bg-background'>
            <Header />
            <div className='min-h-full p-4 flex justify-center items-center'>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
