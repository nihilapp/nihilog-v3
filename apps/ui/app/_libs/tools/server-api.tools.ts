import type { ResponseType } from '@nihilog/schemas';
import { cookies } from 'next/headers';

import { RESPONSE_CODE } from '@/_code/response.code';
import { siteConfig } from '@/_config/config';

/**
 * 서버 사이드 HTTP 클라이언트 유틸리티
 * Next.js 서버 컴포넌트 및 서버 액션에서 사용하는 API 요청 헬퍼 클래스
 */
export class ServerApi {
  /**
   * @description 서버 사이드에서 사용할 실제 백엔드 URL을 반환합니다.
   * 클라이언트와 달리 Next.js rewrites 프록시를 사용할 수 없으므로 실제 백엔드 URL을 사용합니다.
   */
  private static getBaseURL(): string {
    // 환경 변수로 백엔드 URL 설정 가능 (Docker, 다양한 환경 지원)
    const backendUrl = process.env.BACKEND_URL || (
      process.env.NODE_ENV === 'development'
        ? siteConfig.backEnd.development
        : siteConfig.backEnd.production
    );
    return backendUrl;
  }

  /**
   * @description 비즈니스 에러(Response code) 처리를 표준화합니다.
   * 서버가 200을 반환해도 `code` 가 SUCCESS 가 아니면 에러로 throw 합니다.
   * @param payload - 응답 데이터
   */
  private static ensureOk<TData>(payload: ResponseType<TData>): ResponseType<TData> {
    // 성공 응답 코드 목록
    const successCodes = [
      RESPONSE_CODE.SUCCESS, // 200
      RESPONSE_CODE.CREATED, // 201
      RESPONSE_CODE.NO_CONTENT, // 204
    ];

    if (payload.error || !successCodes.includes(payload.code as any)) {
      const error = new Error(payload.message);
      (error as any).code = payload.code;
      throw error;
    }

    return payload;
  }

  /**
   * @description 쿠키를 헤더에 포함하여 요청을 수행합니다.
   * @param url - API 엔드포인트 (예: '/categories/1' 또는 'http://localhost:8000/categories/1')
   * @param options - fetch 옵션
   */
  private static async fetchWithCookies(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');

    // 절대 URL인 경우 그대로 사용, 상대 경로인 경우 백엔드 URL과 결합
    const fullUrl = url.startsWith('http')
      ? url
      : `${this.getBaseURL()}${url.startsWith('/')
        ? url
        : `/${url}`}`;

    return fetch(
      fullUrl,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(cookieHeader && { Cookie: cookieHeader, }),
          ...options.headers,
        },
        credentials: 'include',
      }
    );
  }

  /**
   * @description GET 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   */
  static async getQuery<TData>(url: string): Promise<ResponseType<TData>> {
    const response = await this.fetchWithCookies(
      url,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload = await response.json() as ResponseType<TData>;
    return this.ensureOk<TData>(payload);
  }
}
