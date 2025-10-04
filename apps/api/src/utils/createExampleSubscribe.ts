import { DateTime } from 'luxon';

import { UserSubscribeType } from '@/endpoints/prisma/schemas/subscribe.schema';

import { timeToString } from './timeHelper';

/**
 * @description 구독 설정 예시 데이터.
 */
export function createExampleSubscribe(type: 'list' | 'detail' = 'detail') {
  const now = DateTime.now();

  return {
    ...(type === 'list'
      ? {
        rowNo: 1,
        totalCnt: 1,
      }
      : {}),
    sbcrNo: 1,
    userNo: 1,
    emlNtfyYn: 'Y',
    newPstNtfyYn: 'Y',
    cmntRplNtfyYn: 'Y',
    sbcrCtgryList: [ { ctgryNo: 1, ctgryNm: '카테고리1', }, ],
    sbcrTagList: [ { tagNo: 1, tagNm: '태그1', }, ],
    useYn: 'Y',
    delYn: 'N',
    crtNo: 1,
    crtDt: timeToString(now),
    updtNo: 1,
    updtDt: timeToString(now),
    delNo: null,
    delDt: null,
  } as UserSubscribeType;
}
