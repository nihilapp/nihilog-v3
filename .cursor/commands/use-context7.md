# Context7 사용 가이드

Context7 MCP를 사용하여 최신 라이브러리 및 프레임워크 문서를 가져와 사용자의 질문사항 또는 요구사항을 처리합니다.

## 기본 원칙

1. **자동 사용**: 코드 생성, 설정 또는 구성 단계, 라이브러리/API 문서가 필요한 경우 자동으로 Context7 MCP 도구를 사용합니다. 사용자가 명시적으로 요청하지 않아도 필요한 경우 Context7 MCP 도구를 자동으로 사용하여 라이브러리 ID를 찾고 문서를 가져옵니다.
2. **명시적 Library ID 사용**: 특정 라이브러리가 필요할 때는 Library ID를 명시적으로 지정하여 정확한 문서를 가져옵니다.
3. **최신 정보 활용**: Context7을 통해 최신 버전의 문서와 코드 예제를 활용하여 정확한 코드를 생성합니다.

## Auto-Invoke 규칙

MCP 클라이언트(Cursor, Windsurf, Claude Code 등)에 Context7을 자동으로 사용하도록 설정하는 규칙:

```txt
Always use context7 when I need code generation, setup or configuration steps, or
library/API documentation. This means you should automatically use the Context7 MCP
tools to resolve library id and get docs without me having to explicitly ask.
```

이 규칙은 코드 생성, 설정 또는 구성 단계, 라이브러리/API 문서가 필요한 경우 Context7 MCP 도구를 자동으로 호출하도록 합니다. 즉, 사용자가 명시적으로 요청하지 않아도 필요한 경우 자동으로 `resolve-library-id`와 `get-library-docs` 도구를 사용합니다.

## 사용 방법

### 기본 사용

사용자의 요청이 라이브러리, 프레임워크, 또는 API 사용과 관련된 경우 Context7을 자동으로 활용합니다.

예시:

- "Next.js 15에서 미들웨어를 만들어줘"
- "TanStack React Query를 사용해서 데이터 페칭을 구현해줘"
- "Prisma ORM으로 데이터베이스 쿼리를 작성해줘"

### 명시적 Library ID 지정

특정 라이브러리의 정확한 문서가 필요한 경우 Library ID를 명시적으로 지정할 수 있습니다.

예시:

- "Supabase 인증을 구현해줘. use library /supabase/supabase for API and docs."
- "Next.js App Router를 사용해서 라우팅을 설정해줘. use library /vercel/next.js"

## 프로젝트에서 자주 사용하는 라이브러리

이 프로젝트에서 사용 중인 주요 라이브러리들의 Context7 Library ID:

- **Next.js**: `/vercel/next.js`
- **React**: `/facebook/react`
- **TanStack React Query**: `/tanstack/react-query`
- **Prisma**: `/prisma/prisma`
- **NestJS**: `/nestjs/nest`
- **Zod**: `/colinhacks/zod`
- **React Hook Form**: `/react-hook-form/react-hook-form`
- **TailwindCSS**: `/tailwindlabs/tailwindcss`

## 작업 흐름

1. 사용자의 요청을 분석하여 필요한 라이브러리나 프레임워크를 파악합니다.
2. Context7의 `resolve-library-id` 도구를 사용하여 적절한 Library ID를 찾습니다.
3. `get-library-docs` 도구를 사용하여 최신 문서를 가져옵니다.
4. 가져온 문서를 기반으로 정확하고 최신 정보를 반영한 코드를 생성합니다.

## 주의사항

- Context7은 항상 최신 버전의 문서를 제공하므로, 사용 중인 프로젝트의 버전과 일치하는지 확인합니다.
- 프로젝트의 기존 코드 스타일과 컨벤션을 유지하면서 Context7에서 가져온 정보를 적용합니다.
- 타입스크립트 관련 요청의 경우 프로젝트의 strict 모드 설정을 고려합니다.
