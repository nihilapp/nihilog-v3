'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Box } from '@/_components/ui/box';
import { Form } from '@/_components/ui/form';
import { InputText } from '@/_components/ui/input';
import { useSignIn } from '@/_entities/auth/hooks';
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

  const signIn = useSignIn();

  const onSubmitForm: SubmitHandler<SignInType> = (data) => {
    signIn.mutate(data);
  };

  const onResetForm = () => {
    form.reset();
  };

  return (
    <Box.Panel modal width={500}>
      <Box.Top title='로그인' />
      <Box.Content>
        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
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
