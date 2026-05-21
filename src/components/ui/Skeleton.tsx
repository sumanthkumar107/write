import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded',
        className
      )}
    />
  );
}

export function ThoughtSkeleton() {
  return (
    <div className="bg-bg-card rounded-card p-4 shadow-card">
      <Skeleton className="h-4 mb-2 w-3/4" />
      <Skeleton className="h-4 mb-2 w-1/2" />
      <Skeleton className="h-4 mb-4 w-2/3" />
      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border/50">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-4 w-16 ml-auto" />
      </div>
    </div>
  );
}