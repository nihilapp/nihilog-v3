'use client';

import { usePathname } from 'next/navigation';

import { Box } from '@/_components/ui/box';

export function NotFound() {
  const pathname = usePathname();

  return (
    <Box.Panel>
      <div className='flex flex-col items-center justify-center h-full'>
        <p className='text-md mb-5'>
          <span className='font-900 text-red-500'>{pathname} </span>
          페이지를 찾을 수 없습니다.
        </p>
      </div>
    </Box.Panel>
  );
}
