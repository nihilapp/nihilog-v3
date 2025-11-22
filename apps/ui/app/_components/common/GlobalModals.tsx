'use client';

import { AlertModal } from '@/_components/common/AlertModal';
import { ConfirmModal } from '@/_components/common/ConfirmModal';

export function GlobalModals() {
  return (
    <>
      <AlertModal />
      <ConfirmModal />
    </>
  );
}
