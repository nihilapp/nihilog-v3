import { create, type StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CommonActions {
  toggleDarkMode: () => void;
}

interface CommonState {
  darkMode: boolean;
  actions: CommonActions;
}

const createCommonSlice: StateCreator<
  CommonState,
  [['zustand/immer', never]]
> = (set) => ({
  darkMode: false,
  actions: {
    toggleDarkMode: () =>
      set((state) => {
        state.darkMode = !state.darkMode;
      }),
  },
});

const useCommonStore = create<CommonState>()(persist(
  immer(createCommonSlice),
  {
    name: 'common-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ darkMode: state.darkMode, }),
  }
));

export const useDarkMode = () => useCommonStore((state) => state.darkMode);

export const useCommonActions = () => useCommonStore((state) => state.actions);
