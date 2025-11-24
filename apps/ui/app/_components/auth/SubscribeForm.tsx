'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, passwordSchema } from '@nihilog/schemas';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Box } from '@/_components/ui/box';
import { Form } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { useAlert } from '@/_hooks/common/use-alert';
import { useCreateUser } from '@/_hooks/users';

// UI 전용 스키마 (passwordConfirm 필드 추가)
const createUserUISchema = createUserSchema.extend({
  passwordConfirm: passwordSchema,
}).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: [ 'passwordConfirm', ],
  }
);

type CreateUserUISchemaType = z.infer<typeof createUserUISchema>;

export function SubscribeForm() {
  const form = useForm<CreateUserUISchemaType>({
    mode: 'all',
    resolver: zodResolver(createUserUISchema),
    defaultValues: {
      emlAddr: '',
      userNm: '',
      userRole: 'USER',
      password: '',
      passwordConfirm: '',
    },
  });

  const createUser = useCreateUser();
  const { triggerConfirm, } = useAlert();

  const onSubmitForm: SubmitHandler<CreateUserUISchemaType> = (data) => {
    // passwordConfirm 필드 제거 후 전송
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, ...submitData } = data;
    triggerConfirm(
      '회원가입을 진행하시겠습니까?',
      () => {
        createUser.mutate(
          submitData,
          {
            onSuccess() {
              form.reset();
            },
          }
        );
      }
    );
  };

  const onResetForm = () => {
    form.reset();
  };

  return (
    <Box.Panel full className='p-2 md:p-4' panel={false}>
      <Box.Content className={[ 'items-center justify-center', ]}>
        <Box.Top title='회원가입' />

        <Form.Container
          form={form}
          onSubmit={onSubmitForm}
          className='w-full max-w-[500px]'
        >
          <Form.Field>
            <Form.Item<CreateUserUISchemaType>
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
            <Form.Item<CreateUserUISchemaType>
              name='userNm'
              label='이름'
              render={({ field, }) => (
                <Input.Text
                  type='text'
                  autoComplete='name'
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateUserUISchemaType>
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
            <Form.Item<CreateUserUISchemaType>
              name='password'
              label='비밀번호'
              render={({ field, }) => (
                <Input.Text
                  type='password'
                  autoComplete='new-password'
                  {...field}
                />
              )}
            />
          </Form.Field>

          <Form.Field>
            <Form.Item<CreateUserUISchemaType>
              name='passwordConfirm'
              label='비밀번호 확인'
              render={({ field, }) => (
                <Input.Text
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
