'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createTagSchema, type CreateTagType } from '@nihilog/schemas';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/_components/ui/button';
import { Form } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { Modal } from '@/_components/ui/modal';
import { useAdminCreateTag } from '@/_hooks/admin/tags';
import { useAlert } from '@/_hooks/common/use-alert';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function NewTagForm({ open, onClose, onSuccess, }: Props) {
  const form = useForm<CreateTagType>({
    mode: 'all',
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      tagNm: '',
      tagExpln: undefined,
      tagColr: undefined,
      useYn: 'Y',
      delYn: 'N',
    },
  });

  const createTag = useAdminCreateTag();
  const { triggerConfirm, } = useAlert();

  const onSubmitForm: SubmitHandler<CreateTagType> = (data) => {
    triggerConfirm(
      '태그를 추가하시겠습니까?',
      () => {
        createTag.mutate(
          data,
          {
            onSuccess() {
              form.reset();
              onClose();
              onSuccess?.();
            },
          }
        );
      }
    );
  };

  return (
    <Modal.Container
      open={open}
      onClose={onClose}
      width={800}
    >
      <Modal.Top title='태그 추가' onClose={onClose} />
      <Modal.Content>
        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
          id='new-tag-form'
        >
          <Form.Field>
            <Form.Item<CreateTagType>
              name='tagNm'
              label='태그명'
              direction='horizontal'
              render={({ field, }) => (
                <Input.Text
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateTagType>
              name='tagExpln'
              label='태그 설명'
              direction='horizontal'
              render={({ field, }) => (
                <Input.LongText
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateTagType>
              name='tagColr'
              label='태그 색상'
              direction='horizontal'
              render={({ field, }) => (
                <Input.ColorPaletteSelect
                  value={typeof field.value === 'string'
                    ? field.value
                    : undefined}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </Form.Field>
        </Form.Container>
      </Modal.Content>
      <Modal.Bottom>
        <Button.Action
          label='태그 추가'
          className='hover:button-normal-black-900'
          type='submit'
          form='new-tag-form'
        />
        <Button.Action
          label='취소'
          className='button-normal-red-500 hover:button-normal-red-600'
          onClick={onClose}
        />
      </Modal.Bottom>
    </Modal.Container>
  );
}
