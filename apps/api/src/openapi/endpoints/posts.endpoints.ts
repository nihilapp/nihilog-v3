import { z } from 'zod';

import { createPostShareLogSchema } from '@/endpoints/prisma/schemas/post-sharelog.schema';
import {
  searchPostSchema,
  createPostBookmarkSchema,
  deletePostBookmarkSchema,
  searchPostBookmarkSchema
} from '@/endpoints/prisma/schemas/post.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerPostsEndpoints = () => {
  // POST /posts/search - 게시글 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/search',
    summary: '📋 게시글 목록 조회',
    description: '게시글 목록을 조회합니다.',
    tags: [ 'posts', ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchPostSchema,
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
                summary: '게시글 목록 조회 성공',
                value: createResponse('SUCCESS', 'POST_SEARCH_SUCCESS', [ CreateExample.post('list'), ]),
              },
              error: {
                summary: '게시글 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // GET /posts/{pstNo} - 게시글 상세 조회 (번호)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/posts/{pstNo}',
    summary: '📄 게시글 상세 조회',
    description: '게시글을 상세 조회합니다.',
    tags: [ 'posts', ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
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
                summary: '게시글 상세 조회 성공',
                value: createResponse('SUCCESS', 'POST_GET_SUCCESS', CreateExample.post('detail')),
              },
              notFound: {
                summary: '게시글을 찾을 수 없음',
                value: createError('NOT_FOUND', 'POST_NOT_FOUND'),
              },
              error: {
                summary: '게시글 상세 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_GET_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // GET /posts/slug/{pstCd} - 게시글 상세 조회 (슬러그)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/posts/slug/{pstCd}',
    summary: '🔗 게시글 상세 조회 (슬러그)',
    description: '게시글 슬러그로 상세 조회합니다.',
    tags: [ 'posts', ],
    request: {
      params: z.object({
        pstCd: z.string().openapi({
          description: '게시글 슬러그',
          example: 'post-slug',
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
                summary: '게시글 상세 조회 성공',
                value: createResponse('SUCCESS', 'POST_GET_SUCCESS', CreateExample.post('detail')),
              },
              notFound: {
                summary: '게시글을 찾을 수 없음',
                value: createError('NOT_FOUND', 'POST_NOT_FOUND'),
              },
              error: {
                summary: '게시글 상세 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_GET_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // POST /posts/tag/{tagNo} - 태그별 게시글 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/tag/{tagNo}',
    summary: '🏷️ 태그별 게시글 목록 조회',
    description: '태그별 게시글 목록을 조회합니다.',
    tags: [ 'posts', ],
    request: {
      params: z.object({
        tagNo: z.coerce.number().int().positive().openapi({
          description: '태그 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: searchPostSchema,
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
                summary: '태그별 게시글 목록 조회 성공',
                value: createResponse('SUCCESS', 'POST_SEARCH_SUCCESS', [ CreateExample.post('list'), ]),
              },
              error: {
                summary: '태그별 게시글 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // POST /posts/category/{ctgryNo} - 카테고리별 게시글 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/category/{ctgryNo}',
    summary: '📂 카테고리별 게시글 목록 조회',
    description: '카테고리별 게시글 목록을 조회합니다.',
    tags: [ 'posts', ],
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
            schema: searchPostSchema,
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
                summary: '카테고리별 게시글 목록 조회 성공',
                value: createResponse('SUCCESS', 'POST_SEARCH_SUCCESS', [ CreateExample.post('list'), ]),
              },
              error: {
                summary: '카테고리별 게시글 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // POST /posts/archive/{date} - 년월별 게시글 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/archive/{date}',
    summary: '📅 년월별 게시글 목록 조회',
    description: '년월별 게시글 목록을 조회합니다.',
    tags: [ 'posts', ],
    request: {
      params: z.object({
        date: z.string().openapi({
          description: '날짜(yyyyMM)',
          example: '202401',
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: searchPostSchema,
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
                summary: '년월별 게시글 목록 조회 성공',
                value: createResponse('SUCCESS', 'POST_SEARCH_SUCCESS', [ CreateExample.post('list'), ]),
              },
              error: {
                summary: '년월별 게시글 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // POST /posts/advanced-search - 고급 검색을 통한 게시글 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/advanced-search',
    summary: '🔍 고급 검색을 통한 게시글 목록 조회',
    description: '복합 조건(태그, 카테고리, 날짜 범위, 조회수 등)을 통한 게시글 목록을 조회합니다.',
    tags: [ 'posts', ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchPostSchema,
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
                summary: '고급 검색 성공',
                value: createResponse('SUCCESS', 'POST_SEARCH_SUCCESS', [ CreateExample.post('list'), ]),
              },
              error: {
                summary: '고급 검색 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // POST /posts/{pstNo}/view - 게시글 조회 로그 기록
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/{pstNo}/view',
    summary: '👁️ 게시글 조회 로그 기록',
    description: '게시글 조회 로그를 기록합니다.',
    tags: [ 'posts', ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
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
                summary: '게시글 조회 로그 기록 성공',
                value: createResponse('SUCCESS', 'POST_VIEW_LOG_SUCCESS', CreateExample.postViewLog()),
              },
              error: {
                summary: '게시글 조회 로그 기록 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_VIEW_LOG_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // POST /posts/{pstNo}/share - 게시글 공유 로그 기록
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/{pstNo}/share',
    summary: '📤 게시글 공유 로그 기록',
    description: '게시글 공유 로그를 기록합니다.',
    tags: [ 'posts', ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: createPostShareLogSchema,
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
                summary: '게시글 공유 로그 기록 성공',
                value: createResponse('SUCCESS', 'POST_SHARE_LOG_SUCCESS', CreateExample.postShareLog()),
              },
              error: {
                summary: '게시글 공유 로그 기록 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_SHARE_LOG_ERROR'),
              },
            }), // 공개 엔드포인트이므로 글로벌 응답만 DB 에러 추가
          },
        },
      },
    },
  });

  // POST /posts/{pstNo}/bookmark - 게시글 북마크 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/{pstNo}/bookmark',
    summary: '🔖 게시글 북마크 생성',
    description: '게시글 북마크를 생성합니다.',
    tags: [ 'posts', ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: createPostBookmarkSchema,
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
                summary: '게시글 북마크 생성 성공',
                value: createResponse('SUCCESS', 'POST_BOOKMARK_CREATE_SUCCESS', CreateExample.postBookmark('detail')),
              },
              error: {
                summary: '게시글 북마크 생성 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_BOOKMARK_CREATE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // DELETE /posts/{pstNo}/bookmark - 게시글 북마크 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/posts/{pstNo}/bookmark',
    summary: '🗑️ 게시글 북마크 삭제',
    description: '게시글 북마크를 삭제합니다.',
    tags: [ 'posts', ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: deletePostBookmarkSchema,
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
                summary: '게시글 북마크 삭제 성공',
                value: createResponse('SUCCESS', 'POST_BOOKMARK_DELETE_SUCCESS', true),
              },
              error: {
                summary: '게시글 북마크 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_BOOKMARK_DELETE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });

  // POST /posts/bookmarked - 북마크한 게시글 목록 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/posts/bookmarked',
    summary: '📚 북마크한 게시글 목록 조회',
    description: '북마크한 게시글 목록을 조회합니다.',
    tags: [ 'posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchPostBookmarkSchema,
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
                summary: '북마크한 게시글 목록 조회 성공',
                value: createResponse('SUCCESS', 'POST_BOOKMARK_SEARCH_SUCCESS', [ CreateExample.postBookmark('list'), ]),
              },
              error: {
                summary: '북마크한 게시글 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'POST_BOOKMARK_SEARCH_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
            }),
          },
        },
      },
    },
  });
};
