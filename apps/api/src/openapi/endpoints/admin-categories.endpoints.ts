import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  searchCategorySchema
} from '@/endpoints/prisma/schemas/category.schema';
import { analyzeStatSchema } from '@/endpoints/prisma/schemas/common.schema';
import { createError, createResponse } from '@/utils';
import { CreateCategoryAnalyze } from '@/utils/createCategoryAnalyze';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminCategoriesEndpoints = () => {
  // ========================================================
  // 카테고리 통계 관련 엔드포인트
  // ========================================================

  // POST /admin/categories/analyze - 카테고리 분석 통계
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories/analyze',
    summary: '📊 카테고리 분석 통계',
    description: 'ADMIN 권한으로 카테고리 분석 통계를 조회합니다. (전체 또는 개별 카테고리)',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.object({
        ctgryNo: z.coerce
          .number()
          .int()
          .positive()
          .optional()
          .openapi({
            description: '카테고리 번호 (선택사항 - 없으면 전체 카테고리)',
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
                summary: '카테고리 분석 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.ANALYZE_SUCCESS, [ CreateCategoryAnalyze.analyzeCategory(), ]),
              },
              error: {
                summary: '카테고리 분석 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.ANALYZE_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // POST /admin/categories/statistics/popular-index - 카테고리별 인기 지수 TOP N
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories/statistics/popular-index',
    summary: '📊 카테고리별 인기 지수 TOP N',
    description: 'ADMIN 권한으로 인기 지수 기준 카테고리 TOP N을 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.object({
        limit: z.coerce
          .number()
          .int()
          .positive()
          .optional()
          .openapi({
            description: '상위 N개 (기본값: 10)',
            example: 10,
          }),
      }),
      body: {
        content: {
          'application/json': {
            schema: analyzeStatSchema.optional(),
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
                summary: '인기 카테고리 TOP N 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.topPopularCategory(), ]),
              },
              error: {
                summary: '인기 카테고리 TOP N 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // GET /admin/categories/statistics/top-subscribers - 구독자 많은 카테고리 TOP N
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/statistics/top-subscribers',
    summary: '📊 구독자 많은 카테고리 TOP N',
    description: 'ADMIN 권한으로 구독자 수 기준 카테고리 TOP N을 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.object({
        limit: z.coerce
          .number()
          .int()
          .positive()
          .optional()
          .openapi({
            description: '상위 N개 (기본값: 10)',
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
                summary: '구독자 많은 카테고리 TOP N 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.topCategoryBySubscriber(), ]),
              },
              error: {
                summary: '구독자 많은 카테고리 TOP N 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // POST /admin/categories/statistics/average-bookmarks - 평균 북마크 수 / 카테고리
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories/statistics/average-bookmarks',
    summary: '📊 평균 북마크 수 / 카테고리 (시간대별)',
    description: 'ADMIN 권한으로 시간대별 카테고리당 평균 북마크 수를 조회합니다.',
    tags: [ 'admin-categories', ],
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
                summary: '평균 북마크 수 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.averageBookmarkPerCategory(), ]),
              },
              error: {
                summary: '평균 북마크 수 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // POST /admin/categories/statistics/average-views - 카테고리별 평균 조회수
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories/statistics/average-views',
    summary: '📊 카테고리별 평균 조회수 (시간대별)',
    description: 'ADMIN 권한으로 시간대별 카테고리당 평균 조회수를 조회합니다.',
    tags: [ 'admin-categories', ],
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
                summary: '평균 조회수 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.averageViewPerCategory(), ]),
              },
              error: {
                summary: '평균 조회수 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // GET /admin/categories/statistics/hierarchy-distribution - 계층별 카테고리 분포
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/statistics/hierarchy-distribution',
    summary: '📊 계층별 카테고리 분포',
    description: 'ADMIN 권한으로 계층별 카테고리 분포를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '계층별 카테고리 분포 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.categoryHierarchyDistribution(), ]),
              },
              error: {
                summary: '계층별 카테고리 분포 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // GET /admin/categories/statistics/hierarchy-posts - 계층별 게시글 분포
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/statistics/hierarchy-posts',
    summary: '📊 계층별 게시글 분포',
    description: 'ADMIN 권한으로 계층별 게시글 분포를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '계층별 게시글 분포 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.categoryHierarchyPostDistribution(), ]),
              },
              error: {
                summary: '계층별 게시글 분포 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // GET /admin/categories/statistics/hierarchy-subscribers - 계층별 구독자 분포
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/statistics/hierarchy-subscribers',
    summary: '📊 계층별 구독자 분포',
    description: 'ADMIN 권한으로 계층별 구독자 분포를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '계층별 구독자 분포 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.categoryHierarchySubscriberDistribution(), ]),
              },
              error: {
                summary: '계층별 구독자 분포 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // GET /admin/categories/statistics/status-distribution - 카테고리 상태별 분포
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/statistics/status-distribution',
    summary: '📊 카테고리 상태별 분포',
    description: 'ADMIN 권한으로 카테고리 상태별 분포를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '카테고리 상태별 분포 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.categoryStatusDistribution(), ]),
              },
              error: {
                summary: '카테고리 상태별 분포 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // GET /admin/categories/statistics/creator-stats - 카테고리 생성자별 통계
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/statistics/creator-stats',
    summary: '📊 카테고리 생성자별 통계',
    description: 'ADMIN 권한으로 생성자별 카테고리 통계를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '생성자별 카테고리 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.categoryCreatorStat(), ]),
              },
              error: {
                summary: '생성자별 카테고리 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // GET /admin/categories/statistics/unused - 미사용 카테고리 목록
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/statistics/unused',
    summary: '📊 미사용 카테고리 목록',
    description: 'ADMIN 권한으로 게시글이 없는 미사용 카테고리 목록을 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '미사용 카테고리 목록 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS, [ CreateCategoryAnalyze.unusedCategory(), ]),
              },
              error: {
                summary: '미사용 카테고리 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR),
              },
            }, {
              hasAuthGuard: true,
              hasRoles: true,
            }),
          },
        },
      },
    },
  });

  // ========================================================
  // 카테고리 CRUD 엔드포인트
  // ========================================================

  // POST /admin/categories/search - 카테고리 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories/search',
    summary: '📁 관리자 카테고리 목록 조회',
    description: 'ADMIN 권한으로 카테고리 목록을 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchCategorySchema,
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
                summary: '카테고리 목록 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.SEARCH_SUCCESS, CreateExample.category('list')),
              },
              error: {
                summary: '카테고리 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.SEARCH_ERROR),
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

  // GET /admin/categories/{ctgryNo} - 카테고리 상세 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/{ctgryNo}',
    summary: '📁 관리자 카테고리 상세 조회',
    description: 'ADMIN 권한으로 특정 카테고리의 상세 정보를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
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
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.GET_SUCCESS, CreateExample.category('detail')),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.CATEGORY.ADMIN.NOT_FOUND),
              },
              error: {
                summary: '카테고리 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.GET_ERROR),
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

  // GET /admin/categories/name/{name} - 카테고리명으로 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/categories/name/{name}',
    summary: '🔍 관리자 카테고리명으로 조회',
    description: 'ADMIN 권한으로 카테고리명으로 카테고리를 조회합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
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
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.GET_BY_NAME_SUCCESS, CreateExample.category('detail')),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.CATEGORY.ADMIN.NAME_NOT_FOUND),
              },
              error: {
                summary: '카테고리 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.GET_BY_NAME_ERROR),
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

  // POST /admin/categories - 카테고리 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories',
    summary: '📁 카테고리 생성',
    description: 'ADMIN 권한으로 새로운 카테고리를 생성합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createCategorySchema,
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
                summary: '카테고리 생성 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.CREATE_SUCCESS, CreateExample.category('detail')),
              },
              conflict: {
                summary: '카테고리 이름 중복',
                value: createError('CONFLICT', MESSAGE.CATEGORY.ADMIN.NAME_IN_USE),
              },
              error: {
                summary: '카테고리 생성 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.CREATE_ERROR),
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

  // POST /admin/categories/multiple - 다수 카테고리 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/categories/multiple',
    summary: '📁 다수 카테고리 생성',
    description: 'ADMIN 권한으로 다수 카테고리를 일괄 생성합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.array(createCategorySchema),
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
                summary: '다수 카테고리 생성 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.MULTIPLE_CREATE_SUCCESS, {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 카테고리 생성 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.MULTIPLE_CREATE_ERROR),
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

  // PATCH /admin/categories/{ctgryNo} - 카테고리 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/categories/{ctgryNo}',
    summary: '📁 카테고리 수정',
    description: 'ADMIN 권한으로 카테고리 정보를 수정합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        ctgryNo: z.coerce.number().int().positive().openapi({
          description: '카테고리 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: updateCategorySchema,
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
                summary: '카테고리 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.UPDATE_SUCCESS, CreateExample.category('detail')),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.CATEGORY.ADMIN.NOT_FOUND),
              },
              error: {
                summary: '카테고리 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.UPDATE_ERROR),
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

  // PATCH /admin/categories/multiple - 다수 카테고리 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/categories/multiple',
    summary: '📁 다수 카테고리 수정',
    description: 'ADMIN 권한으로 다수 카테고리를 일괄 수정합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateCategorySchema.extend({
              ctgryNoList: z.array(z.number().int().positive()).openapi({
                description: '수정할 카테고리 번호 목록',
                example: [ 1, 2, 3, ],
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
                summary: '다수 카테고리 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.MULTIPLE_UPDATE_SUCCESS, {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 카테고리 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.MULTIPLE_UPDATE_ERROR),
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

  // DELETE /admin/categories/{ctgryNo} - 카테고리 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/categories/{ctgryNo}',
    summary: '📁 카테고리 삭제',
    description: 'ADMIN 권한으로 카테고리를 삭제합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
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
                summary: '카테고리 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.DELETE_SUCCESS, true),
              },
              notFound: {
                summary: '카테고리를 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.CATEGORY.ADMIN.NOT_FOUND),
              },
              error: {
                summary: '카테고리 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.DELETE_ERROR),
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

  // DELETE /admin/categories/multiple - 다수 카테고리 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/categories/multiple',
    summary: '📁 다수 카테고리 삭제',
    description: 'ADMIN 권한으로 다수 카테고리를 일괄 삭제합니다.',
    tags: [ 'admin-categories', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteCategorySchema,
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
                summary: '다수 카테고리 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.CATEGORY.ADMIN.MULTIPLE_DELETE_SUCCESS, {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 카테고리 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.CATEGORY.ADMIN.MULTIPLE_DELETE_ERROR),
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
