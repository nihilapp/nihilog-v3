'use client';

import { Icon } from '@iconify/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Badge } from '@/_components/ui/badge';
import { cn } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

const cssVariants = cva(
  [ 'flex items-center gap-2', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface StatusInfo {
  label: string;
  icon: string;
}

interface Props
  extends ReactElementProps<'div'>,
  VariantProps<typeof cssVariants> {
  editMode: 'create' | 'update';
  pstStts?: string;
  rlsYn: string;
  secrYn: string;
  archYn: string;
  pinYn: string;
  className?: string | string[];
}

function getStatusInfo(status: string): StatusInfo {
  switch (status) {
    case 'EMPTY':
      return {
        label: '초안 없음',
        icon: 'material-symbols:draft-outline',
      };
    case 'WRITING':
      return {
        label: '작성중',
        icon: 'material-symbols:edit-outline',
      };
    case 'FINISHED':
      return {
        label: '작성완료',
        icon: 'material-symbols:check-circle-outline',
      };
    default:
      return {
        label: status,
        icon: 'material-symbols:info-outline',
      };
  }
}

export function PostStatusBadges(props: Props) {
  const {
    editMode,
    pstStts,
    rlsYn,
    secrYn,
    archYn,
    pinYn,
    className,
    ...divProps
  } = props;

  const statusInfo = editMode === 'create'
    ? getStatusInfo('EMPTY')
    : pstStts
      ? getStatusInfo(pstStts)
      : null;

  if (!statusInfo) {
    return null;
  }

  return (
    <div
      className={cn(
        cssVariants(),
        className
      )}
      {...divProps}
    >
      <Badge
        label={statusInfo.label}
        icon={<Icon icon={statusInfo.icon} />}
        color='gray'
        textSize='sm'
        display='inline'
      />
      <Badge
        label={rlsYn === 'Y'
          ? '공개'
          : '비공개'}
        icon={(
          <Icon icon={rlsYn === 'Y'
            ? 'material-symbols:public'
            : 'material-symbols:lock-outline'}
          />
        )}
        color={rlsYn === 'Y'
          ? 'green'
          : 'red'}
        textSize='sm'
        display='inline'
      />
      <Badge
        label={secrYn === 'Y'
          ? '비밀글'
          : '일반글'}
        icon={(
          <Icon icon={secrYn === 'Y'
            ? 'material-symbols:visibility-off'
            : 'material-symbols:visibility'}
          />
        )}
        color={secrYn === 'Y'
          ? 'orange'
          : 'gray'}
        textSize='sm'
        display='inline'
      />
      <Badge
        label={archYn === 'Y'
          ? '아카이브'
          : '활성'}
        icon={(
          <Icon icon={archYn === 'Y'
            ? 'material-symbols:archive-outline'
            : 'material-symbols:folder-outline'}
          />
        )}
        color={archYn === 'Y'
          ? 'gray'
          : 'green'}
        textSize='sm'
        display='inline'
      />
      <Badge
        label={pinYn === 'Y'
          ? '상단 고정'
          : '일반'}
        icon={(
          <Icon icon={pinYn === 'Y'
            ? 'material-symbols:push-pin'
            : 'material-symbols:bookmark-outline'}
          />
        )}
        color={pinYn === 'Y'
          ? 'blue'
          : 'gray'}
        textSize='sm'
        display='inline'
      />
    </div>
  );
}

export { getStatusInfo };
