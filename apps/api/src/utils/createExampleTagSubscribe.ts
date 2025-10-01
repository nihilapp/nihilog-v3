import { DateTime } from 'luxon';

import { timeToString } from './timeHelper';

/**
 * @description 태그 구독 예시 데이터.
 */
export function createExampleTagSubscribe(type: 'list' | 'detail' = 'detail') {
  const now = DateTime.now();

  return {
    ...(type === 'list'
      ? {
        rowNo: 1,
        totalCnt: 1,
      }
      : {}),
    tagSbcrNo: 1,
    sbcrNo: 1,
    tagNo: 1,
    useYn: 'Y',
    delYn: 'N',
    crtNo: 1,
    crtDt: timeToString(now),
    updtNo: 1,
    updtDt: timeToString(now),
    delNo: null,
    delDt: null,
  };
}
