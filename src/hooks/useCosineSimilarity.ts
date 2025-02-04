import { useMemo } from 'react';

export default function useCosineSimilarity(
  vectorA: number[],
  vectorB: number[],
) {
  const cosineSimilarity = useMemo(() => {
    if (vectorA.length !== vectorB.length) {
      return 0;
    }
    const dot = vectorA.reduce(
      (sum, value, index) => sum + value * vectorB[index],
      0,
    );
    const normA = Math.sqrt(
      vectorA.reduce((sum, value) => sum + value * value, 0),
    );
    const normB = Math.sqrt(
      vectorB.reduce((sum, value) => sum + value * value, 0),
    );
    if (normA === 0 || normB === 0) {
      return 0;
    }
    return dot / (normA * normB);
  }, [vectorA, vectorB]);
  return cosineSimilarity;
}
