'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { AuthRedirectModal, NotShow } from '@/(common)/_components';
import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { Form } from '@/(common)/_components/ui/form';
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useResetPassword, useGetSession } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import { resetPasswordSchema, type ResetPasswordType } from '@/_schemas/user.schema';

interface Props
  extends React.FormHTMLAttributes<HTMLFormElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'flex flex-col gap-2 flex-1', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ResetPasswordForm({ className, ...props }: Props) {
  const searchParams = useSearchParams();
  const { setAuthCardHeader, } = useAuthActions();
  const { session, loading, } = useGetSession();
  const [
    showModal, setShowModal,
  ] = useState(false);

  const { mutate: setNewPassword, isPending, } = useResetPassword();

  const form = useForm<ResetPasswordType>({
    mode: 'all',
    resolver: standardSchemaResolver(resetPasswordSchema),
    defaultValues: {
      resetToken: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      form.setValue('resetToken', token);
    }

    form.trigger();

    setAuthCardHeader({
      title: '새 비밀번호 설정',
      description: '새로운 비밀번호를 입력해주세요.',
    });
  }, [
    form, setAuthCardHeader, searchParams,
  ]);

  useEffect(() => {
    if (!loading && session) {
      setShowModal(true);
    }
  }, [
    session, loading,
  ]);

  const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
    setNewPassword(data);
  };

  return (
    <>
      {
        !loading && session
          ? (
            <NotShow />
          )
          : (
            <>
              <Form {...form}>
                <form
                  className={cn(
                    cssVariants({}),
                    className
                  )}
                  onSubmit={form.handleSubmit(onSubmit)}
                  {...props}
                >
                  <FormInput
                    form={form}
                    label='새 비밀번호'
                    name='newPassword'
                    type='password'
                    placeholder='새 비밀번호를 입력해주세요. (10자 이상, 영문/숫자/특수문자 포함)'
                    autoComplete='new-password'
                    required
                    disabled={isPending}
                  />

                  <FormInput
                    form={form}
                    label='비밀번호 확인'
                    name='confirmPassword'
                    type='password'
                    placeholder='비밀번호를 다시 입력해주세요.'
                    autoComplete='new-password'
                    required
                    disabled={isPending}
                  />

                  <SubmitButton>
                    {isPending
                      ? '비밀번호 설정 중...'
                      : '비밀번호 설정'}
                  </SubmitButton>
                </form>
              </Form>

              {/* 유틸리티 링크들 */}
              <div className='flex flex-col gap-3 pt-4 border-t border-gray-200'>
                {/* 로그인 링크 */}
                <div className='text-center'>
                  <Link
                    href='/auth/signin'
                    className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
                  >
                    로그인으로 돌아가기
                  </Link>
                </div>

                {/* 홈으로 돌아가기 링크 */}
                <div className='text-center'>
                  <Link
                    href='/'
                    className='text-sm text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    홈으로 돌아가기
                  </Link>
                </div>
              </div>
            </>
          )
      }

      {/* 이미 로그인된 사용자를 위한 모달 */}
      {session && (
        <AuthRedirectModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title='이미 로그인되어 있습니다'
          description='로그인한 상태에서는 새 비밀번호 설정 페이지에 접근할 수 없습니다. 홈으로 이동하거나 마이페이지로 이동해주세요.'
        />
      )}
    </>
  );
}
