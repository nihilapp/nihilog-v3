'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInType } from '@nihilog/schemas';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Box } from '@/_components/ui/box';
import { Form } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { useSignIn } from '@/_entities/auth/hooks';
import { useSession } from '@/_stores/auth.store';

export function SignInForm() {
  const form = useForm<SignInType>({
    mode: 'all',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emlAddr: '',
      password: '',
    },
  });

  const session = useSession();
  const signIn = useSignIn();
  const router = useRouter();

  // 이미 로그인되어 있으면 리다이렉트
  useEffect(
    () => {
      if (session) {
        if (session.userRole === 'ADMIN') {
          router.push('/admin/dashboard');
        }
        else {
          router.push('/');
        }
      }
    },
    [
      session,
      router,
    ]
  );

  const onSubmitForm: SubmitHandler<SignInType> = (data) => {
    signIn.mutate(
      data,
      {
        onSuccess() {
          form.reset();
        },
      }
    );
  };

  const onResetForm = () => {
    form.reset();
  };

  return (
    <Box.Panel full className='p-2 md:p-4' panel={false}>
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
                <Input.Text
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
                <Input.Text
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
