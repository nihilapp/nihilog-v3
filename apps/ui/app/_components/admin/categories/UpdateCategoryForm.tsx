'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { updateCategorySchema, type UpdateCategoryType } from '@nihilog/schemas';
import type { SelectCategoryListItemType } from '@nihilog/schemas';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { CategoryParentSelect } from '@/_components/admin/categories/CategoryParentSelect';
import { Button } from '@/_components/ui/button';
import { Form } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { Modal } from '@/_components/ui/modal';
import { useAdminUpdateCategory } from '@/_entities/admin/categories/hooks';
import { cn } from '@/_libs';

interface Props {
  open: boolean;
  onClose: () => void;
  category: SelectCategoryListItemType;
  categoryList: SelectCategoryListItemType[];
}

export function UpdateCategoryForm({ open, onClose, category, categoryList, }: Props) {
  const form = useForm<UpdateCategoryType>({
    mode: 'all',
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      ctgryNo: category.ctgryNo,
      ctgryNm: category.ctgryNm,
      ctgryStp: category.ctgryStp,
      upCtgryNo: category.upCtgryNo ?? undefined,
      ctgryExpln: category.ctgryExpln ?? undefined,
      ctgryColr: category.ctgryColr ?? undefined,
      useYn: category.useYn,
      delYn: category.delYn,
    },
  });

  const updateCategory = useAdminUpdateCategory(category.ctgryNo);

  const upCtgryNo = form.watch('upCtgryNo');
  const upCtgryNoError = form.formState.errors.upCtgryNo;

  const onSubmitForm: SubmitHandler<UpdateCategoryType> = (data) => {
    updateCategory.mutate(
      data,
      {
        onSuccess() {
          form.reset();
          onClose();
        },
      }
    );
  };

  return (
    <Modal.Container
      open={open}
      onClose={onClose}
      width={800}
      height={600}
    >
      <Modal.Top title='카테고리 수정' onClose={onClose} />
      <Modal.Content>
        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
          id='update-category-form'
        >
          <Form.Field>
            <Form.Item<UpdateCategoryType>
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
            <Form.Item<UpdateCategoryType>
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
                  excludeCategoryNo={category.ctgryNo}
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
            <Form.Item<UpdateCategoryType>
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
            <Form.Item<UpdateCategoryType>
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

          <Form.Field>
            <Form.Item<UpdateCategoryType>
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
            <Form.Item<UpdateCategoryType>
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
          label='카테고리 수정'
          className='hover:button-normal-black-900'
          type='submit'
          form='update-category-form'
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
