import { DateTime } from 'luxon';

import { UserInfoType } from '@/endpoints/prisma/schemas/user.schema';

import { timeToString } from './timeHelper';

/**
 * @description 사용자 예시 데이터.
 */
export function createExampleUser(type: 'list' | 'detail' = 'detail') {
  const now = DateTime.now();

  return {
    ...(type === 'list'
      ? {
        rowNo: 1,
        totalCnt: 1,
      }
      : {}),
    userNo: 1,
    emlAddr: 'user@example.com',
    userNm: '홍길동',
    userRole: 'USER',
    proflImg: null,
    userBiogp: '안녕하세요. 반갑습니다.',
    encptPswd: null,
    reshToken: null,
    useYn: 'Y',
    delYn: 'N',
    lastLgnDt: timeToString(now),
    lastPswdChgDt: timeToString(now),
    crtNo: 1,
    crtDt: timeToString(now),
    updtNo: 1,
    updtDt: timeToString(now),
    delNo: null,
    delDt: null,
  } as UserInfoType;
}
