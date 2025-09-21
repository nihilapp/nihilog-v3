# 엔드포인트 설계

- 검색 스키마 `/apps/api/src/endpoints/drizzle/schemas/search.schema.ts` 를 준수.
- 모든 삭제는 `DEL_YN` 컬럼을 'Y'로 변경하는 소프트 삭제. 삭제시에는 `DEL_DT` 컬럼을 현재 사용자와 시간으로 설정.
- 모든 수정은 `UPDT_DT` 컬럼을 현재 시간으로 업데이트.
- 모든 생성은 `CRT_DT` 컬럼을 현재 시간으로 설정 후 생성(자동 생성).

## User Management (Auth & Admin/Users)

일반 사용자(Auth)와 관리자(Admin/Users) 엔드포인트를 분리합니다.

### 일반 사용자 (Auth)

- [x] POST /auth/signup - 회원가입(일반 사용자)

```ts
interface CreateUserDto {
  emlAddr: string;
  userNm: string;
  userRole: "USER";
  password: string;
}
```

- [x] POST /auth/signin - 로그인 (JWT 발급)

```ts
interface SignInDto {
  emlAddr: string;
  password: string;
}
```

- [x] POST /auth/refresh - 토큰 재발급 (리프레시 토큰 필요)

  - Cookies
    - refreshToken: string

- [x] POST /auth/signout - 로그아웃 (쿠키 정리)

  - Cookies
    - accessToken?: string

- [x] GET /auth/session - 현재 세션 조회 (JWT 필요)

  - Headers
    - Authorization: string // Bearer <accessToken>

- [x] POST /auth/change-password - 비밀번호 변경 (JWT 필요) 마지막 비밀번호 변경일자 파악 후 3개월 후 방문할 때마다 비밀번호 변경 알림

```ts
interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
```

### 관리자 (Admin/Users)

- [x] POST /admin/users - 새 admin 생성

```ts
interface CreateAdminDto {
  emlAddr: string;
  userNm: string;
  userRole: "ADMIN";
  password: string;
}
```

- [x] POST /admin/users/search - 사용자 목록 검색 (부분 일치, delYn 기본 N)

```ts
interface SearchUserDto {
  strtRow: number;
  endRow: number;
  srchType: "emlAddr" | "userNm" | "userRole";
  srchKywd: string;
  delYn: "Y" | "N";
}
```

- [x] GET /admin/users/:userNo - 사용자 번호로 단건 조회

  - Params
    - userNo: number

- [x] GET /admin/users/name/:name - 사용자명(완전 일치)으로 단건 조회

  - Params
    - name: string

- [x] GET /admin/users/email/:email - 이메일(완전 일치)로 단건 조회

  - Params
    - email: string

- [x] PUT /admin/profile - 관리자 프로필 수정 (닉네임/이미지/소개)

```ts
interface UpdateProfileDto {
  userNm?: string;
  proflImg?: string;
  userBiogp?: string;
}
```

## Comments (공개)

- [ ] POST /comments - 방문자 댓글 작성 (vstrEml+vstrPswd 필요)
- [ ] GET /comments?pstNo=&page=&size= - 승인 댓글 목록
- [ ] GET /comments/:cmntNo - 승인 단건 조회
- [ ] PATCH /comments/:cmntNo - 방문자 자가 수정 (이메일+비밀번호 검증)
- [ ] DELETE /comments/:cmntNo - 방문자 자가 삭제 (이메일+비밀번호 검증)

## Admin/Comments (관리자)

- [ ] GET /admin/comments?status=&pstNo=&query=&from=&to= - 목록
- [ ] PATCH /admin/comments/:cmntNo/status - 상태 변경
- [ ] PATCH /admin/comments/:cmntNo - 내용/메타 수정
- [ ] DELETE /admin/comments/:cmntNo - 삭제
- [ ] POST /admin/comments/bulk - 일괄 처리(approve/reject/delete)

## Posts (공개)

- [ ] GET /posts?query=&category=&tag=&page=&size= - 공개글 목록
- [ ] GET /posts/:pstNo - 단건 조회

## Admin/Posts (관리자)

- [ ] POST /admin/posts - 생성
- [ ] PATCH /admin/posts/:pstNo - 수정 (상태/발행 포함)
- [ ] DELETE /admin/posts/:pstNo - 삭제

## Tags (공개)

- [ ] GET /tags - 태그 목록
- [ ] GET /tags/:tagNo - 단건
- [ ] GET /posts?tag= - 태그 기준 게시글 목록

## Admin/Tags (관리자)

- [ ] POST /admin/tags - 생성
- [ ] PATCH /admin/tags/:tagNo - 수정
- [ ] DELETE /admin/tags/:tagNo - 삭제
- [ ] POST /admin/tags/map - 게시글-태그 매핑(옵션)

## Categories (공개)

- [ ] GET /categories - 카테고리 목록(트리/플랫)
- [ ] GET /posts?category= - 카테고리 기준 게시글 목록

## Admin/Categories (관리자)

- [ ] POST /admin/categories - 생성
- [ ] PATCH /admin/categories/:ctgryNo - 수정/트리 재배치
- [ ] DELETE /admin/categories/:ctgryNo - 삭제
