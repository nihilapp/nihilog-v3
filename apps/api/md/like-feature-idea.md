# 좋아요 기능 설계 아이디어

## 개요
- 구독자(회원)와 비구독자(비회원) 모두 좋아요 가능
- 1인 1좋아요 중복 방지 필요
- 개인 블로그 특성상 완벽한 중복 방지보다는 대부분의 중복만 막으면 충분

## 테이블 설계

### pst_like_mpng (포스트 좋아요 매핑 테이블)

```sql
CREATE TABLE pst_like_mpng (
  like_no SERIAL PRIMARY KEY,
  pst_no INTEGER NOT NULL REFERENCES pst_info(pst_no),

  -- 회원/비회원 구분
  user_no INTEGER REFERENCES user_info(user_no),  -- NULL이면 비회원

  -- 비회원 식별용
  like_ip INET,                    -- IP 주소
  like_user_agent TEXT,            -- User Agent
  like_session_id VARCHAR(255),    -- 세션 ID (선택)

  -- 메타데이터
  crt_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- 제약조건
  CONSTRAINT pst_like_member_uq
    UNIQUE(pst_no, user_no)
    WHERE user_no IS NOT NULL,

  CONSTRAINT pst_like_guest_uq
    UNIQUE(pst_no, like_ip, like_user_agent)
    WHERE user_no IS NULL
);
```

## 클라이언트 정보 추출 방법

### NestJS 커스텀 데코레이터

```typescript
// 커스텀 데코레이터 생성
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      ip: getClientIP(request),
      userAgent: request.headers['user-agent'] || '',
    };
  },
);

// IP 추출 함수 (프록시 고려)
function getClientIP(req: any): string {
  return (
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
    ''
  );
}
```

### 컨트롤러 사용법

```typescript
@Post(':pstNo/like')
async addLike(
  @Param('pstNo') pstNo: number,
  @ClientInfo() clientInfo: { ip: string; userAgent: string },
  @CurrentUser() user?: UserDto  // 로그인한 경우만
) {
  return this.postsService.addLike(pstNo, user?.userNo, clientInfo);
}
```

## 비회원 중복 방지 전략

### 1. IP + User Agent 조합 (권장)
- 서버에서 완전 제어 가능
- 개인 블로그 수준에서는 충분한 중복 방지
- 구현 간단

### 2. 하이브리드 방식 (선택사항)
- 클라이언트: localStorage에 좋아요한 포스트 ID 저장
- 서버: IP+UA로 2차 검증
- 사용자 경험 개선

## 한계 및 고려사항

### 완벽하지 않은 이유
- 공용 네트워크에서 여러 사람이 같은 IP 사용
- 동적 IP 환경에서 시간이 지나면 IP 변경
- VPN/프록시 사용자들

### 결론
- 악의적인 조작은 어차피 막기 어려움
- 일반적인 중복만 방지하면 개인 블로그에는 충분
- 조회수와 동일한 수준의 중복 방지로 적절

## API 설계 예시

```typescript
// 좋아요 추가/취소
POST /posts/:pstNo/like

// 좋아요 상태 조회
GET /posts/:pstNo/like/status

// 좋아요 수 조회
GET /posts/:pstNo/like/count
```