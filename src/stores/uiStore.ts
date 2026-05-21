import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SupportedLanguage } from '@/types';

interface UIState {
  // Modal state
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  
  // Selected language
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  
  // Anonymous user
  anonymousId: string | null;
  setAnonymousId: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Modal state
      isCreateModalOpen: false,
      openCreateModal: () => set({ isCreateModalOpen: true }),
      closeCreateModal: () => set({ isCreateModalOpen: false }),
      
      // Selected language
      selectedLanguage: 'EN',
      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
      
      // Anonymous user
      anonymousId: null,
      setAnonymousId: (id) => set({ anonymousId: id }),
    }),
    {
      name: 'thoughts-ui-storage',
      partialize: (state) => ({
        selectedLanguage: state.selectedLanguage,
        anonymousId: state.anonymousId,
      }),
    }
  )
);

// Generate or retrieve anonymous ID
export function getOrCreateAnonymousId(): string {
  const stored = useUIStore.getState().anonymousId;
  if (stored) return stored;
  
  const newId = crypto.randomUUID();
  useUIStore.getState().setAnonymousId(newId);
  return newId;
}