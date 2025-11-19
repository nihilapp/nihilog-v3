'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createCategorySchema, type CreateCategoryType, type SelectCategoryListItemType } from '@nihilog/schemas';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/_components/ui/button';
import { Form } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { Modal } from '@/_components/ui/modal';
import { useAdminCreateCategory } from '@/_entities/admin/categories/hooks';
import { cn } from '@/_libs';

interface Props {
  open: boolean;
  onClose: () => void;
  parentCtgryNo: number;
  categoryList: SelectCategoryListItemType[];
}

export function AddChildCategoryForm({ open, onClose, parentCtgryNo, categoryList, }: Props) {
  const form = useForm<CreateCategoryType>({
    mode: 'all',
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      ctgryNm: '',
      ctgryStp: 0,
      upCtgryNo: parentCtgryNo,
      ctgryExpln: undefined,
      ctgryColr: undefined,
      useYn: 'Y',
      delYn: 'N',
    },
  });

  const createCategory = useAdminCreateCategory();

  // 모달이 열릴 때마다 상위 카테고리 번호를 고정값으로 설정
  useEffect(
    () => {
      if (open) {
        form.reset({
          ctgryNm: '',
          ctgryStp: 0,
          upCtgryNo: parentCtgryNo,
          ctgryExpln: undefined,
          ctgryColr: undefined,
          useYn: 'Y',
          delYn: 'N',
        });
        // 상위 카테고리 번호를 고정값으로 설정하고 변경 불가능하게 만듦
        form.setValue(
          'upCtgryNo',
          parentCtgryNo,
          { shouldValidate: true, }
        );
      }
    },
    [
      open,
      parentCtgryNo,
      form,
    ]
  );

  const onSubmitForm: SubmitHandler<CreateCategoryType> = (data) => {
    // 상위 카테고리 번호를 항상 고정값으로 설정
    const submitData = {
      ...data,
      upCtgryNo: parentCtgryNo,
    };
    createCategory.mutate(
      submitData,
      {
        onSuccess() {
          form.reset();
          onClose();
        },
      }
    );
  };

  // 상위 카테고리 이름 찾기
  const parentCategory = categoryList.find((c) => c.ctgryNo === parentCtgryNo);

  return (
    <Modal.Container
      open={open}
      onClose={onClose}
      width={800}
      height={600}
    >
      <Modal.Top title='하위 카테고리 추가' onClose={onClose} />
      <Modal.Content>
        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
          id='add-child-category-form'
        >
          <Form.Field>
            <div className='flex gap-2 flex-row'>
              <span className={cn([
                'font-700',
                'w-[200px] shrink-0 mt-2',
              ])}
              >
                상위 카테고리
              </span>
              <div className='flex-1 mt-2'>
                <Input.Text
                  value={parentCategory?.ctgryNm ?? `카테고리 #${parentCtgryNo}`}
                  disabled
                  className='bg-black-200 cursor-not-allowed'
                />
              </div>
            </div>
          </Form.Field>

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
          label='하위 카테고리 추가'
          className='hover:button-normal-black-900'
          type='submit'
          form='add-child-category-form'
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
