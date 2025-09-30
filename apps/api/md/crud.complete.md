# 완료된 CRUD 기능 목록

## 현재 구현 상태 (2025-09-28)

### ✅ 완료된 기능

- **Auth 관련**: 로그인, 로그아웃, 세션 관리, 토큰 갱신, 비밀번호 변경
- **User 관련**: 프로필 조회/수정, 구독 설정, 계정 생성/삭제
- **Admin User 관리**: 사용자 검색, 조회, 생성, 수정, 삭제 (단건/다건)
- **Admin Subscribe 관리**: 구독 설정 조회, 생성, 수정, 삭제 (단건/다건)
- **CategorySubscribe**: 일반 사용자 API 및 관리자 API 완료
- **TagSubscribe**: 일반 사용자 API 및 관리자 API 완료

## 명명 규칙

- **다건 조회**: `get<Entity>List`
- **단건 조회**: `get<Entity>By<FindKey>`
- **신규 추가**: `create<Entity>`
- **다건 추가**: `multipleCreate<Entity>`
- **수정**: `update<Entity>`
- **다건 수정**: `multipleUpdate<Entity>`
- **삭제**: `delete<Entity>`
- **다건 삭제**: `multipleDelete<Entity>`

## 주의사항

- 삭제(소프트 딜리트)는 PK로 삭제합니다.

## 1. User 엔티티

### 1.1. Auth 관련

- [x] POST /auth/signin **[USER]**
  - `signIn`
  - body: SignInDto
  - 기능: 이메일/패스워드 검증, JWT 토큰 생성, HttpOnly 쿠키 설정, 로그인 이력 저장
- [x] POST /auth/signout **[USER]**
  - `signOut`
  - headers: Authorization
  - 기능: JWT 토큰 무효화, 쿠키 삭제, 로그아웃 이력 저장
- [x] GET /auth/session **[USER]**
  - `getSession`
  - headers: Authorization
  - 기능: 현재 로그인 사용자 정보 조회, 토큰 유효성 검증
- [x] POST /auth/refresh **[USER]**
  - `refreshToken`
  - body: RefreshTokenDto
  - 기능: Refresh Token 검증, 새로운 Access Token 발급
- [x] POST /auth/change-password **[USER]**
  - `changePassword`
  - headers: Authorization
  - body: ChangePasswordDto
  - 기능: 현재 로그인 사용자의 비밀번호 변경

### 1.2. User CRUD

## 일반 사용자 기능

- [x] GET /users/profile **[USER]**
  - `getUserProfile`
  - headers: Authorization
  - 기능: 본인 프로필 조회, 구독 정보 포함
- [x] GET /users/subscribe **[USER]**
  - `getUserSubscribeByUserNo`
  - headers: Authorization
  - 기능: 현재 사용자의 구독 설정 조회, 이메일/푸시 알림 설정 상태 확인
- [x] POST /users **[USER]** (구 auth/signup)
  - `createUser` (구 signUp)
  - body: CreateUserDto
  - 기능: 일반 사용자 계정 생성, 이메일 중복 검증, 패스워드 해싱
- [x] PUT /users/profile **[USER]**
  - `updateUserProfile`
  - headers: Authorization
  - body: UpdateUserProfileDto
  - 기능: 본인 정보 수정, 패스워드 변경, 프로필 이미지 업데이트
- [x] PUT /users/subscribe **[USER]**
  - `updateUserSubscribe`
  - headers: Authorization
  - body: UpdateSubscribeDto
  - 기능: 사용자 구독 설정 변경, 이메일 알림 on/off, 푸시 알림 설정
- [x] DELETE /users/profile **[USER]**
  - `deleteUserProfile`
  - headers: Authorization
  - 기능: 본인 계정 탈퇴, 관련 구독 정보 삭제, 댓글 익명화 처리

## 관리자 기능

- [x] POST /admin/users/search **[ADMIN]**
  - `adminGetUserList`
  - body: SearchUserDto
  - 기능: 사용자 목록 검색, 이름/이메일/역할별 필터링, 페이징, 정렬, 부분 일치(ILIKE) 검색
