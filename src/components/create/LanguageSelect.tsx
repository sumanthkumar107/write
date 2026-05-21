'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { SupportedLanguage } from '@/types';
import { SUPPORTED_LANGUAGES } from '@/types';

interface LanguageSelectProps {
  value: SupportedLanguage;
  onChange: (value: SupportedLanguage) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selected = SUPPORTED_LANGUAGES.find((l) => l.code === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-button',
          'text-sm font-medium transition-colors',
          'hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2'
        )}
      >
        <span>{selected?.code || 'EN'}</span>
        <ChevronDown className={cn('w-4 h-4 text-text-muted', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-1 w-40 bg-white border border-border rounded-button shadow-card py-1">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => {
                  onChange(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm hover:bg-bg-hover',
                  lang.code === value && 'bg-bg-hover font-medium'
                )}
              >
                <span>{lang.code}</span>
                <span className="ml-2 text-text-muted">{lang.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}