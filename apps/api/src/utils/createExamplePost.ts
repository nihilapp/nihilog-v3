import { DateTime } from 'luxon';

import { PostInfoType } from '@/endpoints/prisma/schemas/post.schema';

import { timeToString } from './timeHelper';

/**
 * @description 게시글 예시 데이터.
 */
export function createExamplePost(type: 'list' | 'detail' = 'detail') {
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
    pstTtl: '첫 번째 게시글입니다',
    pstSmry: '이것은 첫 번째 게시글의 요약입니다.',
    pstMtxt: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '안녕하세요! 이것은 첫 번째 게시글의 본문입니다. 다양한 내용을 포함하고 있습니다.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '마크다운 형식으로 작성된 내용을 JSON 형태로 저장합니다.',
            },
          ],
        },
      ],
    },
    pstCd: 'first-post',
    pstThmbLink: 'https://example.com/thumbnail.jpg',
    pstView: 0,
    pstStts: 'FINISHED',
    publDt: timeToString(now),
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
  } as PostInfoType;
}
