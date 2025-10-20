import { create } from 'zustand';

interface AdminPostActions {
  increaseModCount: () => void;
  resetModCount: () => void;
}

interface AdminPostState {
  modCount: number;
  actions: AdminPostActions;
}

const adminPostStore = create<AdminPostState>((set) => ({
  modCount: 0,
  actions: {
    increaseModCount: () => set((state) => ({ modCount: state.modCount + 1, })),
    resetModCount: () => set({ modCount: 0, }),
  },
}));

export const useModCount = () => adminPostStore((state) => state.modCount);

export const useAdminPostStoreActions = () => adminPostStore((state) => state.actions);
