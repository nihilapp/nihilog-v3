import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import type { OpenAPIObject } from '@nestjs/swagger';

import { registerAdminCategorySubscribeEndpoints } from './endpoints/admin-category-subscribe.endpoints';
import { registerAdminPostsEndpoints } from './endpoints/admin-posts.endpoints';
import { registerAdminSubscribeEndpoints } from './endpoints/admin-subscribe.endpoints';
import { registerAdminTagSubscribeEndpoints } from './endpoints/admin-tag-subscribe.endpoints';
import { registerAdminUsersEndpoints } from './endpoints/admin-users.endpoints';
import { registerAdminEndpoints } from './endpoints/admin.endpoints';
import { registerAuthEndpoints } from './endpoints/auth.endpoints';
import { registerCategorySubscribeEndpoints } from './endpoints/category-subscribe.endpoints';
import { registerPostsEndpoints } from './endpoints/posts.endpoints';
import { registerTagSubscribeEndpoints } from './endpoints/tag-subscribe.endpoints';
import { registerTagsEndpoints } from './endpoints/tags.endpoints';
import { registerUserEndpoints } from './endpoints/users.endpoints';
import { openApiRegistry, registerAllSchemas } from './registry';

// OpenAPI 문서 생성 함수
export const generateOpenApiDocument = (): OpenAPIObject => {
  // 모든 스키마 등록
  registerAllSchemas();

  // 엔드포인트 등록
  registerAuthEndpoints();
  registerUserEndpoints();
  registerTagSubscribeEndpoints();
  registerCategorySubscribeEndpoints();
  registerPostsEndpoints();
  registerTagsEndpoints();
  registerAdminEndpoints();
  registerAdminUsersEndpoints();
  registerAdminPostsEndpoints();
  registerAdminSubscribeEndpoints();
  registerAdminTagSubscribeEndpoints();
  registerAdminCategorySubscribeEndpoints();

  // OpenAPI 문서 생성
  const generator = new OpenApiGeneratorV3(openApiRegistry.definitions);
  const openApiDocument = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Nihilog API',
      description: 'Nihilog 블로그 API 문서',
      version: '1.0.0',
      contact: {
        name: 'Development Team',
        url: 'https://github.com/nihilncunia/nihilog',
        email: 'nihil_ncunia@naver.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: '개발 서버',
      },
    ],
    tags: [
      {
        name: 'auth',
        description: '🔐 인증 관련 API - 회원가입, 로그인, 로그아웃 등',
      },
      {
        name: 'users',
        description: '👤 구독자 관리 API - 프로필 조회/수정/삭제, 구독 설정 관리',
      },
      {
        name: 'posts',
        description: '📖 게시글 공개 API - 조회 전용',
      },
      {
        name: 'categories',
        description: '📖 카테고리 공개 API - 조회 전용',
      },
      {
        name: 'tags',
        description: '📖 태그 공개 API - 조회 전용',
      },
      {
        name: 'comments',
        description: '💬 댓글 공개 API - 조회/작성/수정/삭제',
      },
      {
        name: 'tag-subscribe',
        description: '🏷️ 태그 구독 API - 태그 구독 관리',
      },
      {
        name: 'category-subscribe',
        description: '📂 카테고리 구독 API - 카테고리 구독 관리',
      },
      {
        name: 'admin',
        description: '🔐 관리자 공통 API - 관리자 전용 영역',
      },
      {
        name: 'admin-users',
        description: '👥 사용자 관리 API - 사용자 조회/생성/수정/삭제',
      },
      {
        name: 'admin-posts',
        description: '🛠️ 게시글 관리자 API - 생성/수정/삭제',
      },
      {
        name: 'admin-categories',
        description: '🛠️ 카테고리 관리자 API - 생성/수정/삭제',
      },
      {
        name: 'admin-tags',
        description: '🛠️ 태그 관리자 API - 생성/수정/삭제',
      },
      {
        name: 'admin-subscribe',
        description: '🛠️ 구독 관리자 API - 생성/수정/삭제',
      },
      {
        name: 'admin-tag-subscribe',
        description: '🛠️ 태그 구독 관리자 API - 생성/수정/삭제',
      },
      {
        name: 'admin-category-subscribe',
        description: '🛠️ 카테고리 구독 관리자 API - 생성/수정/삭제',
      },
    ],
  });

  return openApiDocument as OpenAPIObject;
};
