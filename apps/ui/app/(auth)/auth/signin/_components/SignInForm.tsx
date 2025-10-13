'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { LinkButton } from '@/(common)/_components/LinkButton';
import { Button } from '@/(common)/_components/ui/button';
import { Form } from '@/(common)/_components/ui/form';
import { Separator } from '@/(common)/_components/ui/separator';
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useSignIn } from '@/_entities/auth/hooks';
import { signInSchema, type SignInType } from '@/_schemas';

export function SignInForm() {
  const { setAuthCardHeader, resetAuthCardHeader, } = useAuthActions();

  const signIn = useSignIn();

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emlAddr: '',
      password: '',
    },
  });

  const onSubmitForm: SubmitHandler<SignInType> = (data) => {
    signIn.mutate(data);
  };

  useEffect(() => {
    setAuthCardHeader({
      title: '로그인',
      description: '로그인 페이지입니다.',
    });

    form.trigger();

    return () => {
      resetAuthCardHeader();
    };
  }, [
    setAuthCardHeader,
    resetAuthCardHeader,
    form,
  ]);

  return (
    <div className='flex flex-col gap-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className='flex flex-col gap-2'>
          <FormInput
            fieldName='emlAddr'
            label='이메일'
            type='email'
            autoComplete='email'
          />

          <FormInput
            fieldName='password'
            label='비밀번호'
            type='password'
            autoComplete='current-password'
          />

          <div className='flex items-center justify-end mt-1'>
            <Link
              href='/auth/forgot-password'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <Button
            type='submit'
            className='mt-3'
            disabled={!form.formState.isValid || signIn.isPending}
          >
            {signIn.isPending
              ? '로그인 중...'
              : '로그인'}
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <Separator />
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='bg-card px-2 text-xs text-muted-foreground'>또는</span>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <LinkButton href='/auth/signup' size='lg'>
          회원가입하기
        </LinkButton>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <Separator className='w-full' />
          </div>
          <div className='relative flex justify-center text-xs'>
            <span className='bg-card px-2 text-muted-foreground'>or</span>
          </div>
        </div>

        <LinkButton href='/' size='sm'>
          홈으로 돌아가기
        </LinkButton>
      </div>
    </div>
  );
}
