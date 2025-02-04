'use client';
import {
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  type ReactNode,
} from 'react';
import calculateSHA256 from '@/lib/hash';

interface LoadProgress {
  file: string;
  progress: number;
}
interface EmbeddingContextProps {
  request: (str: string) => Promise<number[]>;
  loadProgress: LoadProgress[];
}

const EmbeddingContext = createContext<EmbeddingContextProps | undefined>(
  undefined,
);

interface EmbeddingProviderProps {
  children: ReactNode;
}

export const EmbeddingProvider: React.FC<EmbeddingProviderProps> = ({
  children,
}) => {
  const [ready, setReady] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<LoadProgress[]>([]);
  const worker = useRef<Worker>(null);
  const pendingRequests = useRef<Map<string, ((result: number[]) => void)[]>>(
    new Map(),
  );
  const cache = useRef<Map<string, number[]>>(new Map());

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL('@/embeddingWorker.ts', import.meta.url),
      );
    }

    const onMessageReceived = (
      e: MessageEvent<
        | { status: 'download'; file: string }
        | { status: 'progress'; file: string; progress: number }
        | { status: 'done'; file: string }
        | { status: 'complete'; id: string; output: number[] }
        | { status: 'initiate' }
        | { status: 'ready' }
      >,
    ) => {
      const data = e.data;
      console.log('stat', data.status);
      if (data.status === 'download') {
        console.log(data);
        setLoadProgress((prev) => [...prev, { file: data.file, progress: 0 }]);
      } else if (data.status === 'progress') {
        if (data.progress === 100) {
          // setLoadProgress((prev) =>
          // prev.filter((item) => item.file !== data.file),
          // );
        } else {
          setLoadProgress((prev) =>
            prev.map((item) =>
              item.file === data.file
                ? { ...item, progress: data.progress }
                : item,
            ),
          );
        }
      } else if (data.status === 'done') {
        console.log(data.file);
        setLoadProgress((prev) =>
          prev.map((item) =>
            item.file === data.file ? { ...item, progress: 100 } : item,
          ),
        );
      } else if (data.status === 'complete') {
        const hash = data.hash;
        cache.current.set(hash, data.output);
        const resolvers = pendingRequests.current?.get(hash);
        if (resolvers) {
          for (const resolve of resolvers) {
            console.log(resolve);
            resolve(data.output);
          }
          pendingRequests.current.delete(hash);
        }
      } else if (data.status === 'initiate') {
        setReady(false);
      } else if (data.status === 'ready') {
        setReady(true);
      }
    };
    worker.current.addEventListener('message', onMessageReceived);

    return () =>
      worker.current?.removeEventListener('message', onMessageReceived);
  });
  const request = useCallback(async (text: string): Promise<number[]> => {
    const hash = await calculateSHA256(text);
    if (cache.current.has(hash)) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return Promise.resolve(cache.current.get(hash)!);
    }
    return new Promise((resolve) => {
      if (pendingRequests.current.has(hash)) {
        pendingRequests.current.get(hash)?.push(resolve);
      } else {
        pendingRequests.current.set(hash, [resolve]);
        worker.current?.postMessage({ id: hash, text });
      }
    });
  }, []);
  const value = {
    request,
    loadProgress,
  };

  return (
    <EmbeddingContext.Provider value={value}>
      {children}
    </EmbeddingContext.Provider>
  );
};

export const useEmbedding = (): EmbeddingContextProps => {
  const context = useContext(EmbeddingContext);
  if (context === undefined) {
    throw new Error('useEmbedding must be used within an EmbeddingProvider');
  }
  return context;
};

export type { LoadProgress };
