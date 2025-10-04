import { DateTime } from 'luxon';

import { SelectPostShareLogType } from '@/endpoints/prisma/types/post.types';

import { timeToString } from './timeHelper';

/**
 * @description 게시글 공유 기록 예시 데이터.
 */
export function createExamplePostShareLog() {
  const now = DateTime.now();

  return {
    shrnNo: 1,
    pstNo: 1,
    shrnSite: 'twitter',
    shrnDt: timeToString(now),
  } as SelectPostShareLogType;
}
