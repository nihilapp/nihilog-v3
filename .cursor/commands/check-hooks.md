**CRITICAL**: 번호와 함께 **?번 점검** 이라고 전달하면 엔티티 점검 순서에 기재된 순서에 따라 그 번호에 맞는 엔티티와 컨트롤러를 점검합니다. 예를 들어 1번 점검이라고 하면, AuthController 를 점검합니다.

**CRITICAL**: 쿼리 훅에서만 요청에 대한 처리 후 페이지 이동을 담당합니다. 따라서 요청, 응답에 대한 처리 후 페이지 이동은 훅에서 진행해야 합니다.

# 작업 목적

1. 기본 쿼리 훅 파일들(하단 참고)을 기반으로 커스텀 훅을 작성합니다.
2. 기존에 존재하는 커스텀 훅이 올바르게 구현되고 사용되는지 점검합니다.

# 작업 내용

## 1. 엔드포인트와 커스텀 훅 매칭 점검

`md/check.md` 파일을 참고하여 다음을 확인합니다:

- **개수 일치**: 각 컨트롤러의 엔드포인트 개수와 해당 엔티티 폴더(`apps/ui/app/_entities/{엔티티명}/hooks/`)에 존재하는 커스텀 훅 파일 개수가 일치하는지 확인
- **이름 유사도**: 엔드포인트 메소드명과 HTTP 메서드, 경로를 분석하여 커스텀 훅의 이름이 적절한지 확인

## 2. 타입 임포트 규칙

- 커스텀 훅의 매개변수에서 `option` 객체를 사용하지 않습니다. 발견하면 지워버립니다. 반드시 지웁니다.
- **CRITICAL**: 요청 타입은 `apps/ui/app/_schemas`에서 임포트하며, 반드시 `index.ts`에 존재하는 항목만 임포트합니다.
- **CRITICAL**: 응답 타입은 `apps/ui/app/_types`에서 임포트하며, 반드시 `index.ts`에 존재하는 항목만 임포트합니다.
- `index.ts` 파일을 확인하여 실제로 export된 타입만 사용합니다.

## 3. 콜백 함수 점검

- **errorCallback**: 토스트를 통해 서버 메시지를 출력하는지 확인합니다.
- **callback**:
  - 토스트를 통해 서버 메시지를 출력하는지 확인합니다.
  - 논리적인 절차에 따라 router를 수행하는지 확인합니다.
  - 일반적인 웹 사이트 패턴을 참고하여 router 사용 여부를 판단합니다.

## 4. 완료 표시

**CRITICAL**: 점검과 수정을 완료한 경우, 엔티티 점검 순서 섹션의 해당 번호에 완료 표시(✅)를 추가합니다.

# 작업 내용 1번 점검 방법

## 엔드포인트 개수 vs 커스텀 훅 개수

`md/check.md`에 나열된 각 컨트롤러의 엔드포인트 개수와 해당 엔티티 폴더(`apps/ui/app/_entities/{엔티티명}/hooks/`)에 존재하는 커스텀 훅 파일 개수를 비교합니다.

## 이름 유사도 점검

컨트롤러의 실제 엔드포인트 메소드(메소드명, 데코레이터의 HTTP 메서드 및 경로)를 분석하여, 해당하는 커스텀 훅의 이름이 적절한지 확인합니다.

예시:

- `createUser()` 메소드 `@Post()` → `use-create-user` 또는 `useCreateUser`
- `getUserProfile()` 메소드 `@Get('profile')` → `use-get-user-profile` 또는 `useGetUserProfile`
- `updateUserSubscribe()` 메소드 `@Put('subscribe')` → `use-update-user-subscribe` 또는 `useUpdateUserSubscribe`

# 엔티티 점검 순서

`md/check.md`의 컨트롤러 명과 실제 엔티티 폴더 구조의 매핑:

- [x] AuthController → `apps/ui/app/_entities/auth/hooks/` ✅ (5개 엔드포인트 = 5개 훅)
- [x] UserController → `apps/ui/app/_entities/users/hooks/` ✅ (6개 엔드포인트 = 6개 훅)
- [x] PostsController → `apps/ui/app/_entities/posts/hooks/` ✅ (11개 엔드포인트 = 11개 훅)
- [x] TagController → `apps/ui/app/_entities/tags/hooks/` ✅ (3개 엔드포인트 = 3개 훅)
- [x] CommentsController → `apps/ui/app/_entities/comments/hooks/` ✅ (5개 엔드포인트 = 5개 훅)
- [x] CategoriesController → `apps/ui/app/_entities/categories/hooks/` ✅ (3개 엔드포인트 = 3개 훅)
- [x] CategorySubscribeController → `apps/ui/app/_entities/subscribe/category-subscribe/hooks/` ✅ (8개 엔드포인트 = 8개 훅)
- [x] TagSubscribeController → `apps/ui/app/_entities/subscribe/tag-subscribe/hooks/` ✅ (8개 엔드포인트 = 8개 훅)
- [x] AdminController → `apps/ui/app/_entities/admin/hooks/` ✅ (1개 엔드포인트 = 1개 훅)
- [x] AdminUserController → `apps/ui/app/_entities/admin/users/hooks/` ✅ (20개 엔드포인트 = 20개 훅)
- [x] AdminPostsController → `apps/ui/app/_entities/admin/posts/hooks/` ✅ (12개 엔드포인트 = 12개 훅)
- [x] AdminSubscribeController → `apps/ui/app/_entities/admin/subscribe/hooks/` ✅ (10개 엔드포인트 = 10개 훅)
- [x] AdminCategorySubscribeController → `apps/ui/app/_entities/admin/subscribes/categories/hooks/` ✅ (3개 엔드포인트 = 3개 훅)
- [x] AdminTagSubscribeController → `apps/ui/app/_entities/admin/subscribes/tags/hooks/` ✅ (3개 엔드포인트 = 3개 훅)
- [x] AdminTagsController → `apps/ui/app/_entities/admin/tags/hooks/` ✅ (25개 엔드포인트 = 25개 훅)
- [x] AdminCommentsController → `apps/ui/app/_entities/admin/comments/hooks/` ✅ (12개 엔드포인트 = 12개 훅)
- [x] AdminCategoriesController → `apps/ui/app/_entities/admin/categories/hooks/` ✅ (22개 엔드포인트 = 22개 훅)

**총 157개 엔드포인트, 157개 훅 파일 모두 일치 확인 완료**

# 작업 결과 보고

```
1번 결과:
2번 결과:
3번 결과:
- errorCallback 점검 결과:
- callback 점검 결과:
- router 점검 결과:

최종 결과 요약
```

# 참고 파일

## 쿼리 훅 파일 목록

- `apps/ui/app/_entities/common/hooks/query/use-get.ts`
- `apps/ui/app/_entities/common/hooks/query/use-post.ts`
- `apps/ui/app/_entities/common/hooks/query/use-put.ts`
- `apps/ui/app/_entities/common/hooks/query/use-patch.ts`
- `apps/ui/app/_entities/common/hooks/query/use-delete.ts`
- `apps/ui/app/_entities/common/hooks/query/use-deletes.ts`
  - **CRITICAL**: TBody 타입이 존재하면 useDeletes 를 사용합니다.

## 연관 파일 경로

- 요청 타입: `apps/ui/app/_schemas`
- 응답 타입: `apps/ui/app/_types`
