'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteThoughts } from '@/lib/hooks/useThoughts';
import { ThoughtCard } from './ThoughtCard';
import { ThoughtSkeleton } from './ThoughtSkeleton';

export function MasonryFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteThoughts();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allThoughts = data?.pages.flat() || [];

  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="break-inside-avoid">
            <ThoughtSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (allThoughts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">No thoughts yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {allThoughts.map((thought) => (
          <div key={thought.id} className="break-inside-avoid">
            <ThoughtCard thought={thought} />
          </div>
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex gap-1">
            <ThoughtSkeleton />
          </div>
        )}
        {!hasNextPage && allThoughts.length > 0 && (
          <p className="text-sm text-text-muted">You've reached the end</p>
        )}
      </div>
    </>
  );
}