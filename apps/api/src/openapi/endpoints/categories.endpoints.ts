import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { searchCategorySchema } from '@/endpoints/prisma/schemas/category.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerCategoriesEndpoints = () => {
  // GET /categories/search - 카테고리 목록 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/categories/search',
    summary: '📁 카테고리 목록 조회',
    description: '전체 카테고리 목록을 조회합니다. 계층 구조 표시, 포스트 수 포함, 정렬순 적용',
    tags: [ 'categories', ],
    request: {
      query: searchCategorySchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '카테고리 목록 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  MESSAGE.CATEGORY.USER.SEARCH_SUCCESS,
                  CreateExample.category('list')
                ),
              },
              validationError: {
                summary: '요청 데이터 유효성 검증 실패',
                value: createError(
                  'BAD_REQUEST',
                  MESSAGE.COMMON.INVALID_REQUEST
                ),
              },
              error: {
                summary: '카테고리 목록 조회 실패',
                value: createError(
                  'INTERNAL_SERVER_ERROR',
                  MESSAGE.CATEGORY.USER.SEARCH_ERROR
                ),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // GET /categories/{ctgryNo} - 카테고리 상세 조회 (번호)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/categories/{ctgryNo}',
    summary: '📁 카테고리 상세 조회',
    description: '특정 카테고리의 상세 정보를 조회합니다. 하위 카테고리 포함, 포스트 목록',
    tags: [ 'categories', ],
    request: {
      params: z.object({
        ctgryNo: z.coerce.number().int().positive().openapi({
          description: '카테고리 번호',
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
                summary: '카테고리 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  MESSAGE.CATEGORY.USER.GET_SUCCESS,
                  CreateExample.category('detail')
                ),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음',
                value: createError(
                  'NOT_FOUND',
                  MESSAGE.CATEGORY.USER.NOT_FOUND
                ),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // GET /categories/name/{name} - 카테고리명으로 카테고리 검색
  openApiRegistry.registerPath({
    method: 'get',
    path: '/categories/name/{name}',
    summary: '🔍 카테고리명으로 검색',
    description: '카테고리명으로 카테고리를 검색합니다. 유사 이름 카테고리 제안',
    tags: [ 'categories', ],
    request: {
      params: z.object({
        name: z.string().openapi({
          description: '카테고리명',
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
                summary: '카테고리 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  MESSAGE.CATEGORY.USER.GET_BY_NAME_SUCCESS,
                  CreateExample.category('detail')
                ),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음',
                value: createError(
                  'NOT_FOUND',
                  MESSAGE.CATEGORY.USER.NAME_NOT_FOUND
                ),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });
};
