'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { updateTagSchema, type UpdateTagType } from '@nihilog/schemas';
import type { SelectTagInfoListItemType } from '@nihilog/schemas';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/_components/ui/button';
import { Form } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { Modal } from '@/_components/ui/modal';
import { useAdminUpdateTag } from '@/_hooks/admin/tags';
import { useAlert } from '@/_hooks/common/use-alert';

type UpdateTagFormType = Pick<UpdateTagType, 'tagNm' | 'tagExpln' | 'tagColr' | 'useYn' | 'delYn'>;

interface Props {
  open: boolean;
  onClose: () => void;
  tag: SelectTagInfoListItemType;
}

export function UpdateTagForm({ open, onClose, tag, }: Props) {
  const form = useForm<UpdateTagFormType>({
    mode: 'all',
    resolver: zodResolver(updateTagSchema.pick({
      tagNm: true,
      tagExpln: true,
      tagColr: true,
      useYn: true,
      delYn: true,
    })),
    defaultValues: {
      tagNm: tag.tagNm,
      tagExpln: tag.tagExpln ?? undefined,
      tagColr: tag.tagColr ?? undefined,
      useYn: tag.useYn,
      delYn: tag.delYn,
    },
  });

  const updateTag = useAdminUpdateTag(tag.tagNo);
  const { triggerConfirm, } = useAlert();

  const onSubmitForm: SubmitHandler<UpdateTagFormType> = (data) => {
    triggerConfirm(
      '태그를 수정하시겠습니까?',
      () => {
        updateTag.mutate(
          data,
          {
            onSuccess() {
              form.reset();
              onClose();
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
      <Modal.Top title='태그 수정' onClose={onClose} />
      <Modal.Content>
        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
          id='update-tag-form'
        >
          <Form.Field>
            <Form.Item<UpdateTagFormType>
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
            <Form.Item<UpdateTagFormType>
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
            <Form.Item<UpdateTagFormType>
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

          <Form.Field>
            <Form.Item<UpdateTagFormType>
              name='useYn'
              label='사용 여부'
              direction='horizontal'
              render={({ field, }) => (
                <Input.Text
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<UpdateTagFormType>
              name='delYn'
              label='삭제 여부'
              direction='horizontal'
              render={({ field, }) => (
                <Input.Text
                  {...field}
                />
              )}
            />
          </Form.Field>
        </Form.Container>
      </Modal.Content>
      <Modal.Bottom>
        <Button.Action
          label='태그 수정'
          className='hover:button-normal-black-900'
          type='submit'
          form='update-tag-form'
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
