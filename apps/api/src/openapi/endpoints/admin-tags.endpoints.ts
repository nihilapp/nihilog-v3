import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { analyzeStatSchema } from '@/endpoints/prisma/schemas/common.schema';
import { createError, createResponse } from '@/utils';
import { CreateTagAnalyze } from '@/utils/createTagAnalyze';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminTagsEndpoints = () => {
  // POST /admin/tags/analyze/overview - 태그 분석 데이터 조회
  openApiRegistry.registerPath({
    method: 'post',
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
                summary: '태그 분석 데이터 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.analyzeTag(), ]),
              },
              error: {
                summary: '태그 분석 데이터 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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

  // ========================================================
  // 사용량 분석 (3개)
  // ========================================================

  // POST /admin/tags/analyze/top-used - TOP N 사용 태그
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/analyze/top-used',
    summary: '📊 태그별 사용 횟수 TOP N',
    description: '관리자가 태그별 사용 횟수 TOP N을 조회합니다.',
    tags: [ 'admin-tags', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              limit: z.number().int().positive().openapi({
                description: '상위 N개',
                example: 10,
              }),
              analyzeStatData: analyzeStatSchema.optional().openapi({
                description: '분석 통계 데이터 (선택사항)',
              }),
            }),
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
                summary: '태그별 사용 횟수 TOP N 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.topUsedTag(), ]),
              },
              error: {
                summary: '태그별 사용 횟수 TOP N 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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

  // POST /admin/tags/analyze/usage-trend - 사용 추이
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/analyze/usage-trend',
    summary: '📊 태그별 사용 추이',
    description: '관리자가 태그별 사용 추이를 조회합니다.',
    tags: [ 'admin-tags', ],
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
                summary: '태그별 사용 추이 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagUsageTrend(), ]),
              },
              error: {
                summary: '태그별 사용 추이 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
            examples: addGlobalResponses({
              success: {
                summary: '미사용 태그 목록 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.unusedTag(), ]),
              },
              error: {
                summary: '미사용 태그 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
            examples: addGlobalResponses({
              success: {
                summary: '태그별 구독자 수 TOP N 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.topTagsBySubscriber(), ]),
              },
              error: {
                summary: '태그별 구독자 수 TOP N 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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

  // POST /admin/tags/analyze/subscriber-growth - 구독자 성장률
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/analyze/subscriber-growth',
    summary: '📊 태그별 구독자 성장률',
    description: '관리자가 태그별 구독자 성장률을 조회합니다.',
    tags: [ 'admin-tags', ],
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
                summary: '태그별 구독자 성장률 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagSubscriberGrowthRate(), ]),
              },
              error: {
                summary: '태그별 구독자 성장률 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
            examples: addGlobalResponses({
              success: {
                summary: '구독자 없는 태그 목록 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagWithoutSubscribers(), ]),
              },
              error: {
                summary: '구독자 없는 태그 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
            examples: addGlobalResponses({
              success: {
                summary: '태그별 사용 효율성 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagUsageEfficiency(), ]),
              },
              error: {
                summary: '태그별 사용 효율성 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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

  // POST /admin/tags/analyze/frequency - 평균 사용 빈도
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/tags/analyze/frequency',
    summary: '📊 태그별 평균 사용 빈도',
    description: '관리자가 태그별 평균 사용 빈도를 조회합니다.',
    tags: [ 'admin-tags', ],
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
                summary: '태그별 평균 사용 빈도 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagAverageUsageFrequency(), ]),
              },
              error: {
                summary: '태그별 평균 사용 빈도 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
            examples: addGlobalResponses({
              success: {
                summary: '태그 생명주기 분석 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagLifecycle(), ]),
              },
              error: {
                summary: '태그 생명주기 분석 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
            examples: addGlobalResponses({
              success: {
                summary: '태그 상태별 분포 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagStatusDistribution(), ]),
              },
              error: {
                summary: '태그 상태별 분포 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
            examples: addGlobalResponses({
              success: {
                summary: '태그 생성자별 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagCreatorStat(), ]),
              },
              error: {
                summary: '태그 생성자별 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
            examples: addGlobalResponses({
              success: {
                summary: '태그 정리 권장 목록 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.TAG.ADMIN.STATISTICS_SUCCESS, [ CreateTagAnalyze.tagCleanupRecommendation(), ]),
              },
              error: {
                summary: '태그 정리 권장 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.TAG.ADMIN.STATISTICS_ERROR),
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