- [x] GET /admin/users/:userNo **[ADMIN]**
  - `adminGetUserByUserNo`
  - params: userNo: number
  - 기능: 특정 사용자 상세 정보 조회, 민감정보 제외(암호/토큰)
- [x] GET /admin/users/name/:name **[ADMIN]**
  - `adminGetUserByUserNm`
  - params: name: string
  - 기능: 사용자명으로 사용자 조회(완전 일치), 민감정보 제외
- [x] GET /admin/users/email/:email **[ADMIN]**
  - `adminGetUserByEmlAddr`
  - params: email: string
  - 기능: 이메일로 사용자 조회(완전 일치), 민감정보 제외
- [x] POST /admin/users **[ADMIN]**
  - `adminCreateUser`
  - body: CreateUserDto
  - 기능: 신규 사용자 계정 생성, 패스워드 해싱, 이메일 중복 검증, 기본 권한 설정
- [x] PUT /admin/users/:userNo **[ADMIN]**
  - `adminUpdateUser`
  - params: userNo: number
  - body: UpdateUserDto
  - 기능: 사용자 정보 수정, 권한 변경, 상태 변경(활성화/비활성화), 존재 여부 확인
- [x] PUT /admin/users/multiple **[ADMIN]**
  - `adminMultipleUpdateUser`
  - body: UpdateUserDto (userNoList 포함)
  - 기능: 다수 사용자 일괄 수정(userNoList 기반), 권한 일괄 변경, 상태 일괄 변경, 성공/실패 통계 반환
- [x] DELETE /admin/users/:userNo **[ADMIN]**
  - `adminDeleteUser`
  - params: userNo: number
  - 기능: 사용자 계정 소프트 삭제, 존재 여부 확인, 사용/삭제 상태 변경
- [x] DELETE /admin/users/multiple **[ADMIN]**
  - `adminMultipleDeleteUser`
  - body: UpdateUserDto (userNoList 포함)
  - 기능: 다수 사용자 일괄 소프트 삭제, 사용/삭제 상태 일괄 변경

## 2. UserSubscribe 엔티티

### 관리자 기능

- [x] GET /admin/subscribes **[ADMIN]**
  - `adminGetUserSubscribeList`
  - 기능: 전체 사용자 구독 설정 목록 조회, 구독률 통계, 필터링
- [x] POST /admin/subscribes **[ADMIN]**
  - `adminCreateUserSubscribe`
  - body: CreateSubscribeDto
  - 기능: 관리자가 특정 사용자 구독 설정 생성, 기본 구독 설정 적용
- [x] PUT /admin/subscribes/multiple **[ADMIN]**
  - `adminMultipleUpdateUserSubscribe`
  - body: UpdateSubscribeDto (userNoList 포함)
  - 기능: 다수 사용자 구독 설정 일괄 변경, 정책 변경 시 일괄 적용
- [x] DELETE /admin/subscribes/:sbcrNo **[ADMIN]**
  - `adminDeleteUserSubscribe`
  - params: sbcrNo: number
  - 기능: 특정 사용자 구독 설정 삭제, 모든 알림 비활성화
- [x] DELETE /admin/subscribes/multiple **[ADMIN]**
  - `adminMultipleDeleteUserSubscribe`
  - body: UpdateSubscribeDto (userNoList 포함)
  - 기능: 다수 사용자 구독 설정 일괄 삭제

## 3. CategorySubscribe 엔티티

### 일반 사용자 기능

- [x] GET /users/subscribes/categories **[USER]**
  - `getCategorySubscribeList`
  - headers: Authorization
  - 기능: 사용자가 구독한 카테고리 목록 조회, 구독 상태별 필터링
- [x] GET /users/subscribes/categories/:ctgryNo **[USER]**
  - `getCategorySubscribeByCtgryNo`
  - headers: Authorization
  - params: ctgryNo: number
  - 기능: 특정 카테고리 구독 상태 조회, 알림 설정 확인
- [x] POST /users/subscribes/categories/:ctgryNo **[USER]**
  - `createCategorySubscribe`
  - headers: Authorization
  - params: ctgryNo: number
  - 기능: 특정 카테고리 구독 설정, 새 글 알림 활성화
