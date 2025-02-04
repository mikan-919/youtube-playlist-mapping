'use client';
import { useContext, createContext } from 'react';
import type { Session } from 'next-auth';

const SessionContext = createContext<Session | undefined>(undefined);

interface SessionProvidreProps {
  session: Session;
  children: ReactNode;
}

export default function SessionProvider({
  session,
  children,
}: SessionProvidreProps) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = (): Session => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within an SessionProvider');
  }
  return context;
};

export type { LoadProgress };
