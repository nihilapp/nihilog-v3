import type { ConfirmType } from '@/_stores/alert.store';
import { useAlertActions } from '@/_stores/alert.store';

export function useAlert() {
  const { triggerInfo, triggerError, triggerConfirm, triggerWarn, } = useAlertActions();

  return {
    triggerInfo,
    triggerError,
    triggerWarn,
    triggerConfirm: (
      message: string,
      onConfirm: () => void,
      type?: ConfirmType
    ) => {
      triggerConfirm(
        message,
        onConfirm,
        type
      );
    },
  };
}
