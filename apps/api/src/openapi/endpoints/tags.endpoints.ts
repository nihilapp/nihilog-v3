import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { searchTagSchema } from '@/endpoints/prisma/schemas/tag.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerTagsEndpoints = () => {
  // GET /tags/search - 태그 목록 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/tags/search',
    summary: '🏷️ 태그 목록 조회',
    description: '전체 태그 목록을 조회합니다. 인기도순/알파벳순 정렬, 사용 횟수 포함',
    tags: [ 'tags', ],
    request: {
      query: searchTagSchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '태그 목록 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.USER.SEARCH_SUCCESS, CreateExample.tag('list')),
              },
              error: {
                summary: '태그 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.USER.SEARCH_ERROR),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // GET /tags/{tagNo} - 태그 상세 조회 (번호)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/tags/{tagNo}',
    summary: '🏷️ 태그 상세 조회',
    description: '특정 태그의 상세 정보를 조회합니다. 태그된 포스트 목록, 관련 태그 추천 포함',
    tags: [ 'tags', ],
    request: {
      params: z.object({
        tagNo: z.coerce.number().int().positive().openapi({
          description: '태그 번호',
          example: 1,
        }),
      }),
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '태그 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.USER.GET_SUCCESS, CreateExample.tag('detail')),
              },
              notFound: {
                summary: '태그를 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.TAG.USER.NOT_FOUND),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // GET /tags/name/{name} - 태그명으로 태그 검색
  openApiRegistry.registerPath({
    method: 'get',
    path: '/tags/name/{name}',
    summary: '🔍 태그명으로 검색',
    description: '태그명으로 태그를 검색합니다. 자동완성 기능, 유사 태그 제안',
    tags: [ 'tags', ],
    request: {
      params: z.object({
        name: z.string().openapi({
          description: '태그명',
          example: 'JavaScript',
        }),
      }),
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '태그 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.USER.GET_BY_NAME_SUCCESS, CreateExample.tag('detail')),
              },
              notFound: {
                summary: '태그를 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.TAG.USER.NAME_NOT_FOUND),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });
};
