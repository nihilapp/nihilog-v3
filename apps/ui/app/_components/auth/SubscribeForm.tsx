'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Box } from '@/_components/ui/box';
import { Form } from '@/_components/ui/form';
import { InputText } from '@/_components/ui/input';
import { useCreateUser } from '@/_entities/users/hooks';
import { createUserSchema, type CreateUserType } from '@/_schemas';

export function SubscribeForm() {
  const form = useForm<CreateUserType>({
    mode: 'all',
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      emlAddr: '',
      userNm: '',
      userRole: 'USER',
      password: '',
      passwordConfirm: '',
    },
  });

  const createUser = useCreateUser();

  const onSubmitForm: SubmitHandler<CreateUserType> = (data) => {
    createUser.mutate(data);
  };

  const onResetForm = () => {
    form.reset();
  };

  return (
    <Box.Panel modal width={500}>
      <Box.Top title='회원가입' />
      <Box.Content>
        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
        >
          <Form.Field>
            <Form.Item<CreateUserType>
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
            <Form.Item<CreateUserType>
              name='userNm'
              label='이름'
              render={({ field, }) => (
                <InputText
                  type='text'
                  autoComplete='name'
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateUserType>
              name='userRole'
              render={({ field, }) => (
                <input
                  type='hidden'
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateUserType>
              name='password'
              label='비밀번호'
              render={({ field, }) => (
                <InputText
                  type='password'
                  autoComplete='new-password'
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateUserType>
              name='passwordConfirm'
              label='비밀번호 확인'
              render={({ field, }) => (
                <InputText
                  type='password'
                  autoComplete='new-password'
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Bottom>
            <Form.Button
              type='submit'
              label='회원가입'
              disabled={createUser.loading}
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
