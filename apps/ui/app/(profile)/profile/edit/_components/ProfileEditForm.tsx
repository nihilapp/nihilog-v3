'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Input } from '@/(common)/_components/ui/input';
import { useGetSession } from '@/_entities/auth/hooks';
import { useUpdateProfile } from '@/_entities/users/hooks';
import { cn } from '@/_libs';
import { updateUserSchema, type UpdateUserType } from '@/_schemas/user.schema';

// ⚠️ 스키마는 반드시 @repo/dto에서 import

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {}

const cssVariants = cva([ 'space-y-6', ], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export function ProfileEditForm({ className, ...props }: Props) {
  const { session, isPending: isSessionPending, } = useGetSession();
  const [
    editingField, setEditingField,
  ] = useState<string | null>(null);

  const { mutate: updateProfile, isPending, } = useUpdateProfile();

  const form = useForm({
    mode: 'all',
    resolver: standardSchemaResolver(updateUserSchema),
    defaultValues: {
      userNm: '',
      proflImg: '',
      userBiogp: '',
    },
  });

  // 세션 데이터가 로드되면 폼 기본값 설정
  useEffect(() => {
    if (session?.data) {
      form.reset({
        userNm: session.data.userNm || '',
        proflImg: session.data.proflImg || '',
        userBiogp: session.data.userBiogp || '',
      });
    }
  }, [
    session, form,
  ]);

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  // 개별 필드 수정 함수들
  const handleFieldUpdate = (fieldName: string, value: string) => {
    if (session?.data) {
      const updateData: Partial<UpdateUserType> = {};
      updateData[fieldName as keyof UpdateUserType] = value;
      updateProfile(updateData, {
        onSuccess: () => {
          setEditingField(null);
        },
      });
    }
  };

  const handleEditField = (fieldName: string) => {
    setEditingField(fieldName);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    form.reset({
      userNm: session?.data?.userNm || '',
      proflImg: session?.data?.proflImg || '',
      userBiogp: session?.data?.userBiogp || '',
    });
  };

  if (isSessionPending) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <div className='animate-pulse space-y-4'>
          <div className='h-4 bg-muted rounded w-1/4' />
          <div className='h-4 bg-muted rounded w-1/2' />
          <div className='h-4 bg-muted rounded w-3/4' />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <p className='text-center text-muted-foreground'>
          세션 정보를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>프로필 수정</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* 이름 필드 */}
          <div className='space-y-2'>
            <label htmlFor='userNm' className='text-sm font-medium'>이름</label>
            {editingField === 'userNm'
              ? (
                <div className='flex gap-2'>
                  <Input
                    id='userNm'
                    placeholder='이름을 입력하세요'
                    value={form.watch('userNm')}
                    onChange={(e) => form.setValue('userNm', e.target.value)}
                    disabled={isPending}
                  />
                  <Button
                    size='sm'
                    onClick={() => handleFieldUpdate('userNm', form.getValues('userNm') || '')}
                    disabled={isPending}
                  >
                    {isPending
                      ? '수정 중...'
                      : '저장'}
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={handleCancelEdit}
                    disabled={isPending}
                  >
                    취소
                  </Button>
                </div>
              )
              : (
                <div className='flex items-center justify-between p-3 border rounded-md bg-muted/50'>
                  <span>{session?.data?.userNm || '이름이 설정되지 않았습니다.'}</span>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleEditField('userNm')}
                  >
                    수정
                  </Button>
                </div>
              )}
          </div>

          {/* 프로필 이미지 필드 */}
          <div className='space-y-2'>
            <label htmlFor='proflImg' className='text-sm font-medium'>프로필 이미지</label>
            {editingField === 'proflImg'
              ? (
                <div className='flex gap-2'>
                  <Input
                    id='proflImg'
                    type='text'
                    placeholder='프로필 이미지 URL'
                    value={form.watch('proflImg') || ''}
                    onChange={(e) => form.setValue('proflImg', e.target.value)}
                    disabled={isPending}
                  />
                  <Button
                    size='sm'
                    onClick={() => handleFieldUpdate('proflImg', form.getValues('proflImg') || '')}
                    disabled={isPending}
                  >
                    {isPending
                      ? '수정 중...'
                      : '저장'}
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={handleCancelEdit}
                    disabled={isPending}
                  >
                    취소
                  </Button>
                </div>
              )
              : (
                <div className='flex items-center justify-between p-3 border rounded-md bg-muted/50'>
                  <span>{session?.data?.proflImg || '프로필 이미지가 설정되지 않았습니다.'}</span>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleEditField('proflImg')}
                  >
                    수정
                  </Button>
                </div>
              )}
          </div>

          {/* 자기소개 필드 */}
          <div className='space-y-2'>
            <label htmlFor='userBiogp' className='text-sm font-medium'>자기소개</label>
            {editingField === 'userBiogp'
              ? (
                <div className='flex gap-2'>
                  <Input
                    id='userBiogp'
                    type='text'
                    placeholder='자기소개를 입력하세요'
                    value={form.watch('userBiogp') || ''}
                    onChange={(e) => form.setValue('userBiogp', e.target.value)}
                    disabled={isPending}
                  />
                  <Button
                    size='sm'
                    onClick={() => handleFieldUpdate('userBiogp', form.getValues('userBiogp') || '')}
                    disabled={isPending}
                  >
                    {isPending
                      ? '수정 중...'
                      : '저장'}
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={handleCancelEdit}
                    disabled={isPending}
                  >
                    취소
                  </Button>
                </div>
              )
              : (
                <div className='flex items-center justify-between p-3 border rounded-md bg-muted/50'>
                  <span>{session?.data?.userBiogp || '자기소개가 설정되지 않았습니다.'}</span>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleEditField('userBiogp')}
                  >
                    수정
                  </Button>
                </div>
              )}
          </div>

          <div className='flex gap-4 pt-4'>
            <Button variant='outline' asChild>
              <Link href='/profile'>마이페이지로 돌아가기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
