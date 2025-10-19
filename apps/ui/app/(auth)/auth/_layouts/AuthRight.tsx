'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [ 'hidden lg:flex lg:flex-1 lg:relative overflow-hidden', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AuthRight({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900'>
        <div className='absolute inset-0 bg-black/10' />
        <div className='relative flex h-full flex-col p-8 overflow-y-auto'>
          <div className='space-y-8'>
            {/* 공지사항 섹션 */}
            <div>
              <h3 className='text-h4 font-bold text-white mb-4'>📢 공지사항</h3>
              <div className='space-y-3'>
                <div className='text-sm text-gray-300'>
                  • 새로운 기능 업데이트: 댓글 알림 시스템 개선
                </div>
                <div className='text-sm text-gray-300'>
                  • 서버 점검 안내: 12월 25일 새벽 2-4시
                </div>
                <div className='text-sm text-gray-300'>
                  • 블로그 테마 업데이트 완료
                </div>
                <div className='text-sm text-gray-300'>
                  • 구독자 1000명 돌파 기념 이벤트 진행 중
                </div>
              </div>
            </div>

            {/* 최신글 섹션 */}
            <div>
              <h3 className='text-h4 font-bold text-white mb-4'>📝 최신글</h3>
              <div className='space-y-3'>
                <div className='text-sm text-gray-300'>
                  • Next.js 14 App Router 완벽 가이드
                </div>
                <div className='text-sm text-gray-300'>
                  • TypeScript 고급 타입 활용법
                </div>
                <div className='text-sm text-gray-300'>
                  • React Query vs SWR 비교 분석
                </div>
                <div className='text-sm text-gray-300'>
                  • 웹 성능 최적화 실전 팁
                </div>
                <div className='text-sm text-gray-300'>
                  • Tailwind CSS 디자인 시스템 구축
                </div>
              </div>
            </div>

            {/* 인기 태그 섹션 */}
            <div>
              <h3 className='text-h4 font-bold text-white mb-4'>🏷️ 인기 태그</h3>
              <div className='flex flex-wrap gap-2'>
                <span className='px-2 py-1 bg-white/10 text-xs text-white rounded-full'>React</span>
                <span className='px-2 py-1 bg-white/10 text-xs text-white rounded-full'>TypeScript</span>
                <span className='px-2 py-1 bg-white/10 text-xs text-white rounded-full'>Next.js</span>
                <span className='px-2 py-1 bg-white/10 text-xs text-white rounded-full'>Web Dev</span>
                <span className='px-2 py-1 bg-white/10 text-xs text-white rounded-full'>Tutorial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
