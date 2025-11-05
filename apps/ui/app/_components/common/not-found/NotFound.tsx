'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/_components/common/Button';
import { Box } from '@/_components/ui/box';

export function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <Box.Panel>
      <div className='flex flex-col items-center justify-center h-full'>
        <p className='text-md mb-5'>
          <span className='font-900 text-red-500'>{pathname}</span>
          페이지를 찾을 수 없습니다.
        </p>
        <Button
          type='button'
          mode='outline'
          color='black'
          label='뒤로가기'
          onClick={onClickBack}
          className='w-1/2'
        />
      </div>
    </Box.Panel>
  );
}
