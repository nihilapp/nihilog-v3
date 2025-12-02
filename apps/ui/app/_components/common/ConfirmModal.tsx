'use client';

import { MdError, MdInfo, MdWarning } from 'react-icons/md';

import { Button } from '@/_components/ui/button';
import { Modal } from '@/_components/ui/modal';
import { useAlertActions, useConfirmState } from '@/_stores/alert.store';

export function ConfirmModal() {
  const confirm = useConfirmState();
  const { closeConfirm, } = useAlertActions();

  const onCancelClick = () => {
    closeConfirm();
  };

  const onOkClick = () => {
    if (confirm.onConfirm) {
      confirm.onConfirm();
    }
    closeConfirm();
  };

  const getTitle = () => {
    switch (confirm.type) {
      case 'info':
        return '확인';
      case 'error':
        return '확인';
      case 'warn':
        return '확인';
      default:
        return '확인';
    }
  };

  const getIcon = () => {
    switch (confirm.type) {
      case 'info':
        return <MdInfo className='size-5 text-blue-600' />;
      case 'error':
        return <MdError className='size-5 text-red-600' />;
      case 'warn':
        return <MdWarning className='size-5 text-orange-600' />;
      default:
        return null;
    }
  };

  const getOkButtonColor = () => {
    switch (confirm.type) {
      case 'info':
        return 'button-normal-blue-600 hover:button-normal-blue-700';
      case 'error':
        return 'button-normal-red-600 hover:button-normal-red-700';
      case 'warn':
        return 'button-normal-orange-600 hover:button-normal-orange-700';
      default:
        return 'button-normal-black-600 hover:button-normal-black-900';
    }
  };

  return (
    <Modal.Container
      open={confirm.open}
      onClose={onCancelClick}
      width={400}
    >
      <Modal.Top
        title={getTitle()}
        icon={getIcon()}
        onClose={onCancelClick}
      />
      <Modal.Content>
        <div className='flex flex-col items-center gap-4 py-4'>
          <p className='text-md text-center'>{confirm.message}</p>
        </div>
      </Modal.Content>
      <Modal.Bottom>
        <Button.Action
          label='취소'
          onClick={onCancelClick}
          display='inline'
          className='button-outline-red-600 hover:button-normal-red-600'
        />
        <Button.Action
          label='확인'
          onClick={onOkClick}
          display='inline'
          className={getOkButtonColor()}
        />
      </Modal.Bottom>
    </Modal.Container>
  );
}
