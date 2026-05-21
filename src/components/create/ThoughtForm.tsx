'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUIStore } from '@/stores/uiStore';
import { MAX_THOUGHT_LENGTH } from '@/types';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import type { SupportedLanguage } from '@/types';

interface ThoughtFormProps {
  onSuccess: () => void;
}

const supabase = createClient();

export function ThoughtForm({ onSuccess }: ThoughtFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedLanguage, setSelectedLanguage } = useUIStore();
  const { anonymousId } = useUIStore();

  const charCount = content.length;
  const isOverLimit = charCount > MAX_THOUGHT_LENGTH;
  const isEmpty = content.trim().length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isOverLimit || isEmpty) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const thoughtData = {
        content: content.trim(),
        language: selectedLanguage,
      };
      
      if (anonymousId) {
        (thoughtData as Record<string, unknown>).user_id = anonymousId;
      }

      const { error: insertError } = await supabase.from('thoughts').insert(thoughtData);

      if (insertError) throw insertError;

      setContent('');
      onSuccess();
    } catch (err) {
      console.error('Error creating thought:', err);
      setError('Failed to share thought. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your thought here..."
          className={`w-full h-32 p-3 resize-none bg-white border rounded-textarea text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isOverLimit ? 'border-red-400 focus:ring-red-400' : 'border-border focus:ring-text-primary'
          }`}
          maxLength={MAX_THOUGHT_LENGTH + 50}
          autoFocus
        />
        
        <div className="flex items-center justify-between mt-2">
          <Dropdown value={selectedLanguage} onChange={setSelectedLanguage} />
          
          <span
            className={`text-xs tabular-nums ${
              isOverLimit ? 'text-red-500 font-medium' : 'text-text-muted'
            }`}
          >
            {charCount}/{MAX_THOUGHT_LENGTH}
          </span>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isOverLimit || isEmpty || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sharing...' : 'Share it'}
      </Button>
    </form>
  );
}