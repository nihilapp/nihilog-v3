import { NextResponse, type NextRequest } from 'next/server';

import { siteConfig } from './app/_config/config';

// 인증이 필요 없는 공개 경로 목록입니다.
const publicPaths = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
];

export const config = {
  // 미들웨어는 정적 파일과 Next.js 내부 파일을 제외한 모든 경로에서 실행됩니다.
  matcher: [ '/((?!_next/static|_next/image|favicon.ico|api/auth).*)', ],
};

/**
 * @description 토큰 갱신이 필요한지 확인하는 함수
 * @param accessTokenExpiresAt 액세스 토큰 만료 시간 (밀리초)
 * @returns 토큰 갱신이 필요한 경우 true
 */
function shouldRefreshToken(accessTokenExpiresAt?: string): boolean {
  if (!accessTokenExpiresAt) {
    // 만료시간 정보가 없으면 갱신 시도
    return true;
  }

  // 액세스 토큰 만료 시간을 숫자로 변환합니다.
  const expiresAt = parseInt(accessTokenExpiresAt, 10);

  // 현재 시간을 밀리초 단위로 가져옵니다.
  const now = Date.now();

  // 5분(밀리초 단위)을 상수로 정의합니다.
  const fiveMinutesInMs = 5 * 60 * 1000;

  // 현재 시간이 만료시간보다 늦거나, 만료 5분 전이면 갱신
  return now >= (expiresAt - fiveMinutesInMs);
}

/**
 * @description 리프레시 토큰으로 세션 갱신을 시도하고, 성공 시 Set-Cookie가 적용된 NextResponse.next()를 반환합니다.
 * 실패 시에는 null을 반환합니다.
 */
async function attemptTokenRefresh(refreshToken: string): Promise<NextResponse | null> {
  // 토큰 갱신 엔드포인트 구성
  const refreshUrl = new URL('/auth/refresh', siteConfig.api.route);

  // 토큰 갱신 요청
  const refreshResponse = await fetch(refreshUrl, {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
    credentials: 'include',
  });

  // 토큰 갱신 응답 확인
  if (!refreshResponse.ok) {
    return null;
  }

  // 토큰 갱신 성공 시, 새로운 쿠키를 설정하고 요청을 계속 진행합니다.
  const response = NextResponse.next();

  // 토큰 갱신 응답에서 쿠키 헤더 가져오기
  const setCookieHeaders = refreshResponse.headers.getSetCookie();

  // 쿠키 헤더를 응답 헤더에 추가
  setCookieHeaders.forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie);
  });

  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname, } = request.nextUrl;

  // 요청된 경로가 공개 경로인지 확인합니다.
  // `startsWith`를 사용하여 `/auth/reset-password?token=...`와 같이 쿼리 파라미터가 있는 경우도 처리합니다.
  const isPublic = publicPaths.some(
    (path) => pathname.startsWith(path)
  );
  if (isPublic) {
    // 인증이 필요 없으면 그대로 진행
    return NextResponse.next();
  }

  // 메인 페이지(/)의 경우 토큰이 있으면 필요시에만 갱신을 시도하지만, 없어도 접근을 허용합니다.
  if (pathname === '/') {
    // 리프레시 토큰 가져오기
    const refreshToken = request.cookies
      .get('refreshToken')?.value;
    // 액세스 토큰 만료 시간 가져오기
    const accessTokenExpiresAt = request.cookies
      .get('accessTokenExpiresAt')?.value;

    // 리프레시 토큰이 있고, 액세스 토큰 만료 시간이 5분 이내면 갱신을 시도합니다.
    if (refreshToken && shouldRefreshToken(accessTokenExpiresAt)) {
      try {
        const refreshed = await attemptTokenRefresh(refreshToken);

        if (refreshed) {
          return refreshed;
        }
      }
      catch (error) {
        // 메인 페이지에서는 토큰 갱신 실패 시에도 접근을 허용합니다.
        if (process.env.NODE_ENV === 'development') {
          console.warn('메인 페이지 토큰 갱신 실패:', error);
        }
      }
    }
    // 토큰 갱신이 필요하지 않으면 그대로 진행
    return NextResponse.next();
  }

  // 보호된 경로에 대해서는 인증 토큰을 확인합니다.
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const accessTokenExpiresAt = request.cookies.get('accessTokenExpiresAt')?.value;

  // RefreshToken이 있는 경우, 필요시에만 세션 갱신을 시도합니다.
  if (refreshToken && shouldRefreshToken(accessTokenExpiresAt)) {
    try {
      // 리프레시 토큰으로 세션 갱신을 시도
      const refreshed = await attemptTokenRefresh(refreshToken);

      // 세션 갱신 성공 시 그대로 진행
      if (refreshed) {
        return refreshed;
      }
      else {
        // 토큰 갱신 응답 실패 로깅
        if (process.env.NODE_ENV === 'development') {
          console.warn('토큰 갱신 응답 실패:', {
            status: 'FAILED',
            statusText: 'NON_OK_RESPONSE',
            pathname,
            timestamp: new Date().toISOString(),
          });
        }

        // 토큰 갱신 실패 시, 기존 토큰이 유효한지 확인 후 처리
        // 갱신 실패가 반드시 인증 실패를 의미하지는 않으므로, 기존 토큰으로 진행을 시도
        console.warn('토큰 갱신 실패했지만 기존 토큰으로 진행을 시도합니다.');
        return NextResponse.next();
      }
    }
    catch (error) {
      // 개발 환경에서는 자세한 에러 정보를, 프로덕션에서는 간단한 메시지만 로깅
      if (process.env.NODE_ENV === 'development') {
        console.error('미들웨어 토큰 갱신 실패 (상세):', {
          error: error instanceof Error
            ? error.message
            : error,
          pathname,
          refreshToken: refreshToken
            ? '[PRESENT]'
            : '[MISSING]',
          timestamp: new Date().toISOString(),
        });
      }
      else {
        console.error('미들웨어 토큰 갱신 실패:', pathname);
      }

      // 갱신 실패 시, 기존 토큰이 유효한지 확인 후 처리
      // 갱신 실패가 반드시 인증 실패를 의미하지는 않으므로, 기존 토큰으로 진행을 시도
      console.warn('토큰 갱신 중 예외 발생했지만 기존 토큰으로 진행을 시도합니다.');
      return NextResponse.next();
    }
  }

  // RefreshToken이 없거나 갱신이 필요하지 않은 경우
  if (!refreshToken) {
    // 유효한 토큰이 없는 경우 로그인 페이지로 리다이렉트합니다.
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // 토큰은 있지만 아직 갱신이 필요하지 않은 경우 그대로 진행
  return NextResponse.next();
}
