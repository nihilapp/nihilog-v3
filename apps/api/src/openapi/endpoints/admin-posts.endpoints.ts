import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { createPostSchema, updatePostSchema, deletePostSchema, analyzeStatSchema } from '@/endpoints/prisma/schemas/post.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminPostsEndpoints = () => {
  // POST /admin/posts/analyze - 게시글 분석 데이터 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts/analyze',
    summary: '📊 게시글 분석 데이터 조회',
    description: '관리자가 게시글의 종합 분석 데이터를 조회합니다. (발행/수정/삭제/조회/북마크/공유/댓글 수)',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.object({
        pstNo: z.coerce
          .number()
          .int()
          .positive()
          .optional()
          .openapi({
            description: '게시글 번호 (선택사항 - 없으면 전체 게시글)',
            example: 1,
          }),
      }),
      body: {
        content: {
          'application/json': {
            schema: analyzeStatSchema,
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
            examples: addGlobalResponses({
              success: {
                summary: '게시글 분석 데이터 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [ CreateExample.analyzePost(), ]),
              },
              error: {
                summary: '게시글 분석 데이터 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // POST /admin/posts/shares/{pstNo?} - 플랫폼별 공유 통계 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts/shares/{pstNo?}',
    summary: '📊 플랫폼별 공유 통계 조회',
    description: '관리자가 플랫폼별 공유 통계를 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce
          .number()
          .int()
          .positive()
          .optional()
          .openapi({
            description: '게시글 번호 (선택사항 - 없으면 전체 게시글)',
            example: 1,
          }),
      }),
      body: {
        content: {
          'application/json': {
            schema: analyzeStatSchema,
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
            examples: addGlobalResponses({
              success: {
                summary: '플랫폼별 공유 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [
                  { platform: 'facebook', count: 100, },
                  { platform: 'twitter', count: 50, },
                ]),
              },
              error: {
                summary: '플랫폼별 공유 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // POST /admin/posts/average-views - 게시글별 평균 조회수 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts/average-views',
    summary: '📊 게시글별 평균 조회수 조회 (시간대별)',
    description: '관리자가 시간대별 게시글 평균 조회수를 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: analyzeStatSchema,
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
            examples: addGlobalResponses({
              success: {
                summary: '게시글별 평균 조회수 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [
                  {
                    dateStart: '2025-01-01T00:00:00Z',
                    dateEnd: '2025-01-02T00:00:00Z',
                    avgViewCount: 15.5,
                  },
                  {
                    dateStart: '2025-01-02T00:00:00Z',
                    dateEnd: '2025-01-03T00:00:00Z',
                    avgViewCount: 22.3,
                  },
                ]),
              },
              error: {
                summary: '게시글별 평균 조회수 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // POST /admin/posts - 새 게시글 작성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts',
    summary: '✍️ 새 게시글 작성',
    description: '관리자가 새 게시글을 작성합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createPostSchema,
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
            examples: addGlobalResponses({
              success: {
                summary: '새 게시글 작성 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.CREATE_SUCCESS, CreateExample.post('detail')),
              },
              error: {
                summary: '새 게시글 작성 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.CREATE_ERROR),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // PUT /admin/posts/{pstNo} - 게시글 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/posts/{pstNo}',
    summary: '✏️ 게시글 수정',
    description: '관리자가 게시글을 수정합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce
          .number()
          .int()
          .positive()
          .openapi({
            description: '게시글 번호',
            example: 1,
          }),
      }),
      body: {
        content: {
          'application/json': {
            schema: updatePostSchema,
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
            examples: addGlobalResponses({
              success: {
                summary: '게시글 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.UPDATE_SUCCESS, CreateExample.post('detail')),
              },
              error: {
                summary: '게시글 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.UPDATE_ERROR),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // PUT /admin/posts/multiple - 다수 게시글 일괄 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/posts/multiple',
    summary: '✏️ 다수 게시글 일괄 수정',
    description: '관리자가 다수 게시글을 일괄 수정합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updatePostSchema,
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 게시글 일괄 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.UPDATE_SUCCESS, {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 게시글 일괄 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.UPDATE_ERROR),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // DELETE /admin/posts/{pstNo} - 게시글 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/posts/{pstNo}',
    summary: '🗑️ 게시글 삭제',
    description: '관리자가 게시글을 삭제합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce
          .number()
          .int()
          .positive()
          .openapi({
            description: '게시글 번호',
            example: 1,
          }),
      }),
      body: {
        content: {
          'application/json': {
            schema: deletePostSchema,
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
            examples: addGlobalResponses({
              success: {
                summary: '게시글 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.DELETE_SUCCESS, true),
              },
              error: {
                summary: '게시글 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.DELETE_ERROR),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // DELETE /admin/posts/multiple - 다수 게시글 일괄 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/posts/multiple',
    summary: '🗑️ 다수 게시글 일괄 삭제',
    description: '관리자가 다수 게시글을 일괄 삭제합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deletePostSchema,
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
            examples: addGlobalResponses({
              success: {
                summary: '다수 게시글 일괄 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.DELETE_SUCCESS, {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 게시글 일괄 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.DELETE_ERROR),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });
};
