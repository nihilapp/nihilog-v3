'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { AuthRedirectModal, NotShow } from '@/(common)/_components';
import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { Form } from '@/(common)/_components/ui/form';
import { MESSAGE_CODE } from '@/_code/message.code';
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useForgotPassword, useGetSession } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import { forgotPasswordSchema, type ForgotPasswordType } from '@/_schemas/user.schema';

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

export function ForgotPasswordForm({ className, ...props }: Props) {
  const { setAuthCardHeader, } = useAuthActions();
  const { session, loading, } = useGetSession();
  const [
    showModal, setShowModal,
  ] = useState(false);
  const { mutate: forgotPassword, isPending, isPostedEmail, } = useForgotPassword();

  const form = useForm<ForgotPasswordType>({
    mode: 'all',
    resolver: standardSchemaResolver(forgotPasswordSchema),
    defaultValues: {
      emlAddr: '',
    },
  });

  useEffect(() => {
    form.trigger();

    setAuthCardHeader({
      title: '비밀번호 재설정 요청',
      description: '가입시 입력한 이메일 주소를 입력해주세요. 비밀번호 재설정 링크를 전송해드립니다.',
    });
  }, [
    form, setAuthCardHeader,
  ]);

  useEffect(() => {
    if (!loading && session) {
      setShowModal(true);
    }
  }, [
    session, loading,
  ]);

  const onSubmit: SubmitHandler<ForgotPasswordType> = (data) => {
    forgotPassword(data);
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
              {isPostedEmail
                ? (
                <div className='flex flex-col items-center gap-4 p-6 bg-green-50 border border-green-200 rounded-lg'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                    <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <div className='text-center'>
                    <h3 className='text-lg font-semibold text-green-800 mb-2'>
                      이메일이 발송되었습니다
                    </h3>
                    <p className='text-sm text-green-700 mb-4'>
                      {MESSAGE_CODE.FORGOT_PASSWORD_EMAIL_SENT}
                    </p>
                    <div className='flex flex-col gap-2'>
                      <Link
                        href='/auth/signin'
                        className='text-sm text-green-600 hover:text-green-700 font-medium transition-colors'
                      >
                        로그인으로 돌아가기
                      </Link>
                    </div>
                  </div>
                </div>
                )
                : (
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
                      label='이메일'
                      name='emlAddr'
                      type='email'
                      placeholder='가입한 이메일을 입력해주세요.'
                      autoComplete='email'
                      required
                      disabled={isPending}
                    />

                    <SubmitButton>
                      {isPending
                        ? '임시 비밀번호 발송 중...'
                        : '임시 비밀번호 발송'}
                    </SubmitButton>
                  </form>
                </Form>
                )}

              {/* 유틸리티 링크들 - 이메일 발송 전에만 표시 */}
              {!isPostedEmail && (
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

                  {/* 회원가입 링크 */}
                  <div className='text-center'>
                    <span className='text-sm text-gray-600'>계정이 없으신가요? </span>
                    <Link
                      href='/auth/signup'
                      className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
                    >
                      회원가입
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
              )}
            </>
          )
      }

      {/* 이미 로그인된 사용자를 위한 모달 */}
      {session && (
        <AuthRedirectModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title='이미 로그인되어 있습니다'
          description='로그인한 상태에서는 비밀번호 찾기 페이지에 접근할 수 없습니다. 홈으로 이동하거나 마이페이지로 이동해주세요.'
        />
      )}
    </>
  );
}
