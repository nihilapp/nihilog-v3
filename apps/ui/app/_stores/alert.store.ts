import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type AlertType = 'info' | 'error' | 'warn';
type ConfirmType = 'info' | 'error' | 'warn' | 'default';

interface AlertState {
  message: string;
  type: AlertType;
  open: boolean;
}

interface ConfirmState {
  message: string;
  type: ConfirmType;
  open: boolean;
  onConfirm: (() => void) | null;
}

interface AlertStoreState {
  alert: AlertState;
  confirm: ConfirmState;
  actions: {
    triggerInfo: (message: string) => void;
    triggerError: (message: string) => void;
    triggerWarn: (message: string) => void;
    triggerConfirm: (message: string, onConfirm: () => void, type?: ConfirmType) => void;
    closeAlert: () => void;
    closeConfirm: () => void;
  };
}

const alertStore = create<AlertStoreState>()(devtools(
  immer((set) => ({
    alert: {
      message: '',
      type: 'info',
      open: false,
    },
    confirm: {
      message: '',
      type: 'default',
      open: false,
      onConfirm: null,
    },
    actions: {
      triggerInfo: (message: string) => set((state) => {
        state.alert = {
          message,
          type: 'info',
          open: true,
        };
      }),
      triggerError: (message: string) => set((state) => {
        state.alert = {
          message,
          type: 'error',
          open: true,
        };
      }),
      triggerWarn: (message: string) => set((state) => {
        state.alert = {
          message,
          type: 'warn',
          open: true,
        };
      }),
      triggerConfirm: (message: string, onConfirm: () => void, type?: ConfirmType) => set((state) => {
        state.confirm = {
          message,
          type: type || 'default',
          open: true,
          onConfirm,
        };
      }),
      closeAlert: () => set((state) => {
        state.alert.open = false;
      }),
      closeConfirm: () => set((state) => {
        state.confirm.open = false;
        state.confirm.onConfirm = null;
        state.confirm.type = 'default';
      }),
    },
  })),
  {
    name: 'alert-store',
  }
));

export const useAlertState = () => alertStore((state) => state.alert);
export const useConfirmState = () => alertStore((state) => state.confirm);
export const useAlertActions = () => alertStore((state) => state.actions);

export type { ConfirmType };
