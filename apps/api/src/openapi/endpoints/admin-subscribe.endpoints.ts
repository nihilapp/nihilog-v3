import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { analyzeStatSchema } from '@/endpoints/prisma/schemas/common.schema';
import { searchSubscribeSchema, createSubscribeSchema, updateSubscribeSchema, deleteSubscribeSchema } from '@/endpoints/prisma/schemas/subscribe.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';
import { CreateSubscribeAnalyze } from '@/utils/createSubscribeAnalyze';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminSubscribeEndpoints = () => {
  // ========================================================
  // 구독 설정 통계 관련 엔드포인트
  // ========================================================

  // GET /admin/subscribes/analyze/overview - 구독 설정 분석 통계
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/subscribes/analyze/overview',
    summary: '📊 구독 설정 분석 통계',
    description: 'ADMIN 권한으로 구독 설정 분석 통계를 조회합니다.',
    tags: [ 'admin-subscribe', ],
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
                summary: '구독 설정 분석 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.ANALYZE_SUCCESS, [
                  CreateSubscribeAnalyze.analyzeSubscribe(),
                ]),
              },
              error: {
                summary: '구독 설정 분석 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.SUBSCRIBE.ADMIN.ANALYZE_ERROR),
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

  // GET /admin/subscribes/analyze/notification-distribution - 알림 설정별 분포 통계
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/subscribes/analyze/notification-distribution',
    summary: '📊 알림 설정별 분포 통계',
    description: 'ADMIN 권한으로 알림 설정별 분포 통계를 조회합니다.',
    tags: [ 'admin-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '알림 설정별 분포 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_SUCCESS, [
                  CreateSubscribeAnalyze.subscribeNotificationDistribution(),
                ]),
              },
              error: {
                summary: '알림 설정별 분포 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_ERROR),
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

  // GET /admin/subscribes/analyze/active-users - 전체 알림 활성 사용자 수 통계
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/subscribes/analyze/active-users',
    summary: '📊 전체 알림 활성 사용자 수 통계',
    description: 'ADMIN 권한으로 전체 알림 활성 사용자 수 통계를 조회합니다.',
    tags: [ 'admin-subscribe', ],
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
                summary: '전체 알림 활성 사용자 수 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_SUCCESS, [
                  CreateSubscribeAnalyze.totalActiveNotificationUsers(),
                ]),
              },
              error: {
                summary: '전체 알림 활성 사용자 수 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_ERROR),
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

  // GET /admin/subscribes/analyze/inactive-users - 전체 알림 비활성 사용자 수 통계
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/subscribes/analyze/inactive-users',
    summary: '📊 전체 알림 비활성 사용자 수 통계',
    description: 'ADMIN 권한으로 전체 알림 비활성 사용자 수 통계를 조회합니다.',
    tags: [ 'admin-subscribe', ],
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
                summary: '전체 알림 비활성 사용자 수 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_SUCCESS, [
                  CreateSubscribeAnalyze.totalInactiveNotificationUsers(),
                ]),
              },
              error: {
                summary: '전체 알림 비활성 사용자 수 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_ERROR),
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
  // 기존 구독 설정 관리 엔드포인트
  // ========================================================

  // GET /admin/subscribes/search - 구독 설정 목록 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/subscribes/search',
    summary: '📋 구독 설정 목록 조회',
    description: '전체 사용자의 구독 설정 목록을 조회합니다.',
    tags: [ 'admin-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: searchSubscribeSchema,
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '구독 설정 목록 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.SEARCH_SUCCESS, [ CreateExample.subscribe('list'), ]),
              },
              error: {
                summary: '구독 설정 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.SUBSCRIBE.ADMIN.SEARCH_ERROR),
              },
              validationError: {
                summary: '요청 데이터 유효성 검증 실패',
                value: createError('BAD_REQUEST', MESSAGE.COMMON.INVALID_REQUEST),
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

  // GET /admin/subscribes/{userNo} - 특정 사용자 구독 설정 조회
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/subscribes/{userNo}',
    summary: '👤 특정 사용자 구독 설정 조회',
    description: '특정 사용자의 구독 설정을 조회합니다.',
    tags: [ 'admin-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        userNo: z.coerce.number().int().positive().openapi({
          description: '사용자 번호',
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
                summary: '구독 설정 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.SEARCH_SUCCESS, CreateExample.subscribe('detail')),
              },
              notFound: {
                summary: '구독 설정을 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.SUBSCRIBE.ADMIN.NOT_FOUND),
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

  // POST /admin/subscribes/create - 구독 설정 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/subscribes',
    summary: '✏️ 구독 설정 생성',
    description: '관리자가 특정 사용자의 구독 설정을 생성합니다.',
    tags: [ 'admin-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createSubscribeSchema,
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
                summary: '구독 설정 생성 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.CREATE_SUCCESS, CreateExample.subscribe('detail')),
              },
              notFound: {
                summary: '사용자를 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.USER.USER.NOT_FOUND),
              },
              conflict: {
                summary: '이미 구독 설정이 존재함',
                value: createError('CONFLICT', MESSAGE.SUBSCRIBE.ADMIN.ALREADY_EXISTS),
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

  // PUT /admin/subscribes/multiple - 구독 설정 일괄 변경
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/subscribes/multiple',
    summary: '🔄 구독 설정 일괄 변경',
    description: '다수 사용자의 구독 설정을 일괄 변경합니다.',
    tags: [ 'admin-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateSubscribeSchema,
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
                summary: '구독 설정 일괄 변경 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.MULTIPLE_UPDATE_SUCCESS, {
                  successCnt: 3,
                  failCnt: 1,
                  failNoList: [],
                }),
              },
              badRequest: {
                summary: '유효하지 않은 사용자 목록',
                value: createError('BAD_REQUEST', MESSAGE.SUBSCRIBE.ADMIN.INVALID_USER_LIST),
              },
              notFound: {
                summary: '구독 설정을 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.SUBSCRIBE.ADMIN.NOT_FOUND),
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

  // DELETE /admin/subscribes/{sbcrNo} - 구독 설정 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/subscribes/{sbcrNo}',
    summary: '🗑️ 구독 설정 삭제',
    description: '특정 사용자의 구독 설정을 삭제합니다.',
    tags: [ 'admin-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        sbcrNo: z.coerce.number().int().positive().openapi({
          description: '구독 번호',
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
                summary: '구독 설정 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.DELETE_SUCCESS, true),
              },
              notFound: {
                summary: '구독 설정을 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.SUBSCRIBE.ADMIN.NOT_FOUND),
              },
              conflict: {
                summary: '이미 삭제된 구독 설정',
                value: createError('CONFLICT', MESSAGE.SUBSCRIBE.ADMIN.ALREADY_DELETED),
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

  // DELETE /admin/subscribes/multiple - 구독 설정 일괄 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/subscribes/multiple',
    summary: '🗑️ 구독 설정 일괄 삭제',
    description: '다수 사용자의 구독 설정을 일괄 삭제합니다.',
    tags: [ 'admin-subscribe', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteSubscribeSchema,
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
                summary: '구독 설정 일괄 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.MULTIPLE_DELETE_SUCCESS, {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              badRequest: {
                summary: '유효하지 않은 사용자 목록',
                value: createError('BAD_REQUEST', MESSAGE.SUBSCRIBE.ADMIN.INVALID_USER_LIST),
              },
              notFound: {
                summary: '구독 설정을 찾을 수 없음',
                value: createError('NOT_FOUND', MESSAGE.SUBSCRIBE.ADMIN.NOT_FOUND),
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
