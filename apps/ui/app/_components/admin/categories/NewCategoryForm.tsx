'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createCategorySchema, type CreateCategoryType, type SelectCategoryListItemType } from '@nihilog/schemas';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { CategoryParentSelect } from '@/_components/admin/categories/CategoryParentSelect';
import { Button } from '@/_components/ui/button';
import { Form } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { Modal } from '@/_components/ui/modal';
import { useAdminCreateCategory } from '@/_entities/admin/categories/hooks';
import { useAlert } from '@/_entities/common/hooks/use-alert';
import { cn } from '@/_libs';

interface Props {
  open: boolean;
  onClose: () => void;
  categoryList: SelectCategoryListItemType[];
}

export function NewCategoryForm({ open, onClose, categoryList, }: Props) {
  const form = useForm<CreateCategoryType>({
    mode: 'all',
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      ctgryNm: '',
      ctgryStp: 0,
      upCtgryNo: undefined,
      ctgryExpln: undefined,
      ctgryColr: undefined,
      useYn: 'Y',
      delYn: 'N',
    },
  });

  const createCategory = useAdminCreateCategory();
  const { triggerConfirm, } = useAlert();

  const upCtgryNo = form.watch('upCtgryNo');
  const upCtgryNoError = form.formState.errors.upCtgryNo;

  const onSubmitForm: SubmitHandler<CreateCategoryType> = (data) => {
    triggerConfirm(
      '카테고리를 추가하시겠습니까?',
      () => {
        createCategory.mutate(
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
      <Modal.Top title='카테고리 추가' onClose={onClose} />
      <Modal.Content>
        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
          id='new-category-form'
        >
          <Form.Field>
            <Form.Item<CreateCategoryType>
              name='ctgryNm'
              label='카테고리 이름'
              direction='horizontal'
              render={({ field, }) => (
                <Input.Text
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateCategoryType>
              name='ctgryStp'
              label='정렬순'
              direction='horizontal'
              render={({ field, }) => (
                <Input.Text
                  type='number'
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const value = e.target.value === ''
                      ? undefined
                      : Number(e.target.value);
                    field.onChange(value);
                  }}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <div className='flex gap-2 flex-row'>
              <span className={cn([
                'font-700',
                'w-[200px] shrink-0 mt-2',
              ])}
              >
                상위 카테고리
              </span>
              <div className='flex-1'>
                <CategoryParentSelect
                  categoryList={categoryList}
                  value={upCtgryNo}
                  onChange={(value) => {
                    form.setValue(
                      'upCtgryNo',
                      value,
                      { shouldValidate: true, }
                    );
                  }}
                />
                {upCtgryNoError && (
                  <span className={cn([
                    'text-red-500 text-sm italic',
                    'block mt-1',
                  ])}
                  >
                    {upCtgryNoError.message}
                  </span>
                )}
              </div>
            </div>
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateCategoryType>
              name='ctgryExpln'
              label='카테고리 설명'
              direction='horizontal'
              render={({ field, }) => (
                <Input.LongText
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateCategoryType>
              name='ctgryColr'
              label='카테고리 색상'
              direction='horizontal'
              render={({ field, }) => (
                <Input.Text
                  {...field}
                  placeholder='#RRGGBB'
                />
              )}
            />
          </Form.Field>
        </Form.Container>
      </Modal.Content>
      <Modal.Bottom>
        <Button.Action
          label='카테고리 추가'
          className='hover:button-normal-black-900'
          type='submit'
          form='new-category-form'
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
