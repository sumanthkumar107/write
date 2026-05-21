import { Skeleton } from '@/components/ui/Skeleton';

export function ThoughtSkeleton() {
  return (
    <div className="bg-bg-card rounded-card p-4 shadow-card flex flex-col h-full">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/6 mb-4" />
      <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/50">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-14" />
      </div>
    </div>
  );
}