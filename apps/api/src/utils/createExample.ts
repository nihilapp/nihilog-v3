import type { SelectCategoryType, SelectCommentType, SelectPostBookmarkType, SelectPostType, SelectPostShareLogType, SelectPostViewLogType, SelectTagInfoType, SelectUserInfoType } from '@nihilog/schemas';
import { DateTime } from 'luxon';

import { timeToString } from './timeHelper';

export class CreateExample {
  static post(type: 'list' | 'detail' = 'detail') {
    const now = DateTime.now();

    return {
      ...(type === 'list'
        ? {
          rowNo: 1,
          totalCnt: 1,
        }
        : {}),
      pstNo: 1,
      userNo: 1,
      ctgryNo: 1,
      pstTtl: '첫 번째 포스트입니다',
      pstSmry: '이것은 첫 번째 포스트의 요약입니다.',
      pstMtxt: '이것은 첫 번째 포스트의 본문입니다.',
      pstCd: 'first-post',
      pstThmbLink: 'https://example.com/thumbnail.jpg',
      pstView: 0,
      pstStts: 'FINISHED',
      publDt: timeToString(now),
      pinYn: 'N',
      rlsYn: 'Y',
      archYn: 'N',
      secrYn: 'N',
      pstPswd: null,
      useYn: 'Y',
      delYn: 'N',
      crtNo: 1,
      crtDt: timeToString(now),
      updtNo: 1,
      updtDt: timeToString(now),
      delNo: null,
      delDt: null,
    } as SelectPostType;
  }

  static user(type: 'list' | 'detail' = 'detail') {
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
    } as SelectUserInfoType;
  }

  static subscribe(type: 'list' | 'detail' = 'detail') {
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
      sbcrCtgryList: [
        {
          ctgryNo: 1,
          ctgryNm: '카테고리1',
        },
      ],
      sbcrTagList: [
        {
          tagNo: 1,
          tagNm: '태그1',
        },
      ],
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

  static tag(type: 'list' | 'detail' = 'detail') {
    const now = DateTime.now();

    return {
      ...(type === 'list'
        ? {
          rowNo: 1,
          totalCnt: 1,
        }
        : {}),
      tagNo: 1,
      tagNm: 'JavaScript',
      tagExpln: 'JavaScript 프로그래밍 언어',
      tagColr: '#F7DF1E',
      useYn: 'Y',
      delYn: 'N',
      crtNo: 1,
      crtDt: timeToString(now),
      updtNo: 1,
      updtDt: timeToString(now),
      delNo: null,
      delDt: null,
    } as SelectTagInfoType;
  }

  static category(type: 'list' | 'detail' = 'detail') {
    const now = DateTime.now();

    return {
      ...(type === 'list'
        ? {
          rowNo: 1,
          totalCnt: 1,
        }
        : {}),
      ctgryNo: 1,
      ctgryNm: 'JavaScript',
      ctgryExpln: 'JavaScript 프로그래밍 언어 카테고리',
      ctgryColr: '#F7DF1E',
      ctgryStp: 1,
      upCtgryNo: null,
      parentCategory: null,
      childCategories: [],
      useYn: 'Y',
      delYn: 'N',
      crtNo: 1,
      crtDt: timeToString(now),
      updtNo: 1,
      updtDt: timeToString(now),
      delNo: null,
      delDt: null,
    } as SelectCategoryType;
  }

  static categorySubscribe(type: 'list' | 'detail' = 'detail') {
    const now = DateTime.now();

    return {
      ...(type === 'list'
        ? {
          rowNo: 1,
          totalCnt: 1,
        }
        : {}),
      ctgrySbcrNo: 1,
      sbcrNo: 1,
      ctgryNo: 1,
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

  static tagSubscribe(type: 'list' | 'detail' = 'detail') {
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

  static postShareLog() {
    const now = DateTime.now();

    return {
      shrnNo: 1,
      pstNo: 1,
      shrnSite: 'twitter',
      shrnDt: timeToString(now),
    } as SelectPostShareLogType;
  }

  static postViewLog() {
    const now = DateTime.now();

    return {
      viewNo: 1,
      pstNo: 1,
      viewerIp: '192.168.1.100',
      viewDt: timeToString(now),
    } as SelectPostViewLogType;
  }

  static postBookmark(type: 'list' | 'detail' = 'detail') {
    const now = DateTime.now();

    return {
      ...(type === 'list'
        ? {
          rowNo: 1,
          totalCnt: 1,
        }
        : {}),
      bkmrkNo: 1,
      userNo: 1,
      pstNo: 1,
      useYn: 'Y',
      delYn: 'N',
      crtNo: 1,
      crtDt: timeToString(now),
      updtNo: 1,
      updtDt: timeToString(now),
      delNo: null,
      delDt: null,
    } as SelectPostBookmarkType;
  }

  static comment(type: 'list' | 'detail' = 'detail') {
    const now = DateTime.now();

    return {
      ...(type === 'list'
        ? {
          rowNo: 1,
          totalCnt: 1,
        }
        : {}),
      cmntNo: 1,
      pstNo: 1,
      cmntCntnt: '정말 유용한 정보네요! 감사합니다.',
      cmntSts: 'PENDING',
      prntCmntNo: null,
      useYn: 'Y',
      delYn: 'N',
      crtNo: 1,
      crtDt: timeToString(now),
      updtNo: 1,
      updtDt: timeToString(now),
      delNo: null,
      delDt: null,
      post: {
        pstNo: 1,
      },
      parentComment: null,
      replies: [],
      creator: {
        userNo: 1,
      },
    } as SelectCommentType;
  }
}
