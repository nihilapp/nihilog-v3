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
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useGetSession, useSignIn } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import { signInSchema, type SignInType } from '@/_schemas/user.schema';

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

export function SignInForm({ className, ...props }: Props) {
  const { setAuthCardHeader, } = useAuthActions();
  const { session, loading, } = useGetSession();
  const [
    showModal, setShowModal,
  ] = useState(false);

  const { mutate: signIn, isPending, } = useSignIn();

  const form = useForm<SignInType>({
    mode: 'all',
    resolver: standardSchemaResolver(signInSchema),
    defaultValues: {
      emlAddr: '',
      password: '',
    },
  });

  useEffect(() => {
    form.trigger();

    setAuthCardHeader({
      title: '로그인',
      description: '로그인 후 서비스를 이용해주세요.',
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

  const onSubmit: SubmitHandler<SignInType> = (data) => {
    signIn(data);
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
                    label='이메일'
                    name='emlAddr'
                    type='email'
                    placeholder='이메일을 입력해주세요.'
                    autoComplete='username'
                    required
                    disabled={isPending}
                  />

                  <FormInput
                    form={form}
                    label='비밀번호'
                    name='password'
                    type='password'
                    placeholder='비밀번호를 입력해주세요.'
                    autoComplete='current-password'
                    required
                    disabled={isPending}
                  />

                  <SubmitButton>
                    {isPending
                      ? '로그인 중...'
                      : '로그인'}
                  </SubmitButton>
                </form>
              </Form>

              <div className='flex flex-col gap-3 pt-4 border-t border-gray-200'>
                <div className='text-center'>
                  <span className='text-sm text-gray-600'>계정이 없으신가요? </span>
                  <Link
                    href='/auth/signup'
                    className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
                  >
                    회원가입
                  </Link>
                </div>

                <div className='text-center'>
                  <Link
                    href='/auth/forgot-password'
                    className='text-sm text-gray-500 hover:text-gray-700 transition-colors'
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>

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
          description='로그인한 상태에서는 로그인 페이지에 접근할 수 없습니다. 홈으로 이동하거나 마이페이지로 이동해주세요.'
        />
      )}
    </>
  );
}
