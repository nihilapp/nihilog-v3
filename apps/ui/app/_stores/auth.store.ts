import type { SelectUserInfoType } from '@nihilog/schemas';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthAction {
  setSession: (session: SelectUserInfoType) => void;
  clearSession: () => void;
}

interface AuthState {
  session: SelectUserInfoType | null;

  actions: AuthAction;
}

const authStore = create<AuthState>()(devtools(
  immer((set) => ({
    session: null,
    actions: {
      setSession: (session: SelectUserInfoType) => set((state) => {
        state.session = session;
      }),
      clearSession: () => set((state) => {
        state.session = null;
      }),
    },
  })),
  {
    name: 'auth-store',
  }
));

export const useSession = () => authStore((state) => state.session);
export const useAuthActions = () => authStore((state) => state.actions);