- [x] POST /users/subscribes/categories/multiple **[USER]**
  - `multipleCreateCategorySubscribe`
  - headers: Authorization
  - body: CreateCategorySubscribeDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 일괄 구독, 관심 주제별 구독 설정
- [x] PUT /users/subscribes/categories/:ctgrySbcrNo **[USER]**
  - `updateCategorySubscribe`
  - headers: Authorization
  - params: ctgrySbcrNo: number
  - body: UpdateCategorySubscribeDto
  - 기능: 특정 카테고리 구독 설정 변경, 알림 방식 변경
- [x] PUT /users/subscribes/categories/multiple **[USER]**
  - `multipleUpdateCategorySubscribe`
  - headers: Authorization
  - body: UpdateCategorySubscribeDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 구독 설정 일괄 변경, 알림 방식 변경
- [x] DELETE /users/subscribes/categories/:ctgrySbcrNo **[USER]**
  - `deleteCategorySubscribe`
  - headers: Authorization
  - params: ctgrySbcrNo: number
  - 기능: 특정 카테고리 구독 해제, 관련 알림 비활성화
- [x] DELETE /users/subscribes/categories/multiple **[USER]**
  - `multipleDeleteCategorySubscribe`
  - headers: Authorization
  - body: UpdateCategorySubscribeDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 구독 일괄 해제

### 관리자 기능

- [x] POST /admin/subscribes/categories/search **[ADMIN]**
  - `adminGetCategorySubscribeList`
  - body: SearchCategorySubscribeDto
  - 기능: 전체 카테고리 구독 목록 조회, 카테고리별 구독 현황 분석, 페이징, 정렬
- [x] GET /admin/subscribes/categories/:ctgryNo **[ADMIN]**
  - `adminGetCategorySubscribeByCtgryNo`
  - params: ctgryNo: number
  - body: SearchCategorySubscribeDto
  - 기능: 특정 카테고리의 구독자 목록 조회, 구독자 통계 분석
- [x] POST /admin/subscribes/categories **[ADMIN]**
  - `adminCreateCategorySubscribe`
  - body: CreateCategorySubscribeDto
  - 기능: 관리자가 사용자 대신 카테고리 구독 설정, 대량 마케팅 시 활용
- [x] POST /admin/subscribes/categories/multiple **[ADMIN]**
  - `adminMultipleCreateCategorySubscribe`
  - body: MultipleCreateCategorySubscribeDto
  - 기능: 관리자가 다수 카테고리 구독 일괄 생성, 신규 카테고리 홍보
- [x] PUT /admin/subscribes/categories/:ctgrySbcrNo **[ADMIN]**
  - `adminUpdateCategorySubscribe`
  - params: ctgrySbcrNo: number
  - body: UpdateCategorySubscribeDto
  - 기능: 관리자가 특정 카테고리 구독 설정 수정, 알림 설정 관리
- [x] PUT /admin/subscribes/categories/multiple **[ADMIN]**
  - `adminMultipleUpdateCategorySubscribe`
  - body: MultipleUpdateCategorySubscribeDto
  - 기능: 관리자가 다수 카테고리 구독 일괄 수정, 정책 변경 시 활용
- [x] DELETE /admin/subscribes/categories/:ctgrySbcrNo **[ADMIN]**
  - `adminDeleteCategorySubscribe`
  - params: ctgrySbcrNo: number
  - body: UpdateCategorySubscribeDto
  - 기능: 관리자가 특정 카테고리 구독 삭제, 스팸 방지 및 정책 위반 처리
- [x] DELETE /admin/subscribes/categories/multiple **[ADMIN]**
  - `adminMultipleDeleteCategorySubscribe`
  - body: MultipleDeleteCategorySubscribeDto
  - 기능: 관리자가 다수 카테고리 구독 일괄 삭제, 카테고리 폐지 시 활용

## 4. TagSubscribe 엔티티

### 일반 사용자 기능

- [x] GET /users/subscribes/tags **[USER]**
  - `getTagSubscribeList`
  - headers: Authorization
  - body: SearchTagSubscribeDto
  - 기능: 사용자가 구독한 태그 목록 조회, 인기 태그별 정렬
