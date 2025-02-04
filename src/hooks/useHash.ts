import { useState, useEffect } from 'react';

export const useHash = (text: string) => {
  const [hash, setHash] = useState<string>('');

  useEffect(() => {
    const computeHash = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setHash(hashHex);
    };

    if (text) {
      computeHash();
    } else {
      setHash('');
    }
  }, [text]);

  return hash;
};
