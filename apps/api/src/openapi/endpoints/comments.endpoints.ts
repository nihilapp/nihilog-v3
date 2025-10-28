import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import {
  searchCommentSchema,
  createCommentSchema,
  updateCommentSchema,
  deleteCommentSchema
} from '@/endpoints/prisma/schemas/comment.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerCommentsEndpoints = () => {
  // GET /comments - 댓글 목록 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/comments',
    summary: '💬 댓글 목록 조회',
    description: '댓글 목록을 조회합니다.',
    tags: [ 'comments', ],
    request: {
      query: searchCommentSchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '댓글 목록 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  MESSAGE.COMMENT.USER.SEARCH_SUCCESS,
                  [ CreateExample.comment('list'), ]
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
                summary: '댓글 목록 조회 실패',
                value: createError(
                  'INTERNAL_SERVER_ERROR',
                  MESSAGE.COMMENT.USER.SEARCH_ERROR
                ),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // GET /comments/{cmntNo} - 댓글 상세 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/comments/{cmntNo}',
    summary: '💬 댓글 상세 조회',
    description: '댓글을 상세 조회합니다.',
    tags: [ 'comments', ],
    request: {
      params: z.object({
        cmntNo: z.coerce.number().int().positive().openapi({
          description: '댓글 번호',
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
                summary: '댓글 상세 조회 성공',
                value: createResponse(
                  'SUCCESS',
                  MESSAGE.COMMENT.USER.GET_SUCCESS,
                  CreateExample.comment('detail')
                ),
              },
              error: {
                summary: '댓글 상세 조회 실패',
                value: createError(
                  'INTERNAL_SERVER_ERROR',
                  MESSAGE.COMMENT.USER.GET_ERROR
                ),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // POST /comments - 댓글 작성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/comments',
    summary: '✏️ 댓글 작성',
    description: '새로운 댓글을 작성합니다.',
    tags: [ 'comments', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createCommentSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses(
              {
                success: {
                  summary: '댓글 작성 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.USER.CREATE_SUCCESS,
                    CreateExample.comment('detail')
                  ),
                },
                error: {
                  summary: '댓글 작성 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.USER.CREATE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
              }
            ),
          },
        },
      },
    },
  });

  // PUT /comments/{cmntNo} - 댓글 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/comments/{cmntNo}',
    summary: '🔄 댓글 수정',
    description: '댓글을 수정합니다.',
    tags: [ 'comments', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        cmntNo: z.coerce.number().int().positive().openapi({
          description: '댓글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: updateCommentSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses(
              {
                success: {
                  summary: '댓글 수정 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.USER.UPDATE_SUCCESS,
                    CreateExample.comment('detail')
                  ),
                },
                error: {
                  summary: '댓글 수정 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.USER.UPDATE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
              }
            ),
          },
        },
      },
    },
  });

  // DELETE /comments/{cmntNo} - 댓글 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/comments/{cmntNo}',
    summary: '🗑️ 댓글 삭제',
    description: '댓글을 삭제합니다.',
    tags: [ 'comments', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        cmntNo: z.coerce.number().int().positive().openapi({
          description: '댓글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: deleteCommentSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses(
              {
                success: {
                  summary: '댓글 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.USER.DELETE_SUCCESS,
                    true
                  ),
                },
                error: {
                  summary: '댓글 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.USER.DELETE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
              }
            ),
          },
        },
      },
    },
  });
};
