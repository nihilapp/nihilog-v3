# 명령 개요

이 문서는 파일들의 경로를 설명하는 문서입니다. 아래의 파일들을 참고해서 사용자의 요청을 해결합니다.

# 주의 사항

- **CRITICAL** 목록 업데이트 시에는 `hooks` 폴더를 제외합니다.

# 컴포넌트 폴더 경로

## `_components`

- `apps/ui/app/_components`
- `apps/ui/app/_components/admin`
- `apps/ui/app/_components/admin/categories`
- `apps/ui/app/_components/admin/comments`
- `apps/ui/app/_components/admin/posts`
- `apps/ui/app/_components/admin/tags`
- `apps/ui/app/_components/auth`
- `apps/ui/app/_components/common`
- `apps/ui/app/_components/common/home`
- `apps/ui/app/_components/common/not-found`
- `apps/ui/app/_components/ui`
- `apps/ui/app/_components/ui/badge`
- `apps/ui/app/_components/ui/box`
- `apps/ui/app/_components/ui/button`
- `apps/ui/app/_components/ui/form`
- `apps/ui/app/_components/ui/frame`
- `apps/ui/app/_components/ui/input`
- `apps/ui/app/_components/ui/list`
- `apps/ui/app/_components/ui/modal`
- `apps/ui/app/_components/ui/tab`

## `_layouts`

- `apps/ui/app/_layouts`
- `apps/ui/app/_layouts/AdminLayout.tsx`
- `apps/ui/app/_layouts/AuthLayout.tsx`
- `apps/ui/app/_layouts/CommonLayout.tsx`
- `apps/ui/app/_layouts/Providers.tsx`
- `apps/ui/app/_layouts/index.ts`

## `_schemas`

- `apps/ui/app/_schemas`
- `apps/ui/app/_schemas/index.ts`
- `apps/ui/app/_schemas/user.schema.ts`

## 공유 스키마 (packages)

- `packages/schemas/src/schema/*.schema.ts` - Zod 스키마
- `packages/schemas/src/schema/category.schema.ts`
- `packages/schemas/src/schema/category-subscribe.schema.ts`
- `packages/schemas/src/schema/comment.schema.ts`
- `packages/schemas/src/schema/common.schema.ts`
- `packages/schemas/src/schema/enums.schema.ts`
- `packages/schemas/src/schema/post.schema.ts`
- `packages/schemas/src/schema/search.schema.ts`
- `packages/schemas/src/schema/subscribe.schema.ts`
- `packages/schemas/src/schema/tag.schema.ts`
- `packages/schemas/src/schema/tag-subscribe.schema.ts`
- `packages/schemas/src/schema/user.schema.ts`

## `_types`

- `apps/ui/app/_types`
- `apps/ui/app/_types/categories.types.ts`
- `apps/ui/app/_types/common.types.ts`
- `apps/ui/app/_types/index.ts`
- `apps/ui/app/_types/posts.types.ts`
- `apps/ui/app/_types/react-query.d.ts`
- `apps/ui/app/_types/react.d.ts`
- `apps/ui/app/_types/component`
- `apps/ui/app/_types/component/column.types.ts`

## 공유 타입 (packages)

- `packages/schemas/src/types/*.types.ts` - TypeScript 타입
- `packages/schemas/src/types/category-subscribe.types.ts`
- `packages/schemas/src/types/category.types.ts`
- `packages/schemas/src/types/comment.types.ts`
- `packages/schemas/src/types/common.types.ts`
- `packages/schemas/src/types/post.types.ts`
- `packages/schemas/src/types/response.types.ts`
- `packages/schemas/src/types/subscribe.types.ts`
- `packages/schemas/src/types/tag-subscribe.types.ts`
- `packages/schemas/src/types/tag.types.ts`
- `packages/schemas/src/types/user.types.ts`
