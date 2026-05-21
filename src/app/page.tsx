'use client';

import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { CreateModal } from '@/components/create/CreateModal';

// Dynamically import MasonryFeed to avoid SSR issues with infinite scroll
const MasonryFeed = dynamic(
  () => import('@/components/feed/MasonryFeed').then((mod) => mod.MasonryFeed),
  {
    ssr: false,
    loading: () => (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="break-inside-avoid">
            <div className="bg-bg-card rounded-card p-4 shadow-card h-40 animate-pulse" />
          </div>
        ))}
      </div>
    ),
  }
);

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="pt-14 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <MasonryFeed />
        </div>
      </main>

      <CreateModal />
    </>
  );
}