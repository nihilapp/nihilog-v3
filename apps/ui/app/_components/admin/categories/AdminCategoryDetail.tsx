'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { useAdminGetCategoryByNo } from '@/_hooks/admin/categories';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof cssVariants> {
  categoryNo: number;
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AdminCategoryDetail({ categoryNo, className, ...props }: Props) {
  const { response, loading, done, } = useAdminGetCategoryByNo(categoryNo);

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {loading && (
        <Loading
          message='카테고리를 불러오는 중...'
        />
      )}
      {done && response && response.data && (
        <Box.Panel panel={false}>
          <Box.Top title={response.data.ctgryNm} />
          <Box.Content>
            content
          </Box.Content>
        </Box.Panel>
      )}
    </div>
  );
}
