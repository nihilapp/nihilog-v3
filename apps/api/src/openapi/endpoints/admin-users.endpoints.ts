import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { analyzeStatSchema } from '@/endpoints/prisma/schemas/common.schema';
import { createUserSchema } from '@/endpoints/prisma/schemas/user.schema';
import { updateUserSchema, searchUserSchema, deleteMultipleUsersSchema } from '@/endpoints/prisma/schemas/user.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';
import { CreateUserAnalyze } from '@/utils/createUserAnalyze';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminUsersEndpoints = () => {
  // ===== 사용자 통계 엔드포인트 (최상단) =====

  // GET /admin/users/analyze/overview - 사용자 분석 통계
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/overview',
    summary: '📊 사용자 분석 통계',
    description: '사용자 가입/삭제/활성, 로그인, 포스트/댓글/북마크, 태그/카테고리 구독 통계를 조회합니다.',
    tags: [ 'admin-users', ],
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
                  summary: '사용자 분석 통계 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.ANALYZE_SUCCESS,
                    [ CreateUserAnalyze.createUserAnalyzeExample(), ]
                  ),
                },
                error: {
                  summary: '사용자 분석 통계 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.ANALYZE_ERROR
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

  // GET /admin/users/analyze/active-users - 활성 사용자 분석
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/active-users',
    summary: '👥 활성 사용자 분석',
    description: '최근 7일/30일 로그인한 활성 사용자 수 및 비율을 분석합니다.',
    tags: [ 'admin-users', ],
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
                  summary: '활성 사용자 분석 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.ACTIVE_USER_ANALYSIS_SUCCESS,
                    CreateUserAnalyze.createActiveUserAnalysisExample()
                  ),
                },
                error: {
                  summary: '활성 사용자 분석 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.ACTIVE_USER_ANALYSIS_ERROR
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

  // GET /admin/users/analyze/top-contribution - 사용자별 기여도 TOP N
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/top-contribution',
    summary: '🏆 사용자별 기여도 TOP N',
    description: '포스트 + 댓글 + 북마크 가중치 합산 기준으로 기여도가 높은 사용자 TOP N을 조회합니다.',
    tags: [ 'admin-users', ],
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
                  summary: '사용자별 기여도 TOP N 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.TOP_CONTRIBUTION_SUCCESS,
                    CreateUserAnalyze.createTopUsersByContributionExample()
                  ),
                },
                error: {
                  summary: '사용자별 기여도 TOP N 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.TOP_CONTRIBUTION_ERROR
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

  // GET /admin/users/analyze/top-post-count - 사용자별 포스트 작성 수 TOP N
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/top-post-count',
    summary: '📝 사용자별 포스트 작성 수 TOP N',
    description: '포스트를 가장 많이 작성한 사용자 TOP N을 조회합니다.',
    tags: [ 'admin-users', ],
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
                  summary: '사용자별 포스트 작성 수 TOP N 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.TOP_POST_COUNT_SUCCESS,
                    CreateUserAnalyze.createTopUsersByPostCountExample()
                  ),
                },
                error: {
                  summary: '사용자별 포스트 작성 수 TOP N 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.TOP_POST_COUNT_ERROR
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

  // GET /admin/users/analyze/top-comment-count - 사용자별 댓글 작성 수 TOP N
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/top-comment-count',
    summary: '💬 사용자별 댓글 작성 수 TOP N',
    description: '댓글을 가장 많이 작성한 사용자 TOP N을 조회합니다.',
    tags: [ 'admin-users', ],
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
                    MESSAGE.USER.STATISTICS.TOP_COMMENT_COUNT_SUCCESS,
                    CreateUserAnalyze.createTopUsersByCommentCountExample()
                  ),
                },
                error: {
                  summary: '사용자별 댓글 작성 수 TOP N 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.TOP_COMMENT_COUNT_ERROR
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

  // GET /admin/users/analyze/role-distribution - 역할별 사용자 분포
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/role-distribution',
    summary: '👑 역할별 사용자 분포',
    description: 'ADMIN/USER 역할별 사용자 수 및 비율을 조회합니다.',
    tags: [ 'admin-users', ],
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
                  summary: '역할별 사용자 분포 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.ROLE_DISTRIBUTION_SUCCESS,
                    CreateUserAnalyze.createUserRoleDistributionExample()
                  ),
                },
                error: {
                  summary: '역할별 사용자 분포 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.ROLE_DISTRIBUTION_ERROR
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

  // GET /admin/users/analyze/status-distribution - 상태별 사용자 분포
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/status-distribution',
    summary: '📈 상태별 사용자 분포',
    description: '활성/비활성/삭제 상태별 사용자 수 및 비율을 조회합니다.',
    tags: [ 'admin-users', ],
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
                  summary: '상태별 사용자 분포 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.STATUS_DISTRIBUTION_SUCCESS,
                    CreateUserAnalyze.createUserStatusDistributionExample()
                  ),
                },
                error: {
                  summary: '상태별 사용자 분포 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.STATUS_DISTRIBUTION_ERROR
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

  // GET /admin/users/analyze/inactive-users - 비활성 사용자 목록
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/inactive-users',
    summary: '😴 비활성 사용자 목록',
    description: '일정 기간 로그인하지 않은 비활성 사용자 목록을 조회합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: z.object({
        daysThreshold: z.coerce.number().int().positive().optional().openapi({
          description: '비활성 기준 일수 (기본값: 30)',
          example: 30,
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
                  summary: '비활성 사용자 목록 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.INACTIVE_USERS_SUCCESS,
                    CreateUserAnalyze.createInactiveUsersListExample()
                  ),
                },
                badRequest: {
                  summary: '잘못된 비활성 기준 일수',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.USER.STATISTICS.INVALID_DAYS_THRESHOLD
                  ),
                },
                error: {
                  summary: '비활성 사용자 목록 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.INACTIVE_USERS_ERROR
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

  // GET /admin/users/analyze/growth-rate - 사용자 성장률
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/growth-rate',
    summary: '📈 사용자 성장률',
    description: '신규 가입 추이를 기반으로 사용자 성장률을 계산합니다.',
    tags: [ 'admin-users', ],
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
                  summary: '사용자 성장률 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.GROWTH_RATE_SUCCESS,
                    CreateUserAnalyze.createUserGrowthRateExample()
                  ),
                },
                error: {
                  summary: '사용자 성장률 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.GROWTH_RATE_ERROR
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

  // GET /admin/users/analyze/retention-rate - 사용자 유지율
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/analyze/retention-rate',
    summary: '🔄 사용자 유지율',
    description: '가입 대비 활성 사용자 비율을 기반으로 사용자 유지율을 계산합니다.',
    tags: [ 'admin-users', ],
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
                  summary: '사용자 유지율 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.STATISTICS.RETENTION_RATE_SUCCESS,
                    CreateUserAnalyze.createUserRetentionRateExample()
                  ),
                },
                error: {
                  summary: '사용자 유지율 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.STATISTICS.RETENTION_RATE_ERROR
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

  // ===== 기존 사용자 관리 엔드포인트 =====

  // GET /admin/users - 사용자 목록 검색
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users',
    summary: '🔎 사용자 목록 검색',
    description: '부분 일치(ILIKE) 기반으로 사용자 목록을 검색합니다. delYn이 제공되지 않으면 기본값 N으로 조회합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      query: searchUserSchema,
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
                  summary: '사용자 목록 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.LIST_SUCCESS,
                    {
                      list: [ CreateExample.user('list'), ],
                      totalCnt: 1,
                    }
                  ),
                },
                badRequest: {
                  summary: '잘못된 요청',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.COMMON.INVALID_REQUEST
                  ),
                },
                error: {
                  summary: '사용자 목록 조회 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.LIST_ERROR
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

  // GET /admin/users/{userNo} - 사용자 단건 조회 (번호)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/{userNo}',
    summary: '🔍 사용자 단건 조회 (번호)',
    description: '사용자 번호로 단건 조회합니다.',
    tags: [ 'admin-users', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '사용자 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.FETCH_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                notFound: {
                  summary: '사용자를 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.USER.USER.NOT_FOUND
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

  // GET /admin/users/name/{name} - 사용자 단건 조회 (이름)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/name/{name}',
    summary: '🔍 사용자 단건 조회 (이름)',
    description: '사용자명을 기준으로 단건 조회합니다(완전 일치).',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        name: z.string().openapi({
          description: '사용자명',
          example: '홍길동',
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
                  summary: '사용자 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.FETCH_SUCCESS,
                    CreateExample.user()
                  ),
                },
                badRequest: {
                  summary: '사용자명이 너무 짧음',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.USER.USER.NAME_TOO_SHORT
                  ),
                },
                badRequestLong: {
                  summary: '사용자명이 너무 김',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.USER.USER.NAME_TOO_LONG
                  ),
                },
                notFound: {
                  summary: '사용자를 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.USER.USER.NOT_FOUND
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

  // GET /admin/users/email/{email} - 사용자 단건 조회 (이메일)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/email/{email}',
    summary: '🔍 사용자 단건 조회 (이메일)',
    description: '이메일 주소를 기준으로 단건 조회합니다(완전 일치).',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        email: z.email().openapi({
          description: '이메일 주소',
          example: 'user@example.com',
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
                  summary: '사용자 조회 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.FETCH_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                badRequest: {
                  summary: '유효하지 않은 이메일 형식',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.USER.USER.EMAIL_INVALID
                  ),
                },
                notFound: {
                  summary: '사용자를 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.USER.USER.NOT_FOUND
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

  // POST /admin/users - 새 사용자 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/users',
    summary: '👤 새 사용자 생성',
    description: 'ADMIN 권한으로 새로운 사용자 계정을 생성합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createUserSchema,
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
                  summary: '사용자 생성 성공',
                  value: createResponse(
                    'CREATED',
                    MESSAGE.USER.USER.CREATE_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                invalidParameter: {
                  summary: '필수 정보 누락',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.USER.USER.INVALID_PARAMETER
                  ),
                },
                emailConflict: {
                  summary: '이미 존재하는 이메일',
                  value: createError(
                    'CONFLICT',
                    MESSAGE.USER.USER.EMAIL_EXISTS
                  ),
                },
                usernameConflict: {
                  summary: '이미 존재하는 사용자명',
                  value: createError(
                    'CONFLICT',
                    MESSAGE.USER.USER.USERNAME_EXISTS
                  ),
                },
                error: {
                  summary: '사용자 생성 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.CREATE_ERROR
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

  // POST /admin/users/admin - 최초 어드민 생성 (개발 환경 또는 마스터 키)
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/users/admin',
    summary: '🔐 최초 어드민 생성',
    description: '최초 어드민 계정 생성 기능입니다. 개발 환경에서는 마스터 키 없이 사용 가능하며, 프로덕션 환경에서는 마스터 키가 필요합니다. 요청 Body에 `masterKey` 필드를 포함하여 전달하세요.',
    tags: [ 'admin-users', ],
    // 개발 환경에서만 인증 없이 접근 가능 (프로덕션에서는 마스터 키 필요)
    request: {
      body: {
        content: {
          'application/json': {
            schema: createUserSchema,
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
            examples: {
              success: {
                summary: '최초 어드민 생성 성공',
                value: createResponse(
                  'CREATED',
                  MESSAGE.USER.USER.CREATE_SUCCESS,
                  CreateExample.user('detail')
                ),
              },
              forbidden: {
                summary: '개발 환경에서만 사용 가능 (또는 마스터 키 필요)',
                value: createError(
                  'FORBIDDEN',
                  MESSAGE.COMMON.DEVELOPMENT_ONLY
                ),
              },
              invalidMasterKey: {
                summary: '마스터 키가 올바르지 않음',
                value: createError(
                  'FORBIDDEN',
                  MESSAGE.COMMON.INVALID_MASTER_KEY
                ),
              },
              invalidParameter: {
                summary: '필수 정보 누락',
                value: createError(
                  'BAD_REQUEST',
                  MESSAGE.USER.USER.INVALID_PARAMETER
                ),
              },
              emailConflict: {
                summary: '이미 존재하는 이메일',
                value: createError(
                  'CONFLICT',
                  MESSAGE.USER.USER.EMAIL_EXISTS
                ),
              },
              usernameConflict: {
                summary: '이미 존재하는 사용자명',
                value: createError(
                  'CONFLICT',
                  MESSAGE.USER.USER.USERNAME_EXISTS
                ),
              },
              error: {
                summary: '사용자 생성 실패',
                value: createError(
                  'INTERNAL_SERVER_ERROR',
                  MESSAGE.USER.USER.CREATE_ERROR
                ),
              },
            },
          },
        },
      },
    },
  });

  // PATCH /admin/users/{userNo} - 사용자 정보 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/users/{userNo}',
    summary: '✏️ 사용자 정보 수정',
    description: 'ADMIN 권한으로 특정 사용자의 정보를 수정합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        userNo: z.coerce.number().int().positive().openapi({
          description: '사용자 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: updateUserSchema,
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
                  summary: '사용자 수정 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.UPDATE_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                imageChangeSuccess: {
                  summary: '프로필 이미지 변경 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.IMAGE_CHANGE_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                notFound: {
                  summary: '사용자를 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.USER.USER.NOT_FOUND
                  ),
                },
                conflict: {
                  summary: '사용자명 중복',
                  value: createError(
                    'CONFLICT',
                    MESSAGE.USER.USER.NAME_EXISTS
                  ),
                },
                imageChangeError: {
                  summary: '프로필 이미지 변경 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.IMAGE_CHANGE_ERROR
                  ),
                },
                error: {
                  summary: '사용자 수정 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.UPDATE_ERROR
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

  // PATCH /admin/users/multiple - 다수 사용자 일괄 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/users/multiple',
    summary: '✏️ 다수 사용자 일괄 수정',
    description: 'ADMIN 권한으로 다수 사용자 정보를 일괄 수정합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateUserSchema,
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
                  summary: '다수 사용자 수정 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.UPDATE_SUCCESS,
                    {
                      successCnt: 1,
                      failCnt: 0,
                      failNoList: [],
                    }
                  ),
                },
                error: {
                  summary: '사용자 수정 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.UPDATE_ERROR
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

  // DELETE /admin/users/{userNo} - 사용자 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/users/{userNo}',
    summary: '🗑️ 사용자 삭제',
    description: 'ADMIN 권한으로 특정 사용자를 삭제합니다.',
    tags: [ 'admin-users', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '사용자 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.DELETE_SUCCESS,
                    true
                  ),
                },
                notFound: {
                  summary: '사용자를 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.USER.USER.NOT_FOUND
                  ),
                },
                error: {
                  summary: '사용자 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.DELETE_ERROR
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

  // DELETE /admin/users/multiple - 다수 사용자 일괄 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/users/multiple',
    summary: '🗑️ 다수 사용자 일괄 삭제',
    description: 'ADMIN 권한으로 다수 사용자를 일괄 삭제합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteMultipleUsersSchema,
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
                  summary: '다수 사용자 삭제 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.DELETE_SUCCESS,
                    {
                      successCnt: 1,
                      failCnt: 0,
                      failNoList: [],
                    }
                  ),
                },
                badRequest: {
                  summary: '잘못된 요청',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.COMMON.INVALID_REQUEST
                  ),
                },
                invalidUserNo: {
                  summary: '유효하지 않은 사용자 번호',
                  value: createError(
                    'BAD_REQUEST',
                    MESSAGE.USER.USER.INVALID_USER_NO
                  ),
                },
                error: {
                  summary: '사용자 삭제 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.DELETE_ERROR
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
