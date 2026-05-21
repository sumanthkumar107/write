'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { SupportedLanguage } from '@/types';
import { SUPPORTED_LANGUAGES } from '@/types';

interface DropdownProps {
  value: SupportedLanguage;
  onChange: (value: SupportedLanguage) => void;
  className?: string;
}

export function Dropdown({ value, onChange, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = SUPPORTED_LANGUAGES.find((l) => l.code === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-button',
          'text-sm text-text-primary font-medium',
          'hover:bg-bg-hover transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedLang?.code || 'EN'}</span>
        <ChevronDown className={cn('w-4 h-4 text-text-muted transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={cn(
            'absolute z-20 mt-1 w-full max-h-60 overflow-auto',
            'bg-white border border-border rounded-button shadow-card',
            'py-1'
          )}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang.code === value}
                onClick={() => {
                  onChange(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm',
                  'hover:bg-bg-hover transition-colors',
                  lang.code === value ? 'bg-bg-hover font-medium' : ''
                )}
              >
                <span className="font-medium">{lang.code}</span>
                <span className="ml-2 text-text-muted">{lang.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}