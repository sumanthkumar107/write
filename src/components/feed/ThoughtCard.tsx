'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { formatTime } from '@/lib/utils/formatTime';
import type { Thought, SupportedLanguage } from '@/types';
import { useLike } from '@/lib/hooks/useThoughts';
import { getOrCreateAnonymousId } from '@/stores/uiStore';

interface ThoughtCardProps {
  thought: Thought;
}

export function ThoughtCard({ thought }: ThoughtCardProps) {
  const { mutate: toggleLike } = useLike();
  const userId = getOrCreateAnonymousId();

  const handleLike = () => {
    toggleLike({ thoughtId: thought.id, userId });
  };

  return (
    <article className="group bg-bg-card rounded-card p-4 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col">
      {/* Thought content */}
      <p className="text-base text-text-primary leading-relaxed whitespace-pre-wrap">
        {thought.content}
      </p>

      {/* Meta info */}
      <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/50">
        {/* Language tag */}
        <span className="tag text-xs font-medium text-text-accent bg-yellow-100/50 px-2 py-0.5 rounded-tag">
          {thought.language}
        </span>

        {/* Like button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={cn(
              'flex items-center gap-1.5 p-1 rounded-button transition-colors',
              'hover:bg-bg-hover',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              thought.has_liked ? 'text-red-500' : 'text-text-muted hover:text-red-500'
            )}
            aria-label={thought.has_liked ? 'Unlike thought' : 'Like thought'}
            aria-pressed={thought.has_liked}
          >
            <Heart
              className={cn('w-4 h-4', thought.has_liked && 'fill-current')}
            />
            <span className="text-sm font-medium tabular-nums">
              {thought.likes_count}
            </span>
          </button>
        </div>
      </div>

      {/* Timestamp */}
      <time
        className="text-xs text-text-muted mt-2 block"
        dateTime={thought.created_at}
      >
        {formatTime(thought.created_at)}
      </time>
    </article>
  );
}