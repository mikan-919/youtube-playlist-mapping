'use client';

import { useRef, useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ComboboxProps {
  choices: { value: string; label: string }[];
  selectText?: string;
  searchText?: string;
  notFoundText?: string;
  disabled?: boolean;
  current: { value: string; label: string };
  setCurrent: (update: { value: string; label: string }) => void;
}
export function Combobox({
  choices,
  selectText,
  searchText,
  notFoundText,
  disabled,
  current,
  setCurrent,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const button = useRef(null);
  const [width, setWidth] = useState<number>(null);

  useEffect(() => {
    if (button.current) setWidth(button.current.getBoundingClientRect().width);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={button}
          variant='outline'
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role='combobox'
          aria-expanded={open}
          disabled={disabled ?? false}
          className='w-full justify-between'
        >
          {current ? current.label : (selectText ?? 'Select')}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='min-w-full p-0'
        style={{ width: `${width}px` }}
      >
        <Command>
          <CommandInput placeholder={searchText ?? ''} className='h-9' />
          <CommandList>
            <CommandEmpty>{notFoundText ?? 'Not found.'}</CommandEmpty>
            <CommandGroup>
              {choices.map((choice) => (
                <CommandItem
                  key={choice.value}
                  value={choice.value}
                  onSelect={(currentValue) => {
                    const updatedValue =
                      currentValue === value ? '' : currentValue;
                    setValue(updatedValue);
                    setCurrent(
                      choices.find((choices) => choices.value === updatedValue),
                    );
                    setOpen(false);
                  }}
                >
                  {choice.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === choice.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
