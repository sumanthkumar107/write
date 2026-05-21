'use client';

import { APP_NAME } from '@/lib/utils/constants';
import { Plus } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const { openCreateModal } = useUIStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-sm border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold text-text-primary tracking-tight">
          {APP_NAME}
        </h1>

        {/* Create button */}
        <Button
          onClick={openCreateModal}
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Share thought</span>
        </Button>
      </nav>
    </header>
  );
}