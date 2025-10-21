# GEMINI.md

이 문서는 이 리포지토리의 코드 작업 시 Gemini (gemini.google.com)에게 가이드를 제공합니다.

## 반드시 지켜야 할 사항

- **CRITICAL**: 항상 한국어로 응답해야 합니다.
- **CRITICAL**: 파일을 생성하거나 수정할 때, 사용하지 않는 import 구문은 반드시 제거해야 합니다.
- **CRITICAL**: 응답이나 md 파일 작성 시에 표는 사용하지 않습니다.

## 프로젝트 개요

이 프로젝트는 `pnpm` 워크스페이스로 관리되는 **모노레포 블로그 프로젝트**("nihilog")입니다.

- **API**: NestJS 백엔드 (포트 8000), Prisma ORM 및 PostgreSQL 사용
- **UI**: Next.js 15 프론트엔드 (포트 3000), App Router 및 React 19 사용

## 개발 명령어

### 루트 레벨 명령어

```bash
# 모든 워크스페이스의 의존성 설치
pnpm install

# 개발 편의용 스크립트
pnpm api:dev              # API 개발 서버 시작
pnpm ui:dev               # UI 개발 서버 시작

# 의존성 업데이트
pnpm api:ncu              # API 오래된 패키지 확인
pnpm api:ncu:update       # API 패키지 업데이트
pnpm ui:ncu               # UI 오래된 패키지 확인
pnpm ui:ncu:update        # UI 패키지 업데이트

# 특정 워크스페이스에서 명령어 실행
pnpm --filter api <command>
pnpm --filter ui <command>
```

### API (NestJS 백엔드)

```bash
# 개발 서버 (포트 8000)
pnpm --filter api dev

# 빌드
pnpm --filter api build

# 프로덕션 서버
pnpm --filter api start:prod

# 린팅
pnpm --filter api lint
pnpm --filter api lint:fix

# 데이터베이스 작업 (Prisma)
pnpm --filter api db:generate  # Prisma 마이그레이션 생성
pnpm --filter api db:migrate   # 마이그레이션 실행
pnpm --filter api db:studio    # Prisma Studio 열기
```

### UI (Next.js 프론트엔드)

```bash
# 개발 서버 (Turbopack 사용, 포트 3000)
pnpm --filter ui dev

# 빌드
pnpm --filter ui build

# 프로덕션 서버 시작
pnpm --filter ui start

# Vercel 빌드
pnpm --filter ui vercel:build

# 린팅
pnpm --filter ui lint
pnpm --filter ui lint:fix

# 빌드 캐시 삭제
pnpm --filter ui build:remove
```

## 아키텍처 개요

### 모노레포 구조

```
├── apps/
│   ├── api/           # NestJS 백엔드
│   └── ui/            # Next.js 프론트엔드
├── package.json       # 루트 워크스페이스 설정
└── pnpm-workspace.yaml
```

### API 아키텍처 (NestJS)

- **프레임워크**: Fastify 어댑터를 사용하는 NestJS
- **데이터베이스**: PostgreSQL 및 Prisma ORM
- **인증**: 쿠키 기반 세션을 사용하는 JWT
- **유효성 검사**: NestJS 파이프를 사용하는 Zod 스키마
- **문서화**: `/api` 경로에서 Swagger API 문서 제공

주요 모듈:

- `AuthModule`: JWT 인증, 로그인, 회원가입
- `UsersModule`: 사용자 관리 및 프로필
- `AdminModule`: 관리자 기능
- `PrismaModule`: 전역 데이터베이스 연결 및 스키마

### UI 아키텍처 (Next.js)

- **프레임워크**: Next.js 15 (App Router) 및 React 19
- **스타일링**: TailwindCSS v4 (CSS-in-JS) + shadcn/ui 컴포넌트
- **상태 관리**: TanStack Query (서버) + Zustand (클라이언트)
- **폼**: React Hook Form + Zod 유효성 검사
- **인증**: 자동 토큰 갱신 기능이 있는 JWT

라우트 그룹:

- `(auth)/`: 인증 페이지
- `(profile)/`: 사용자 프로필 관리
- `(admin)/`: 관리자 기능
- `(common)/`: 공통 레이아웃 및 컴포넌트

### 데이터베이스 스키마

- **ORM**: PostgreSQL을 사용하는 Prisma ORM
- **테이블**: 사용자 정보, 게시물, 카테고리, 태그, 댓글
- **Enums**: 사용자 역할, 게시물 상태, Y/N 플래그
- **스키마 위치**: `apps/api/src/endpoints/prisma/`
- **스키마 파일**: `apps/api/prisma/schema.prisma`
- **전역 모듈**: `PrismaModule`이 전역 PrismaClient 인스턴스 제공
- **연결**: ConfigService의 연결 문자열 사용

## 개발 워크플로우

### 일반적인 작업

1.  **개발 서버 시작**:

    ```bash
    # 터미널 1 - API
    pnpm --filter api dev

    # 터미널 2 - UI
    pnpm --filter ui dev
    ```

