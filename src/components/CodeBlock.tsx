import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Clipboard } from 'lucide-react';
interface CodeBlockProps {
  value: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ value, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('クリップボードへのコピーに失敗しました', error);
    }
  };

  return (
    <div
      className={cn(
        'relative flex flex-row justify-between items-center rounded-md bg-muted my-2',
        className,
      )}
    >
      <pre className='overflow-x-auto p-2 px-4'>
        <code className='text-sm font-mono text-foreground textwrap'>
          {value}
        </code>
      </pre>
      <div className='px-1'>
        <Button variant='ghost' size='icon' onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Clipboard size={16} />}
        </Button>
      </div>
    </div>
  );
};
