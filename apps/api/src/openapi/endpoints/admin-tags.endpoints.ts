import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { analyzeStatSchema } from '@/endpoints/prisma/schemas/common.schema';
import { createError, createResponse } from '@/utils';
import { CreateTagAnalyze } from '@/utils/createTagAnalyze';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminTagsEndpoints = () => {
  // GET /admin/tags/analyze/overview - 태그 분석 데이터 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/overview',
    summary: '📊 태그 분석 데이터 조회',
    description: '관리자가 태그의 종합 분석 데이터를 조회합니다. (생성/삭제/활성/매핑/구독 통계)',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.object({
        tagNo: z.coerce
          .number()
          .int()
          .positive()
          .optional()
          .openapi({
            description: '태그 번호 (선택사항 - 없으면 전체 태그)',
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
                  summary: '태그 분석 데이터 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.analyzeTag(), ]
                  ),
                },
                error: {
                  summary: '태그 분석 데이터 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // ========================================================
  // 사용량 분석 (3개)
  // ========================================================

  // GET /admin/tags/analyze/top-used - TOP N 사용 태그
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/top-used',
    summary: '📊 태그별 사용 횟수 TOP N',
    description: '관리자가 태그별 사용 횟수 TOP N을 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그별 사용 횟수 TOP N 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.topUsedTag(), ]
                  ),
                },
                error: {
                  summary: '태그별 사용 횟수 TOP N 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // GET /admin/tags/analyze/usage-trend - 사용 추이
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/usage-trend',
    summary: '📊 태그별 사용 추이',
    description: '관리자가 태그별 사용 추이를 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그별 사용 추이 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagUsageTrend(), ]
                  ),
                },
                error: {
                  summary: '태그별 사용 추이 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // GET /admin/tags/analyze/unused - 미사용 태그
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/unused',
    summary: '📊 미사용 태그 목록',
    description: '관리자가 미사용 태그 목록을 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '미사용 태그 목록 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.unusedTag(), ]
                  ),
                },
                error: {
                  summary: '미사용 태그 목록 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // ========================================================
  // 구독 분석 (3개)
  // ========================================================

  // GET /admin/tags/analyze/top-subscribers - TOP N 구독자
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/top-subscribers',
    summary: '📊 태그별 구독자 수 TOP N',
    description: '관리자가 태그별 구독자 수 TOP N을 조회합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.object({
        limit: z.coerce
          .number()
          .int()
          .positive()
          .openapi({
            description: '상위 N개',
            example: 10,
          }),
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
                  summary: '태그별 구독자 수 TOP N 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.topTagsBySubscriber(), ]
                  ),
                },
                error: {
                  summary: '태그별 구독자 수 TOP N 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // GET /admin/tags/analyze/subscriber-growth - 구독자 성장률
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/subscriber-growth',
    summary: '📊 태그별 구독자 성장률',
    description: '관리자가 태그별 구독자 성장률을 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그별 구독자 성장률 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagSubscriberGrowthRate(), ]
                  ),
                },
                error: {
                  summary: '태그별 구독자 성장률 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // GET /admin/tags/analyze/no-subscribers - 구독자 없는 태그
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/no-subscribers',
    summary: '📊 구독자 없는 태그 목록',
    description: '관리자가 구독자 없는 태그 목록을 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '구독자 없는 태그 목록 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagWithoutSubscribers(), ]
                  ),
                },
                error: {
                  summary: '구독자 없는 태그 목록 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // ========================================================
  // 효율성 분석 (3개)
  // ========================================================

  // GET /admin/tags/analyze/efficiency - 사용 효율성
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/efficiency',
    summary: '📊 태그별 사용 효율성',
    description: '관리자가 태그별 사용 효율성을 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그별 사용 효율성 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagUsageEfficiency(), ]
                  ),
                },
                error: {
                  summary: '태그별 사용 효율성 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // GET /admin/tags/analyze/frequency - 평균 사용 빈도
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/frequency',
    summary: '📊 태그별 평균 사용 빈도',
    description: '관리자가 태그별 평균 사용 빈도를 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그별 평균 사용 빈도 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagAverageUsageFrequency(), ]
                  ),
                },
                error: {
                  summary: '태그별 평균 사용 빈도 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // GET /admin/tags/analyze/lifecycle - 생명주기
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/lifecycle',
    summary: '📊 태그 생명주기 분석',
    description: '관리자가 태그 생명주기 분석을 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그 생명주기 분석 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagLifecycle(), ]
                  ),
                },
                error: {
                  summary: '태그 생명주기 분석 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // ========================================================
  // 관리 통계 (3개)
  // ========================================================

  // GET /admin/tags/analyze/status-distribution - 상태별 분포
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/status-distribution',
    summary: '📊 태그 상태별 분포',
    description: '관리자가 태그 상태별 분포를 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그 상태별 분포 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagStatusDistribution(), ]
                  ),
                },
                error: {
                  summary: '태그 상태별 분포 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // GET /admin/tags/analyze/creator-stats - 생성자별 통계
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/creator-stats',
    summary: '📊 태그 생성자별 통계',
    description: '관리자가 태그 생성자별 통계를 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그 생성자별 통계 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagCreatorStat(), ]
                  ),
                },
                error: {
                  summary: '태그 생성자별 통계 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // GET /admin/tags/analyze/cleanup - 정리 권장 목록
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/analyze/cleanup',
    summary: '📊 태그 정리 권장 목록',
    description: '관리자가 태그 정리 권장 목록을 조회합니다.',
    tags: [ 'admin-tags', ],
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
                  summary: '태그 정리 권장 목록 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS,
                    [ CreateTagAnalyze.tagCleanupRecommendation(), ]
                  ),
                },
                error: {
                  summary: '태그 정리 권장 목록 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.STATISTICS_ERROR
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

  // ========================================================
  // 태그 관리 관련 엔드포인트
  // ========================================================

  // POST /admin/tags - 태그 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags',
    summary: '🏷️ 태그 생성',
    description: '관리자가 새 태그를 생성합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              createTag: {
                summary: '태그 생성 요청',
                value: {
                  tagName: 'React',
                  tagDescription: 'React 관련 태그',
                },
              },
            },
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
                  summary: '태그 생성 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.CREATE_SUCCESS,
                    {
                      tagNo: 1,
                      tagName: 'React',
                      tagDescription: 'React 관련 태그',
                      createdAt: '2024-01-01T00:00:00.000Z',
                    }
                  ),
                },
                error: {
                  summary: '태그 생성 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.CREATE_ERROR
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

  // POST /admin/tags/multiple - 다수 태그 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/multiple',
    summary: '🏷️ 다수 태그 생성',
    description: '관리자가 여러 태그를 한 번에 생성합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              multipleCreateTag: {
                summary: '다수 태그 생성 요청',
                value: [
                  {
                    tagName: 'React',
                    tagDescription: 'React 관련 태그',
                  },
                  {
                    tagName: 'Vue',
                    tagDescription: 'Vue 관련 태그',
                  },
                ],
              },
            },
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
                  summary: '다수 태그 생성 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MULTIPLE_CREATE_SUCCESS,
                    {
                      successCount: 2,
                      failCount: 0,
                      results: [
                        {
                          success: true,
                          data: {
                            tagNo: 1,
                            tagName: 'React',
                          },
                        },
                        {
                          success: true,
                          data: {
                            tagNo: 2,
                            tagName: 'Vue',
                          },
                        },
                      ],
                    }
                  ),
                },
                error: {
                  summary: '다수 태그 생성 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MULTIPLE_CREATE_ERROR
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

  // PUT /admin/tags - 태그 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/tags',
    summary: '🏷️ 태그 수정',
    description: '관리자가 태그 정보를 수정합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              updateTag: {
                summary: '태그 수정 요청',
                value: {
                  tagNo: 1,
                  tagName: 'React.js',
                  tagDescription: 'React.js 관련 태그 (수정됨)',
                },
              },
            },
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
                  summary: '태그 수정 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.UPDATE_SUCCESS,
                    {
                      tagNo: 1,
                      tagName: 'React.js',
                      tagDescription: 'React.js 관련 태그 (수정됨)',
                      updatedAt: '2024-01-01T00:00:00.000Z',
                    }
                  ),
                },
                error: {
                  summary: '태그 수정 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.UPDATE_ERROR
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

  // PUT /admin/tags/multiple - 다수 태그 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/tags/multiple',
    summary: '🏷️ 다수 태그 수정',
    description: '관리자가 여러 태그를 한 번에 수정합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              multipleUpdateTag: {
                summary: '다수 태그 수정 요청',
                value: {
                  tagNo: 1,
                  tagName: 'React.js',
                  tagDescription: 'React.js 관련 태그 (수정됨)',
                },
              },
            },
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
                  summary: '다수 태그 수정 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MULTIPLE_UPDATE_SUCCESS,
                    {
                      successCount: 1,
                      failCount: 0,
                      results: [
                        {
                          success: true,
                          data: {
                            tagNo: 1,
                            tagName: 'React.js',
                          },
                        },
                      ],
                    }
                  ),
                },
                error: {
                  summary: '다수 태그 수정 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MULTIPLE_UPDATE_ERROR
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

  // DELETE /admin/tags - 태그 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/tags',
    summary: '🏷️ 태그 삭제',
    description: '관리자가 태그를 삭제합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              deleteTag: {
                summary: '태그 삭제 요청',
                value: {
                  tagNo: 1,
                },
              },
            },
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
                  summary: '태그 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.DELETE_SUCCESS,
                    true
                  ),
                },
                error: {
                  summary: '태그 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.DELETE_ERROR
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

  // DELETE /admin/tags/multiple - 다수 태그 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/tags/multiple',
    summary: '🏷️ 다수 태그 삭제',
    description: '관리자가 여러 태그를 한 번에 삭제합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              multipleDeleteTag: {
                summary: '다수 태그 삭제 요청',
                value: {
                  tagNo: 1,
                },
              },
            },
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
                  summary: '다수 태그 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MULTIPLE_DELETE_SUCCESS,
                    {
                      successCount: 1,
                      failCount: 0,
                      results: [
                        {
                          success: true,
                          data: { tagNo: 1, },
                        },
                      ],
                    }
                  ),
                },
                error: {
                  summary: '다수 태그 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MULTIPLE_DELETE_ERROR
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
  // 태그 매핑 관련 엔드포인트
  // ========================================================

  // GET /admin/tags/mapping/search - 태그 매핑 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/mapping/search',
    summary: '🔗 태그 매핑 조회',
    description: '관리자가 태그 매핑을 검색합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.looseObject({}),
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
                  summary: '태그 매핑 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MAPPING_SEARCH_SUCCESS,
                    {
                      list: [
                        {
                          pstNo: 1,
                          tagNo: 1,
                          postTitle: 'React 기초',
                          tagName: 'React',
                          createdAt: '2024-01-01T00:00:00.000Z',
                        },
                      ],
                      total: 1,
                      page: 1,
                      limit: 10,
                    }
                  ),
                },
                error: {
                  summary: '태그 매핑 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MAPPING_SEARCH_ERROR
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

  // GET /admin/tags/mapping/:pstNo/:tagNo - 태그 번호로 매핑 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/tags/mapping/{pstNo}/{tagNo}',
    summary: '🔗 태그 번호로 매핑 조회',
    description: '관리자가 특정 포스트와 태그의 매핑을 조회합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '포스트 번호',
          example: 1,
        }),
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '태그 매핑 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MAPPING_SEARCH_SUCCESS,
                    {
                      pstNo: 1,
                      tagNo: 1,
                      postTitle: 'React 기초',
                      tagName: 'React',
                      createdAt: '2024-01-01T00:00:00.000Z',
                    }
                  ),
                },
                error: {
                  summary: '태그 매핑 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MAPPING_SEARCH_ERROR
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

  // POST /admin/tags/mapping - 태그 매핑 추가
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/mapping',
    summary: '🔗 태그 매핑 추가',
    description: '관리자가 포스트와 태그의 매핑을 추가합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              addTagMapping: {
                summary: '태그 매핑 추가 요청',
                value: {
                  pstNo: 1,
                  tagNo: 1,
                },
              },
            },
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
                  summary: '태그 매핑 추가 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MAPPING_CREATE_SUCCESS,
                    {
                      pstNo: 1,
                      tagNo: 1,
                      postTitle: 'React 기초',
                      tagName: 'React',
                      createdAt: '2024-01-01T00:00:00.000Z',
                    }
                  ),
                },
                error: {
                  summary: '태그 매핑 추가 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MAPPING_CREATE_ERROR
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

  // POST /admin/tags/mapping/multiple - 다수 태그 매핑 추가
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/mapping/multiple',
    summary: '🔗 다수 태그 매핑 추가',
    description: '관리자가 여러 포스트와 태그의 매핑을 한 번에 추가합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              multipleAddTagMapping: {
                summary: '다수 태그 매핑 추가 요청',
                value: [
                  {
                    pstNo: 1,
                    tagNo: 1,
                  },
                  {
                    pstNo: 1,
                    tagNo: 2,
                  },
                ],
              },
            },
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
                  summary: '다수 태그 매핑 추가 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MAPPING_CREATE_SUCCESS,
                    {
                      successCount: 2,
                      failCount: 0,
                      results: [
                        {
                          success: true,
                          data: {
                            pstNo: 1,
                            tagNo: 1,
                          },
                        },
                        {
                          success: true,
                          data: {
                            pstNo: 1,
                            tagNo: 2,
                          },
                        },
                      ],
                    }
                  ),
                },
                error: {
                  summary: '다수 태그 매핑 추가 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MAPPING_CREATE_ERROR
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

  // DELETE /admin/tags/mapping - 태그 매핑 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/tags/mapping',
    summary: '🔗 태그 매핑 삭제',
    description: '관리자가 포스트와 태그의 매핑을 삭제합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              deleteTagMapping: {
                summary: '태그 매핑 삭제 요청',
                value: {
                  pstNo: 1,
                  tagNo: 1,
                },
              },
            },
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
                  summary: '태그 매핑 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MAPPING_DELETE_SUCCESS,
                    true
                  ),
                },
                error: {
                  summary: '태그 매핑 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MAPPING_DELETE_ERROR
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

  // DELETE /admin/tags/mapping/multiple - 다수 태그 매핑 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/tags/mapping/multiple',
    summary: '🔗 다수 태그 매핑 삭제',
    description: '관리자가 여러 포스트와 태그의 매핑을 한 번에 삭제합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              multipleDeleteTagMapping: {
                summary: '다수 태그 매핑 삭제 요청',
                value: {
                  pstNo: 1,
                  tagNo: 1,
                },
              },
            },
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
                  summary: '다수 태그 매핑 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.TAG.ADMIN.MAPPING_DELETE_SUCCESS,
                    {
                      successCount: 1,
                      failCount: 0,
                      results: [
                        {
                          success: true,
                          data: {
                            pstNo: 1,
                            tagNo: 1,
                          },
                        },
                      ],
                    }
                  ),
                },
                error: {
                  summary: '다수 태그 매핑 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.TAG.ADMIN.MAPPING_DELETE_ERROR
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
};
