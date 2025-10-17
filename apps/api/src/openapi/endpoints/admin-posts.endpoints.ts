import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { analyzeStatSchema } from '@/endpoints/prisma/schemas/common.schema';
import { createPostSchema, updatePostSchema, deletePostSchema } from '@/endpoints/prisma/schemas/post.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';
import { CreatePostAnalyze } from '@/utils/createPostAnalyze';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminPostsEndpoints = () => {
  // GET /admin/posts/analyze/overview - 포스트 분석 데이터 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/posts/analyze/overview',
    summary: '📊 포스트 분석 데이터 조회',
    description: '관리자가 포스트의 종합 분석 데이터를 조회합니다. (발행/수정/삭제/조회/북마크/공유/댓글 수)',
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
            description: '포스트 번호 (선택사항 - 없으면 전체 포스트)',
            example: 1,
          }),
        ...analyzeStatSchema.shape,
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
                summary: '포스트 분석 데이터 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [ CreatePostAnalyze.analyzePost(), ]),
              },
              error: {
                summary: '포스트 분석 데이터 조회 실패',
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

  // GET /admin/posts/analyze/shares - 플랫폼별 공유 통계 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/posts/analyze/shares',
    summary: '📊 플랫폼별 공유 통계 조회',
    description: '관리자가 플랫폼별 공유 통계를 조회합니다.',
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
            description: '포스트 번호 (선택사항 - 없으면 전체 포스트)',
            example: 1,
          }),
        ...analyzeStatSchema.shape,
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
                summary: '플랫폼별 공유 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [ CreatePostAnalyze.sharePlatformStat(), ]),
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

  // GET /admin/posts/analyze/average-views - 포스트별 평균 조회수 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/posts/analyze/average-views',
    summary: '📊 포스트별 평균 조회수 조회 (시간대별)',
    description: '관리자가 시간대별 포스트 평균 조회수를 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: analyzeStatSchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '포스트별 평균 조회수 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [ CreatePostAnalyze.averageViewStat(), ]),
              },
              error: {
                summary: '포스트별 평균 조회수 조회 실패',
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

  // GET /admin/posts/analyze/average-bookmarks - 포스트당 평균 북마크 수 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/posts/analyze/average-bookmarks',
    summary: '📊 포스트당 평균 북마크 수 조회 (시간대별)',
    description: '관리자가 시간대별 포스트당 평균 북마크 수를 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: analyzeStatSchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '포스트당 평균 북마크 수 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [ CreatePostAnalyze.averageBookmarkStat(), ]),
              },
              error: {
                summary: '포스트당 평균 북마크 수 조회 실패',
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

  // GET /admin/posts/analyze/top-popular - 인기 포스트 TOP N
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/posts/analyze/top-popular',
    summary: '📊 인기 포스트 TOP N (조회수 기준)',
    description: '관리자가 조회수 기준 인기 포스트 TOP N을 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: analyzeStatSchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '인기 포스트 TOP N 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [ CreatePostAnalyze.topPopularPost(), ]),
              },
              error: {
                summary: '인기 포스트 TOP N 조회 실패',
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

  // GET /admin/posts/analyze/top-comments - 댓글 많은 포스트 TOP N
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/posts/analyze/top-comments',
    summary: '📊 댓글 많은 포스트 TOP N',
    description: '관리자가 댓글 수 기준 포스트 TOP N을 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: analyzeStatSchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '댓글 많은 포스트 TOP N 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [ CreatePostAnalyze.topCommentPost(), ]),
              },
              error: {
                summary: '댓글 많은 포스트 TOP N 조회 실패',
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

  // GET /admin/posts/analyze/status-ratio - 포스트 상태 비율 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/posts/analyze/status-ratio',
    summary: '📊 포스트 상태 비율 조회',
    description: '관리자가 포스트 상태별 비율을 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: analyzeStatSchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '포스트 상태 비율 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [ CreatePostAnalyze.postStatusRatio(), ]),
              },
              error: {
                summary: '포스트 상태 비율 조회 실패',
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

  // POST /admin/posts - 새 포스트 작성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts',
    summary: '✍️ 새 포스트 작성',
    description: '관리자가 새 포스트를 작성합니다.',
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
                summary: '새 포스트 작성 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.CREATE_SUCCESS, CreateExample.post('detail')),
              },
              error: {
                summary: '새 포스트 작성 실패',
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

  // PUT /admin/posts/{pstNo} - 포스트 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/posts/{pstNo}',
    summary: '✏️ 포스트 수정',
    description: '관리자가 포스트를 수정합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce
          .number()
          .int()
          .positive()
          .openapi({
            description: '포스트 번호',
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
                summary: '포스트 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.UPDATE_SUCCESS, CreateExample.post('detail')),
              },
              error: {
                summary: '포스트 수정 실패',
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

  // PUT /admin/posts/multiple - 다수 포스트 일괄 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/posts/multiple',
    summary: '✏️ 다수 포스트 일괄 수정',
    description: '관리자가 다수 포스트를 일괄 수정합니다.',
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
                summary: '다수 포스트 일괄 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.UPDATE_SUCCESS, {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 포스트 일괄 수정 실패',
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

  // DELETE /admin/posts/{pstNo} - 포스트 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/posts/{pstNo}',
    summary: '🗑️ 포스트 삭제',
    description: '관리자가 포스트를 삭제합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce
          .number()
          .int()
          .positive()
          .openapi({
            description: '포스트 번호',
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
                summary: '포스트 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.DELETE_SUCCESS, true),
              },
              error: {
                summary: '포스트 삭제 실패',
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

  // DELETE /admin/posts/multiple - 다수 포스트 일괄 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/posts/multiple',
    summary: '🗑️ 다수 포스트 일괄 삭제',
    description: '관리자가 다수 포스트를 일괄 삭제합니다.',
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
                summary: '다수 포스트 일괄 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.DELETE_SUCCESS, {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 포스트 일괄 삭제 실패',
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
