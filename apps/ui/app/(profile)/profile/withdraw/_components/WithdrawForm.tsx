'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { useWithdraw } from '@/_entities/auth/hooks';
import { cn } from '@/_libs';
import { withdrawSchema, type WithdrawType } from '@/_schemas/user.schema';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {}

const cssVariants = cva([ 'space-y-6', ], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export function WithdrawForm({ className, ...props }: Props) {
  const [
    isConfirming, setIsConfirming,
  ] = useState(false);

  const { mutate: withdraw, isPending, } = useWithdraw();

  const form = useForm<WithdrawType>({
    mode: 'all',
    resolver: standardSchemaResolver(withdrawSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<WithdrawType> = (data) => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    withdraw(data);
  };

  const handleCancel = () => {
    setIsConfirming(false);
    form.reset();
  };

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-destructive'>회원 탈퇴</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-6 p-4 border border-destructive bg-destructive/10 rounded-lg'>
            <p className='text-destructive text-sm'>
              회원 탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
              신중하게 결정해주세요.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='password'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
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
                name='passwordConfirm'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='비밀번호를 확인하세요'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-4'>
                {!isConfirming
                  ? (
                    <>
                      <Button
                        type='submit'
                        variant='destructive'
                        disabled={isPending || !form.formState.isValid}
                      >
                        회원 탈퇴 진행
                      </Button>
                      <Button variant='outline' asChild>
                        <Link href='/profile'>취소</Link>
                      </Button>
                    </>
                  )
                  : (
                    <>
                      <Button
                        type='submit'
                        variant='destructive'
                        disabled={isPending}
                      >
                        {isPending
                          ? '탈퇴 중...'
                          : '최종 탈퇴 확인'}
                      </Button>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={handleCancel}
                        disabled={isPending}
                      >
                        취소
                      </Button>
                    </>
                  )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
