'use client';
import { useEmbedding } from '@/components/providers/EmbeddingProvider';
import { useState } from 'react';
import { SearchField } from '@/components/SearchField';
import { CodeBlock } from '@/components/CodeBlock';
import useCosineSimilarity from '@/hooks/useCosineSimilarity';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'motion/react';

export default function EmbeddingTest() {
  const { request, loadProgress } = useEmbedding();
  const [vec1, setVec1] = useState<number[]>([]);
  const [vec2, setVec2] = useState<number[]>([]);
  const sim = useCosineSimilarity(vec1, vec2);
  const handleClick1 = async (value: string) => {
    const vec = await request(value);
    setVec1(vec);
    console.log(`END: ${value}, ${vec.length}`);
  };
  const handleClick2 = async (value: string) => {
    const vec = await request(value);
    setVec2(vec);
    console.log(`END: ${value}, ${vec.length}`);
  };
  return (
    <div className='space-y-2'>
      <SearchField onSearch={handleClick1} />
      <SearchField onSearch={handleClick2} />
      <motion.div layout transition={{ duration: 1 }} className='space-y-1'>
        {loadProgress.map((e) => {
          console.log(e);
          return (
            <motion.div
              key={e.file}
              className='flex justify-center items-center space-x-2'
              exit={{ y: '25%', opacity: 0 }}
              initial={{ y: '-25%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 5, ease: 'linear' }}
              // transition={{ duration: 0.25 }}
            >
              <span className='text-xs'>{e.file}</span>
              <Progress value={e.progress} />
            </motion.div>
          );
        })}
      </motion.div>
      {/* <span>EmbeddingTest: {result}</span> */}
      <CodeBlock value={sim.toString()} />
    </div>
  );
}
