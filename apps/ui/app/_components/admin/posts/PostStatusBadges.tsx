'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import {
  MdDrafts,
  MdEdit,
  MdCheckCircle,
  MdInfo,
  MdPublic,
  MdLockOutline,
  MdVisibilityOff,
  MdVisibility,
  MdArchive,
  MdFolder,
  MdPushPin,
  MdBookmarkBorder
} from 'react-icons/md';

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
  icon: React.ReactNode;
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
        icon: <MdDrafts className='size-5' />,
      };
    case 'WRITING':
      return {
        label: '작성중',
        icon: <MdEdit className='size-5' />,
      };
    case 'FINISHED':
      return {
        label: '작성완료',
        icon: <MdCheckCircle className='size-5' />,
      };
    default:
      return {
        label: status,
        icon: <MdInfo className='size-5' />,
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
        icon={statusInfo.icon}
        color='gray'
        textSize='sm'
        display='inline'
      />
      <Badge
        label={rlsYn === 'Y'
          ? '공개'
          : '비공개'}
        icon={rlsYn === 'Y'
          ? <MdPublic className='size-5' />
          : <MdLockOutline className='size-5' />}
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
        icon={secrYn === 'Y'
          ? <MdVisibilityOff className='size-5' />
          : <MdVisibility className='size-5' />}
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
        icon={archYn === 'Y'
          ? <MdArchive className='size-5' />
          : <MdFolder className='size-5' />}
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
        icon={pinYn === 'Y'
          ? <MdPushPin className='size-5' />
          : <MdBookmarkBorder className='size-5' />}
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