- [x] GET /users/subscribes/tags/:tagNo **[USER]**
  - `getTagSubscribeByTagNo`
  - headers: Authorization
  - params: tagNo: number
  - body: SearchTagSubscribeDto
  - 기능: 특정 태그 구독 상태 조회, 태그별 알림 설정 확인
- [x] POST /users/subscribes/tags/:tagNo **[USER]**
  - `createTagSubscribe`
  - headers: Authorization
  - params: tagNo: number
  - body: CreateTagSubscribeDto
  - 기능: 특정 태그 구독 설정, 태그된 새 글 알림 활성화
- [x] POST /users/subscribes/tags/multiple **[USER]**
  - `multipleCreateTagSubscribe`
  - headers: Authorization
  - body: MultipleCreateTagSubscribeDto
  - 기능: 다수 태그 일괄 구독, 관심 키워드별 구독 설정
- [x] PUT /users/subscribes/tags/multiple **[USER]**
  - `multipleUpdateTagSubscribe`
  - headers: Authorization
  - body: MultipleUpdateTagSubscribeDto
  - 기능: 다수 태그 구독 설정 일괄 변경, 알림 빈도 조정
- [x] DELETE /users/subscribes/tags/:tagSbcrNo **[USER]**
  - `deleteTagSubscribe`
  - headers: Authorization
  - params: tagSbcrNo: number
  - 기능: 특정 태그 구독 해제, 태그 관련 알림 비활성화
- [x] DELETE /users/subscribes/tags/multiple **[USER]**
  - `multipleDeleteTagSubscribe`
  - headers: Authorization
  - body: MultipleDeleteTagSubscribeDto
  - 기능: 다수 태그 구독 일괄 해제

### 관리자 기능

- [x] POST /admin/subscribes/tags/search **[ADMIN]**
  - `adminGetTagSubscribeList`
  - body: SearchTagSubscribeDto
  - 기능: 전체 태그 구독 목록 조회, 태그별 구독 현황 분석, 인기 태그 통계
- [x] GET /admin/subscribes/tags/:tagNo **[ADMIN]**
  - `adminGetTagSubscribeByTagNo`
  - params: tagNo: number
  - body: SearchTagSubscribeDto
  - 기능: 특정 태그의 구독자 목록 조회, 태그 활용도 분석
- [x] POST /admin/subscribes/tags **[ADMIN]**
  - `adminCreateTagSubscribe`
  - body: CreateTagSubscribeDto
  - 기능: 관리자가 사용자 대신 태그 구독 설정, 트렌드 태그 추천 시 활용
- [x] POST /admin/subscribes/tags/multiple **[ADMIN]**
  - `adminMultipleCreateTagSubscribe`
  - body: MultipleCreateTagSubscribeDto
  - 기능: 관리자가 다수 태그 구독 일괄 생성, 신규 태그 홍보
- [x] PUT /admin/subscribes/tags/:tagSbcrNo **[ADMIN]**
  - `adminUpdateTagSubscribe`
  - params: tagSbcrNo: number
  - body: UpdateTagSubscribeDto
  - 기능: 관리자가 특정 태그 구독 설정 수정, 알림 빈도 관리
- [x] PUT /admin/subscribes/tags/multiple **[ADMIN]**
  - `adminMultipleUpdateTagSubscribe`
  - body: MultipleUpdateTagSubscribeDto
  - 기능: 관리자가 다수 태그 구독 일괄 수정, 태그 정책 변경 시 활용
- [x] DELETE /admin/subscribes/tags/:tagSbcrNo **[ADMIN]**
  - `adminDeleteTagSubscribe`
  - params: tagSbcrNo: number
  - body: UpdateTagSubscribeDto
  - 기능: 관리자가 특정 태그 구독 삭제, 스팸 태그 방지 및 정책 위반 처리
- [x] DELETE /admin/subscribes/tags/multiple **[ADMIN]**
  - `adminMultipleDeleteTagSubscribe`
  - body: MultipleDeleteTagSubscribeDto
  - 기능: 관리자가 다수 태그 구독 일괄 삭제, 태그 정리 및 통합 시 활용
