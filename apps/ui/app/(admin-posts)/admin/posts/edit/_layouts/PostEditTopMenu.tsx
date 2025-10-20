'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { MenuLink } from '@/(common)/_components/MenuLink';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/(common)/_components/ui/alert-dialog';
import { useAdminPostStoreActions, useModCount } from '@/_entities/admin/posts/admin-posts.store';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'flex flex-row justify-between items-center p-2 border-b border-black-200', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function PostEditTopMenu({ className, ...props }: Props) {
  const router = useRouter();
  const [
    showAlert,
    setShowAlert,
  ] = useState(false);

  const modCount = useModCount();
  const { resetModCount, } = useAdminPostStoreActions();

  const onClickBack = () => {
    if (modCount > 0) {
      setShowAlert(true);
    }
    else {
      router.push('/admin/dashboard/posts');
    }
  };

  const onClickConfirm = () => {
    resetModCount();
    setShowAlert(false);
    router.push('/admin/dashboard/posts');
  };

  const onClickCancel = () => {
    setShowAlert(false);
  };

  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <nav>
        <ul>
          <li>
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
              <AlertDialogTrigger asChild>
                <MenuLink
                  href='#'
                  icon={FaArrowLeft}
                  label='목록으로'
                  onClick={(e) => {
                    e.preventDefault();
                    onClickBack();
                  }}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>작업 내용이 저장되지 않았습니다</AlertDialogTitle>
                  <AlertDialogDescription>
                    현재 수정 중인 내용이 있습니다. 목록으로 돌아가면 저장되지 않은 작업 내용이 사라집니다.
                    정말로 목록으로 돌아가시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={onClickCancel}>
                    취소
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={onClickConfirm}>
                    확인
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        </ul>
      </nav>

      <nav>
        <ul>

        </ul>
      </nav>
    </header>
  );
}
