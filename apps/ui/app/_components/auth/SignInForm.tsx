'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Box } from '@/_components/ui/box';
import { Form } from '@/_components/ui/form';
import { InputText } from '@/_components/ui/input';
import { useGetSession, useSignIn } from '@/_entities/auth/hooks';
import { signInSchema, type SignInType } from '@/_schemas';

export function SignInForm() {
  const form = useForm<SignInType>({
    mode: 'all',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emlAddr: '',
      password: '',
    },
  });

  const { response, loading, done, error, } = useGetSession();
  const signIn = useSignIn();

  const onSubmitForm: SubmitHandler<SignInType> = (data) => {
    signIn.mutate(data);
  };

  const onResetForm = () => {
    form.reset();
  };

  useEffect(
    () => {
      console.log(response);
      console.log(loading);
      console.log(done);
      console.log(error);
    },
    [
      response,
      loading,
      done,
      error,
    ]
  );

  return (
    <Box.Panel full className='p-2 md:p-4'>
      <Box.Content className={[ 'items-center justify-center', ]}>
        <Box.Top title='로그인' />

        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
          className='w-full max-w-[500px]'
        >
          <Form.Field>
            <Form.Item<SignInType>
              name='emlAddr'
              label='이메일'
              render={({ field, }) => (
                <InputText
                  type='email'
                  autoComplete='username'
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<SignInType>
              name='password'
              label='비밀번호'
              render={({ field, }) => (
                <InputText
                  type='password'
                  autoComplete='current-password'
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Bottom>
            <Form.Button
              type='submit'
              label='로그인'
              disabled={signIn.loading}
            />
            <Form.Button
              type='reset'
              label='초기화'
              onClick={onResetForm}
            />
          </Form.Bottom>
        </Form.Container>
      </Box.Content>
    </Box.Panel>
  );
}
