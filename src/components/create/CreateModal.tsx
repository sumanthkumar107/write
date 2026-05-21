'use client';

import { useState, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ThoughtForm } from './ThoughtForm';
import { useUIStore } from '@/stores/uiStore';

export function CreateModal() {
  const { isCreateModalOpen, closeCreateModal } = useUIStore();

  return (
    <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Share a Thought
        </h2>
        <ThoughtForm onSuccess={closeCreateModal} />
      </div>
    </Modal>
  );
}