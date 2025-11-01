import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import {
  updateCommentSchema,
  deleteCommentSchema
} from '@/endpoints/prisma/schemas/comment.schema';
import { analyzeStatSchema } from '@/endpoints/prisma/schemas/common.schema';
import { createError, createResponse } from '@/utils';
import { CreateCommentAnalyze } from '@/utils/createCommentAnalyze';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminCommentsEndpoints = () => {
  // ========================================================
  // 댓글 통계 관련 엔드포인트
  // ========================================================

  // GET /admin/comments/analyze/overview - 댓글 분석 통계
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/overview',
    summary: '📊 댓글 분석 통계',
    description: 'ADMIN 권한으로 댓글 분석 통계를 조회합니다. (전체 또는 특정 포스트)',
    tags: [ 'admin-comments', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.object({
        pstNo: z.coerce
          .number()
          .int()
          .positive()
          .optional()
          .openapi({
            description: '포스트 번호 (선택사항 - 없으면 전체 댓글)',
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '댓글 분석 통계 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.ANALYZE_SUCCESS,
                    [ CreateCommentAnalyze.analyzeComment(), ]
                  ),
                },
                error: {
                  summary: '댓글 분석 통계 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.ANALYZE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/top-posts - 포스트별 댓글 수 TOP N
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/top-posts',
    summary: '📊 포스트별 댓글 수 TOP N',
    description: 'ADMIN 권한으로 댓글 수 기준 포스트 TOP N을 조회합니다.',
    tags: [ 'admin-comments', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '포스트별 댓글 수 TOP N 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.topPostsByComment(), ]
                  ),
                },
                error: {
                  summary: '포스트별 댓글 수 TOP N 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/top-users - 사용자별 댓글 작성 수 TOP N
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/top-users',
    summary: '📊 사용자별 댓글 작성 수 TOP N',
    description: 'ADMIN 권한으로 댓글 작성 수 기준 사용자 TOP N을 조회합니다.',
    tags: [ 'admin-comments', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '사용자별 댓글 작성 수 TOP N 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.topUsersByComment(), ]
                  ),
                },
                error: {
                  summary: '사용자별 댓글 작성 수 TOP N 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/average-per-post - 평균 댓글 수 / 포스트
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/average-per-post',
    summary: '📊 평균 댓글 수 / 포스트',
    description: 'ADMIN 권한으로 포스트당 평균 댓글 수를 조회합니다.',
    tags: [ 'admin-comments', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '평균 댓글 수 / 포스트 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.averageCommentPerPost(), ]
                  ),
                },
                error: {
                  summary: '평균 댓글 수 / 포스트 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/status-distribution - 댓글 상태별 분포
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/status-distribution',
    summary: '📊 댓글 상태별 분포',
    description: 'ADMIN 권한으로 댓글 상태별 분포를 조회합니다.',
    tags: [ 'admin-comments', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses(
              {
                success: {
                  summary: '댓글 상태별 분포 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.commentStatusDistribution(), ]
                  ),
                },
                error: {
                  summary: '댓글 상태별 분포 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/approval-rate - 댓글 승인율
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/approval-rate',
    summary: '📊 댓글 승인율',
    description: 'ADMIN 권한으로 댓글 승인율을 조회합니다.',
    tags: [ 'admin-comments', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '댓글 승인율 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.commentApprovalRate(), ]
                  ),
                },
                error: {
                  summary: '댓글 승인율 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/spam-rate - 스팸 댓글 비율
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/spam-rate',
    summary: '📊 스팸 댓글 비율',
    description: 'ADMIN 권한으로 스팸 댓글 비율을 조회합니다.',
    tags: [ 'admin-comments', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '스팸 댓글 비율 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.commentSpamRate(), ]
                  ),
                },
                error: {
                  summary: '스팸 댓글 비율 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/reply-ratio - 답글 비율
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/reply-ratio',
    summary: '📊 답글 비율',
    description: 'ADMIN 권한으로 답글 비율을 조회합니다.',
    tags: [ 'admin-comments', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '답글 비율 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.commentReplyRatio(), ]
                  ),
                },
                error: {
                  summary: '답글 비율 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/average-depth - 평균 답글 깊이
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/average-depth',
    summary: '📊 평균 답글 깊이',
    description: 'ADMIN 권한으로 평균 답글 깊이를 조회합니다.',
    tags: [ 'admin-comments', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '평균 답글 깊이 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.commentAverageDepth(), ]
                  ),
                },
                error: {
                  summary: '평균 답글 깊이 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // GET /admin/comments/analyze/posts-without-comments - 댓글 없는 포스트 목록
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/comments/analyze/posts-without-comments',
    summary: '📊 댓글 없는 포스트 목록',
    description: 'ADMIN 권한으로 댓글이 없는 포스트 목록을 조회합니다.',
    tags: [ 'admin-comments', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses(
              {
                success: {
                  summary: '댓글 없는 포스트 목록 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS,
                    [ CreateCommentAnalyze.postsWithoutComments(), ]
                  ),
                },
                error: {
                  summary: '댓글 없는 포스트 목록 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true,
                hasRoles: true,
              }
            ),
          },
        },
      },
    },
  });

  // ========================================================
  // 기존 관리자 기능
  // ========================================================

  // PATCH /admin/comments/multiple - 관리자 댓글 일괄 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/comments/multiple',
    summary: '🔄 관리자 댓글 일괄 수정',
    description: 'ADMIN 권한으로 다수 댓글을 일괄 수정합니다.',
    tags: [ 'admin-comments', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
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
                  summary: '관리자 댓글 일괄 수정 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.MULTIPLE_UPDATE_SUCCESS,
                    {
                      successCnt: 3,
                      failCnt: 0,
                      failNoList: [],
                    }
                  ),
                },
                invalidStatus: {
                  summary: '유효하지 않은 댓글 상태',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.COMMENT.ADMIN.INVALID_STATUS
                  ),
                },
                contentRequired: {
                  summary: '댓글 내용은 필수',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.COMMENT.USER.CONTENT_REQUIRED
                  ),
                },
                contentTooLong: {
                  summary: '댓글 내용이 너무 김',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.COMMENT.USER.CONTENT_TOO_LONG
                  ),
                },
                error: {
                  summary: '관리자 댓글 일괄 수정 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.MULTIPLE_UPDATE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
                hasRoles: true, // 권한 사용
              }
            ),
          },
        },
      },
    },
  });

  // DELETE /admin/comments/multiple - 관리자 댓글 일괄 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/comments/multiple',
    summary: '🗑️ 관리자 댓글 일괄 삭제',
    description: 'ADMIN 권한으로 다수 댓글을 일괄 삭제합니다.',
    tags: [ 'admin-comments', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
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
                  summary: '관리자 댓글 일괄 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.COMMENT.ADMIN.MULTIPLE_DELETE_SUCCESS,
                    {
                      successCnt: 3,
                      failCnt: 0,
                      failNoList: [],
                    }
                  ),
                },
                error: {
                  summary: '관리자 댓글 일괄 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.COMMENT.ADMIN.MULTIPLE_DELETE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
                hasRoles: true, // 권한 사용
              }
            ),
          },
        },
      },
    },
  });
};
