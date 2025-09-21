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
import { useGetSession, useSignUp } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import { createUserSchema, type CreateUserType } from '@/_schemas/user.schema';

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

export function SignUpForm({ className, ...props }: Props) {
  const { setAuthCardHeader, } = useAuthActions();
  const { session, loading, } = useGetSession();
  const [
    showModal, setShowModal,
  ] = useState(false);

  const { mutate: signUp, isPending, } = useSignUp();

  const form = useForm<CreateUserType>({
    mode: 'all',
    resolver: standardSchemaResolver(createUserSchema),
    defaultValues: {
      emlAddr: '',
      userNm: '',
      userRole: 'USER' as const,
      password: '',
      passwordConfirm: '',
    },
  });

  useEffect(() => {
    form.trigger();

    setAuthCardHeader({
      title: '회원가입',
      description: '새로운 계정을 만들어 서비스를 이용해보세요.',
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

  const onSubmit: SubmitHandler<CreateUserType> = (data) => {
    signUp(data);
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
                    label='사용자명'
                    name='userNm'
                    type='text'
                    placeholder='사용자명을 입력해주세요.'
                    required
                    disabled={isPending}
                  />

                  {/* Hidden userRole field */}
                  <input
                    type='hidden'
                    {...form.register('userRole')}
                    value='USER'
                  />

                  <FormInput
                    form={form}
                    label='비밀번호'
                    name='password'
                    type='password'
                    placeholder='비밀번호를 입력해주세요. (10자 이상, 영문/숫자/특수문자 포함)'
                    autoComplete='new-password'
                    required
                    disabled={isPending}
                  />

                  <FormInput
                    form={form}
                    label='비밀번호 확인'
                    name='passwordConfirm'
                    type='password'
                    placeholder='비밀번호를 다시 입력해주세요.'
                    autoComplete='new-password'
                    required
                    disabled={isPending}
                  />

                  <SubmitButton>
                    {isPending
                      ? '회원가입 중...'
                      : '회원가입'}
                  </SubmitButton>
                </form>
              </Form>

              {/* 유틸리티 링크들 */}
              <div className='flex flex-col gap-3 pt-4 border-t border-gray-200'>
                {/* 로그인 링크 */}
                <div className='text-center'>
                  <span className='text-sm text-gray-600'>이미 계정이 있으신가요? </span>
                  <Link
                    href='/auth/signin'
                    className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
                  >
                    로그인
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
          description='로그인한 상태에서는 회원가입 페이지에 접근할 수 없습니다. 홈으로 이동하거나 마이페이지로 이동해주세요.'
        />
      )}
    </>
  );
}
