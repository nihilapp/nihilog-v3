import { DateTime } from 'luxon';

import { UserSubscribeType } from '@/endpoints/drizzle/schemas/subscribe.schema';

import { timeToString } from './timeHelper';

/**
 * @description 구독 설정 예시 데이터.
 */
export function createExampleSubscribe() {
  const now = DateTime.now();

  return {
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
