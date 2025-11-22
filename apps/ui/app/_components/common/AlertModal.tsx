'use client';

import { MdError, MdInfo, MdWarning } from 'react-icons/md';

import { Button } from '@/_components/ui/button';
import { Modal } from '@/_components/ui/modal';
import { useAlertActions, useAlertState } from '@/_stores/alert.store';

export function AlertModal() {
  const alert = useAlertState();
  const { closeAlert, } = useAlertActions();

  const onCloseClick = () => {
    closeAlert();
  };

  const getTitle = () => {
    switch (alert.type) {
      case 'info':
        return '알림';
      case 'error':
        return '오류';
      case 'warn':
        return '경고';
      default:
        return '알림';
    }
  };

  const getIcon = () => {
    switch (alert.type) {
      case 'info':
        return <MdInfo className='size-6 text-blue-600' />;
      case 'error':
        return <MdError className='size-6 text-red-600' />;
      case 'warn':
        return <MdWarning className='size-6 text-orange-600' />;
      default:
        return <MdInfo className='size-6 text-blue-600' />;
    }
  };

  const getButtonColor = () => {
    switch (alert.type) {
      case 'info':
        return 'button-normal-blue-600 hover:button-normal-blue-700';
      case 'error':
        return 'button-normal-red-600 hover:button-normal-red-700';
      case 'warn':
        return 'button-normal-orange-600 hover:button-normal-orange-700';
      default:
        return 'button-normal-blue-600 hover:button-normal-blue-700';
    }
  };

  return (
    <Modal.Container
      open={alert.open}
      onClose={onCloseClick}
      width={400}
    >
      <Modal.Top
        title={getTitle()}
        icon={getIcon()}
        onClose={onCloseClick}
      />
      <Modal.Content>
        <div className='flex flex-col items-center gap-4 py-4'>
          <p className='text-md text-center'>{alert.message}</p>
        </div>
      </Modal.Content>
      <Modal.Bottom>
        <Button.Action
          label='확인'
          onClick={onCloseClick}
          display='block'
          className={getButtonColor()}
        />
      </Modal.Bottom>
    </Modal.Container>
  );
}
