import { DocumentBuilder, type SwaggerCustomOptions } from '@nestjs/swagger';

// config.yaml 기반으로 동적 Swagger 설정 생성
export function createSwaggerConfig(params: {
  title: string;
  description: string;
  version: string;
}) {
  return new DocumentBuilder()
    .setTitle(params.title)
    .setDescription(params.description)
    .setVersion(params.version)
    .setContact(
      'Development Team',
      'https://github.com/your-org/nest-next-mono-template',
      'dev@yourcompany.com'
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: '수동 JWT 토큰 입력 (선택사항 - 쿠키 인증이 우선됩니다)',
        in: 'header',
      },
      'JWT-auth'
    )
    .addCookieAuth('accessToken', {
      type: 'apiKey',
      in: 'cookie',
      name: 'accessToken',
      description: 'HTTP-Only 쿠키를 통한 자동 JWT 인증 (로그인 시 자동 설정)',
    })
    // 인증 관련
    .addTag('auth', '🔐 인증 관련 API - 회원가입, 로그인, 로그아웃 등')

    // 사용자 관련
    .addTag('users', '👤 구독자 관리 API - 프로필 조회/수정/삭제, 구독 설정 관리')

    // 공개 API (읽기 전용)
    .addTag('posts', '📖 포스트 공개 API - 조회 전용')
    .addTag('categories', '📖 카테고리 공개 API - 조회 전용')
    .addTag('tags', '📖 태그 공개 API - 조회 전용')
    .addTag('comments', '💬 댓글 공개 API - 조회/작성/수정/삭제')

    // 관리자 API
    .addTag('admin', '🔐 관리자 공통 API - 관리자 전용 영역')
    .addTag('admin/users', '👥 사용자 관리 API - 사용자 조회/생성/수정/삭제')
    .addTag('admin/posts', '🛠️ 포스트 관리자 API - 생성/수정/삭제')
    .addTag('admin/categories', '🛠️ 카테고리 관리자 API - 생성/수정/삭제')
    .addTag('admin/tags', '🛠️ 태그 관리자 API - 생성/수정/삭제')
    .build();
}

// Swagger UI 커스텀 옵션
export const swaggerUiOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true, // 인증 정보 유지
    displayRequestDuration: true, // 요청 시간 표시
    filter: true, // API 필터링 기능
    tryItOutEnabled: true, // Try it out 기능 활성화
    withCredentials: true, // 쿠키 포함하여 요청
    deepLinking: false, // 딥링킹 비활성화로 경고 제거
    requestInterceptor: (req: unknown) => {
      // Swagger UI가 전달하는 요청 객체에 대한 최소 타입 정의
      interface SwaggerRequest {
        url?: string;
        headers?: Record<string, string>;
      }

      const safeReq = (req as SwaggerRequest) ?? {};

      // Swagger 요청임을 명시하는 헤더 추가
      if (!safeReq.headers) {
        safeReq.headers = {};
      }

      // 모든 Swagger 요청에 표시 헤더 추가
      safeReq.headers['x-swagger-request'] = 'true';
      safeReq.headers['x-request-source'] = 'swagger-ui';

      // 로그인 요청 시 특수 헤더 추가
      if (typeof safeReq.url === 'string' && safeReq.url.includes('/auth/signin')) {
        safeReq.headers['x-swagger-login'] = 'true';
      }

      return safeReq as unknown as Record<string, unknown>;
    },
    responseInterceptor: `
      (function(res) {
        // 로그인 응답에서 토큰을 자동으로 인증에 설정
        if (res.url.includes('/auth/signin') && res.status === 200) {
          try {
            const responseData = JSON.parse(res.text);
            // SuccessInterceptor로 인해 data.accessToken 형태로 응답됨
            if (responseData.data && responseData.data.accessToken) {
              // Bearer 토큰 자동 설정
              window.ui.preauthorizeApiKey('JWT-auth', 'Bearer ' + responseData.data.accessToken);
              console.log('🔐 JWT 토큰이 자동으로 설정되었습니다. 이제 인증이 필요한 API를 테스트할 수 있습니다!');
            }
          } catch (error) {
            console.log('⚠️ 토큰 자동 설정 중 오류:', error);
          }
        }
        return res;
      })
    `,
  },
  customfavIcon: '/favicon.ico',
  customCss: `
    .swagger-ui .markdown code,
    .swagger-ui .renderedMarkdown code {
      color: #333333 !important;
      background-color: transparent !important;
      font-size: 14px !important;
      font-family: sans-serif !important;
      font-weight: 400 !important;
    }

    /* 경고 메시지 숨김 */
    .swagger-ui .info .title {
      word-break: break-word;
    }

    /* Swagger 요청 표시 스타일 */
    .swagger-ui .info .description {
      line-height: 1.6;
    }
  `,
};
