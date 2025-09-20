'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { useChangePassword } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import { changePasswordSchema, type ChangePasswordType } from '@/_schemas/user.schema';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {}

const cssVariants = cva([ 'space-y-6', ], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export function ChangePasswordForm({ className, ...props }: Props) {
  const { mutate: changePassword, isPending, } = useChangePassword();

  const form = useForm<ChangePasswordType>({
    mode: 'all',
    resolver: standardSchemaResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordType) => {
    changePassword(data);
  };

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>비밀번호 변경</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='currentPassword'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>현재 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='현재 비밀번호를 입력하세요'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='newPassword'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='새 비밀번호를 입력하세요 (10자 이상, 영문/숫자/특수문자 포함)'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='비밀번호를 다시 입력하세요'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-4'>
                <Button type='submit' disabled={isPending}>
                  {isPending
                    ? '변경 중...'
                    : '비밀번호 변경'}
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/profile'>취소</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
