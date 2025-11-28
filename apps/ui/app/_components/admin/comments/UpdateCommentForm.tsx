'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { updateCommentSchema, type UpdateCommentType } from '@nihilog/schemas';
import type { SelectCommentListItemType } from '@nihilog/schemas';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/_components/ui/button';
import { Form } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { Modal } from '@/_components/ui/modal';
import { useUpdateComment } from '@/_hooks/comments';
import { useAlert } from '@/_hooks/common/use-alert';

type UpdateCommentFormType = Pick<UpdateCommentType, 'cmntCntnt' | 'cmntSts'>;

interface Props {
  open: boolean;
  onClose: () => void;
  comment: SelectCommentListItemType;
  onSuccess?: () => void;
}

export function UpdateCommentForm({ open, onClose, comment, onSuccess, }: Props) {
  const form = useForm<UpdateCommentFormType>({
    mode: 'all',
    resolver: zodResolver(updateCommentSchema.pick({
      cmntCntnt: true,
      cmntSts: true,
    })),
    defaultValues: {
      cmntCntnt: comment.cmntCntnt,
      cmntSts: comment.cmntSts,
    },
  });

  const updateComment = useUpdateComment(comment.cmntNo);
  const { triggerConfirm, } = useAlert();

  const onSubmitForm: SubmitHandler<UpdateCommentFormType> = (data) => {
    triggerConfirm(
      '댓글을 수정하시겠습니까?',
      () => {
        updateComment.mutate(
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
      <Modal.Top title='댓글 수정' onClose={onClose} />
      <Modal.Content>
        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
          id='update-comment-form'
        >
          <Form.Field>
            <Form.Item<UpdateCommentFormType>
              name='cmntCntnt'
              label='댓글 내용'
              direction='horizontal'
              render={({ field, }) => (
                <Input.LongText
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<UpdateCommentFormType>
              name='cmntSts'
              label='댓글 상태'
              direction='horizontal'
              render={({ field, }) => {
                const getStatusLabel = (status: string) => {
                  switch (status) {
                    case 'PENDING':
                      return '대기';
                    case 'APPROVED':
                      return '승인';
                    case 'REJECTED':
                      return '거부';
                    case 'SPAM':
                      return '스팸';
                    default:
                      return status;
                  }
                };

                return (
                  <Input.SelectContainer
                    value={field.value || 'PENDING'}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <Input.Selection
                      placeholder='상태를 선택하세요'
                      displayValue={getStatusLabel}
                    />
                    <Input.Select>
                      <Input.SelectItem value='PENDING'>
                        대기
                      </Input.SelectItem>
                      <Input.SelectItem value='APPROVED'>
                        승인
                      </Input.SelectItem>
                      <Input.SelectItem value='REJECTED'>
                        거부
                      </Input.SelectItem>
                      <Input.SelectItem value='SPAM'>
                        스팸
                      </Input.SelectItem>
                    </Input.Select>
                  </Input.SelectContainer>
                );
              }}
            />
          </Form.Field>
        </Form.Container>
      </Modal.Content>
      <Modal.Bottom>
        <Button.Action
          label='댓글 수정'
          className='hover:button-normal-black-900'
          type='submit'
          form='update-comment-form'
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
