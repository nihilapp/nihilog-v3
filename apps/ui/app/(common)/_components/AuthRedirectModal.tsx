'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';

import { Button } from '@/(common)/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/(common)/_components/ui/dialog';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const cssVariants = cva(
  [
    'sm:max-w-md',
  ],
  {
    variants: {
      size: {
        default: 'sm:max-w-md',
        large: 'sm:max-w-lg',
        small: 'sm:max-w-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export function AuthRedirectModal({
  className,
  size,
  isOpen,
  onClose,
  title,
  description,
  ...props
}: Props) {
  const router = useRouter();

  const onClickGoHome = () => {
    onClose();
    router.push('/');
  };

  const onClickGoProfile = () => {
    onClose();
    router.push('/profile');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(cssVariants({ size, }), className)} {...props}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex gap-2 !justify-center items-center'>
          <Button onClick={onClickGoHome} variant='outline'>
            홈으로
          </Button>
          <Button onClick={onClickGoProfile}>
            마이페이지
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
