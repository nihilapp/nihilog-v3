'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { Form } from '@/(common)/_components/ui/form';
import { useAdminSignUp } from '@/_entities/admin/hooks';
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

export function AdminSignup({ className, ...props }: Props) {
  const { mutate: adminSignUp, isPending, } = useAdminSignUp();

  const form = useForm<CreateUserType>({
    mode: 'all',
    resolver: standardSchemaResolver(createUserSchema),
    defaultValues: {
      emlAddr: '',
      userNm: '',
      password: '',
      passwordConfirm: '',
      userRole: 'ADMIN' as const,
    },
  });

  const onSubmit: SubmitHandler<CreateUserType> = (data) => {
    adminSignUp(data);
  };

  return (
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
            placeholder='관리자 이메일을 입력해주세요.'
            autoComplete='username'
            required
            disabled={isPending}
          />

          <FormInput
            form={form}
            label='사용자명'
            name='userNm'
            type='text'
            placeholder='관리자명을 입력해주세요.'
            required
            disabled={isPending}
          />

          <input
            type='hidden'
            {...form.register('userRole')}
            value='ADMIN'
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
              ? '관리자 계정 생성 중...'
              : '관리자 계정 생성'}
          </SubmitButton>
        </form>
      </Form>

      <div className='pt-4 mt-4 border-t text-center'>
        <Link
          href='/users'
          className='text-sm text-gray-600 hover:text-gray-800 transition-colors'
        >
          사용자 목록으로 돌아가기
        </Link>
      </div>
    </>
  );
}
