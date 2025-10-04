import { DateTime } from 'luxon';

import { SelectPostViewLogType } from '@/endpoints/prisma/types/post.types';

import { timeToString } from './timeHelper';

/**
 * @description 게시글 조회 기록 예시 데이터.
 */
export function createExamplePostViewLog() {
  const now = DateTime.now();

  return {
    viewNo: 1,
    pstNo: 1,
    viewerIp: '192.168.1.100',
    viewDt: timeToString(now),
  } as SelectPostViewLogType;
}
