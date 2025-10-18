'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { LinkButton } from '@/(common)/_components/LinkButton';
import { Button } from '@/(common)/_components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { Separator } from '@/(common)/_components/ui/separator';
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useCreateUser } from '@/_entities/users/hooks';
import { createUserSchema, userRoleSchema, type CreateUserType } from '@/_schemas';

export function SignUpForm() {
  const { setAuthCardHeader, resetAuthCardHeader, } = useAuthActions();

  const createUser = useCreateUser();

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      userNm: '',
      emlAddr: '',
      password: '',
      passwordConfirm: '',
      userRole: userRoleSchema.enum.USER,
    },
  });

  const onSubmitForm: SubmitHandler<CreateUserType> = (data) => {
    createUser.mutate(data);
  };

  useEffect(
    () => {
      setAuthCardHeader({
        title: '구독',
        description: '구독해서 포스트 알림을 받으세요.',
      });

      form.trigger();

      return () => {
        resetAuthCardHeader();
      };
    },
    [
      setAuthCardHeader,
      resetAuthCardHeader,
      form,
    ]
  );

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
            fieldName='userNm'
            label='이름'
            type='text'
            autoComplete='name'
          />

          <FormInput
            fieldName='password'
            label='비밀번호'
            type='password'
            autoComplete='new-password'
          />

          <FormInput
            fieldName='passwordConfirm'
            label='비밀번호 확인'
            type='password'
            autoComplete='new-password'
          />

          <FormField
            control={form.control}
            name='userRole'
            render={({ field, }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} type='hidden' />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <Button
            type='submit'
            className='mt-3'
            disabled={!form.formState.isValid || createUser.isPending}
          >
            {createUser.isPending
              ? '블로그 구독 중...'
              : '블로그 구독'}
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
        <LinkButton href='/auth/signin' size='lg'>
          로그인하기
        </LinkButton>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <Separator className='w-full' />
          </div>
          <div className='relative flex justify-center text-xs'>
            <span className='bg-card px-2 text-muted-foreground'>or</span>
          </div>
        </div>

        <LinkButton href='/' size='lg'>
          홈으로 돌아가기
        </LinkButton>
      </div>
    </div>
  );
}
