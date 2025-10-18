import { create, type StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthCardHeader {
  title?: string;
  description?: string;
}

interface AuthActions {
  setAuthCardHeader: (header: AuthCardHeader) => void;
  resetAuthCardHeader: () => void;
}

interface AuthState {
  authCardHeader: AuthCardHeader;
  actions: AuthActions;
}

const createAuthSlice: StateCreator<
  AuthState,
  [['zustand/immer', never]]
> = (set) => ({
  authCardHeader: {},
  actions: {
    setAuthCardHeader: (header) =>
      set((state) => {
        state.authCardHeader = header;
      }),
    resetAuthCardHeader: () =>
      set((state) => {
        state.authCardHeader = {};
      }),
  },
});

const useAuthStore = create<AuthState>()(persist(
  immer(createAuthSlice),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      authCardHeader: state.authCardHeader,
    }),
  }
));

export const useAuthCardHeader = () => useAuthStore((state) => state.authCardHeader);

export const useAuthActions = () => useAuthStore((state) => state.actions);