2.  **데이터베이스 변경**:

    ```bash
    # 스키마 파일 수정: apps/api/prisma/schema.prisma
    pnpm --filter api db:generate
    pnpm --filter api db:migrate
    ```

3.  **새 의존성 추가**:

    ```bash
    # API 의존성
    pnpm --filter api add <package>

    # UI 의존성
    pnpm --filter ui add <package>
    ```

### 코드 컨벤션

- **API**: 리포지토리, 서비스, 컨트롤러를 갖춘 모듈식 NestJS 구조
- **UI**: 라우트 그룹과 컴포넌트 공동 위치를 사용하는 App Router
- **공통**: TypeScript strict 모드, 스타일 규칙을 포함한 ESLint
- **데이터베이스**: 타입 안전성을 갖춘 Prisma 스키마 우선 접근 방식

## UI 개발 규칙

### React 컴포넌트 규칙

- **CRITICAL**: 컴포넌트는 화살표 함수가 아닌, **함수 선언식**으로 작성합니다.
- **CRITICAL**: `apps/ui/app/(common)/_components/ui` 폴더에 있는 **shadcn** 컴포넌트를 제외한 모든 사용자 정의 컴포넌트는 **cva** 구조를 가져야 합니다.
- **CRITICAL**: 컴포넌트의 이름은 `PascalCase`로 작성합니다.
- 컴포넌트 파일 이름과 컴포넌트 이름은 같아야 합니다.
- 이벤트 핸들러 이름은 `on<Event><Target>` 형식을 따릅니다 (예: `onClickButton`, `onSubmitForm`).

cva 구조 예시:

```typescript
const cssVariants = cva(["flex flex-col gap-2"], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});
```

### TailwindCSS v4 커스텀 규칙

이 프로젝트는 TailwindCSS v4를 광범위하게 커스터마이징하여 사용합니다.

#### 색상 시스템 (OKLCH)
- 모든 색상은 `apps/ui/app/_styles/colors.css`에 정의된 OKLCH 색 공간을 사용합니다.
- CSS 변수를 통해 다크 모드를 지원합니다.
- 클래스명: `bg-red-500`, `text-blue-600`, `border-gray-200`

#### 커스텀 유틸리티

**DVH/DVW 단위** (모바일 뷰포트 지원):
- 클래스명: `h-dvh-100`, `w-dvw-50`
- 모바일 브라우저에서 vh/vw보다 안정적입니다.

**확장된 Border Radius**:
- 커스텀 radius 값: `rounded-0`, `rounded-px`, `rounded-1`부터 `rounded-120`까지 사용 가능합니다.
- 기본 Tailwind보다 훨씬 세밀한 제어를 제공합니다.

**커스텀 Variants**:
- `first:mt-0`, `last:mb-0`: 첫 번째/마지막 요소 선택자
- `hocus:bg-primary`: hover와 focus 동시 적용
- `nth-1:block`, `nth-2:hidden`: n번째 자식 선택자
- `nth-last-1:border-t`: 뒤에서 n번째 자식 선택자

#### 폰트 시스템
- 기본: 'Noto Sans KR' (한글 최적화)
- 코드: 'Cascadia Code' - `font-code` 클래스
- 아이콘: 'Font Awesome 5 Free' - `font-fa` 클래스

#### 텍스트 크기 커스텀
- `text-xs`: 0.8rem
- `text-sm`: 1rem
- `text-md`: 1.2rem
- `text-lg`: 1.4rem
- `text-h1` ~ `text-h6`: 헤딩 크기

**중요**: 색상, radius, 폰트에 기본 Tailwind 클래스를 사용하지 마세요. `apps/ui/app/_styles/`에 정의된 커스텀 OKLCH 팔레트와 유틸리티를 사용해야 합니다.

### Import 순서

import 구문은 항상 다음 순서로 정리합니다.

```typescript
// 1. 외부 라이브러리 (알파벳 순)
import { NextResponse } from "next/server";
import { create } from "zustand";

// 2. 내부 유틸리티 및 설정
import { siteConfig } from "@/_config/config";

// 3. 도메인 엔티티
import { useAuth } from "@/_entities/auth";

// 4. 컴포넌트 (UI 먼저, 그 다음 커스텀)
import { Button } from "@/(common)/_components/ui/button";
import { CustomComponent } from "@/(common)/_components/CustomComponent";
```

## 중요 참고사항

- API는 8000번 포트에서 실행됩니다.
- UI는 3000번 포트에서 Turbopack으로 실행됩니다.
- 각 앱(`api`, `ui`)은 독립적인 `CLAUDE.md`와 `GEMINI.md` 파일을 가지고 있으며, 더 상세한 가이드를 포함할 수 있습니다.
- 모든 패키지 관리는 `pnpm`을 사용합니다.
- 각 앱은 자체적인 린팅 및 빌드 설정을 가집니다.

## 테스트 및 품질

커밋하기 전에 항상 린팅을 실행하세요:

```bash
pnpm --filter api lint
pnpm --filter ui lint
```

데이터베이스 마이그레이션은 배포 전에 생성하고 테스트해야 합니다:

```bash
pnpm --filter api db:generate
pnpm --filter api db:migrate
```