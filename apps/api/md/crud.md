# CRUD 메소드 명명 규칙 및 정의

## 현재 구현 상태 (2025-09-28)

### 🚧 미구현 기능

- **Post**: 게시글 CRUD (기본 구조만 존재, 구현 필요)
- **Category**: 카테고리 CRUD (완전 미구현)
- **Tag**: 태그 CRUD (완전 미구현)
- **Comment**: 댓글 CRUD (완전 미구현)

### 🔄 부분 구현 기능

- **CategorySubscribe**: 관리자 API 미구현

> **완료된 기능들은 [crud.complete.md](./crud.complete.md)에서 확인하세요.**

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

- 삭제(소프트 딜리트) 는 PK 로 삭제합니다.

## 1. User 엔티티 ✅ 완료

## 2. UserSubscribe 엔티티 ✅ 완료

## 3. CategorySubscribe 엔티티 ✅ 완료

## 4. TagSubscribe 엔티티

### 일반 사용자 기능

- [ ] GET /users/subscribes/tags **[USER]**
  - `getTagSubscribeList`
  - headers: Authorization
  - 기능: 사용자가 구독한 태그 목록 조회, 인기 태그별 정렬
- [ ] GET /users/subscribes/tags/:tagNo **[USER]**
  - `getTagSubscribeByTagNo`
  - headers: Authorization
  - params: tagNo: number
  - 기능: 특정 태그 구독 상태 조회, 태그별 알림 설정 확인
- [ ] POST /users/subscribes/tags/:tagNo **[USER]**
  - `createTagSubscribe`
  - headers: Authorization
  - params: tagNo: number
  - 기능: 특정 태그 구독 설정, 태그된 새 글 알림 활성화
- [ ] POST /users/subscribes/tags/multiple **[USER]**
  - `multipleCreateTagSubscribe`
  - headers: Authorization
  - body: CreateTagSubscribeDto (tagNoList 포함)
  - 기능: 다수 태그 일괄 구독, 관심 키워드별 구독 설정
- [ ] PUT /users/subscribes/tags/multiple **[USER]**
  - `multipleUpdateTagSubscribe`
  - headers: Authorization
  - body: UpdateTagSubscribeDto (tagNoList 포함)
  - 기능: 다수 태그 구독 설정 일괄 변경, 알림 빈도 조정
- [ ] DELETE /users/subscribes/tags/:tagNo **[USER]**
  - `deleteTagSubscribe`
  - headers: Authorization
  - params: tagNo: number
  - 기능: 특정 태그 구독 해제, 태그 관련 알림 비활성화
- [ ] DELETE /users/subscribes/tags/multiple **[USER]**
  - `multipleDeleteTagSubscribe`
  - headers: Authorization
  - body: UpdateTagSubscribeDto (tagNoList 포함)
  - 기능: 다수 태그 구독 일괄 해제

### 관리자 기능

- [ ] POST /admin/subscribes/tags/search **[ADMIN]**
  - `adminGetTagSubscribeList`
  - body: SearchTagSubscribeDto
  - 기능: 전체 태그 구독 목록 조회, 태그별 구독 현황 분석, 인기 태그 통계
- [ ] GET /admin/subscribes/tags/:tagNo **[ADMIN]**
  - `adminGetTagSubscribeByTagNo`
  - params: tagNo: number
  - body: SearchTagSubscribeDto
  - 기능: 특정 태그의 구독자 목록 조회, 태그 활용도 분석
- [ ] POST /admin/subscribes/tags **[ADMIN]**
  - `adminCreateTagSubscribe`
  - body: CreateTagSubscribeDto
  - 기능: 관리자가 사용자 대신 태그 구독 설정, 트렌드 태그 추천 시 활용
- [ ] POST /admin/subscribes/tags/multiple **[ADMIN]**
  - `adminMultipleCreateTagSubscribe`
  - body: MultipleCreateTagSubscribeDto
  - 기능: 관리자가 다수 태그 구독 일괄 생성, 신규 태그 홍보
- [ ] PUT /admin/subscribes/tags/:tagSbcrNo **[ADMIN]**
  - `adminUpdateTagSubscribe`
  - params: tagSbcrNo: number
  - body: UpdateTagSubscribeDto
  - 기능: 관리자가 특정 태그 구독 설정 수정, 알림 빈도 관리
- [ ] PUT /admin/subscribes/tags/multiple **[ADMIN]**
  - `adminMultipleUpdateTagSubscribe`
  - body: MultipleUpdateTagSubscribeDto
  - 기능: 관리자가 다수 태그 구독 일괄 수정, 태그 정책 변경 시 활용
- [ ] DELETE /admin/subscribes/tags/:tagSbcrNo **[ADMIN]**
  - `adminDeleteTagSubscribe`
  - params: tagSbcrNo: number
  - body: UpdateTagSubscribeDto
  - 기능: 관리자가 특정 태그 구독 삭제, 스팸 태그 방지 및 정책 위반 처리
- [ ] DELETE /admin/subscribes/tags/multiple **[ADMIN]**
  - `adminMultipleDeleteTagSubscribe`
  - body: MultipleDeleteTagSubscribeDto
  - 기능: 관리자가 다수 태그 구독 일괄 삭제, 태그 정리 및 통합 시 활용

## 5. Post 엔티티

### 일반 사용자 기능

- [ ] GET /posts **[USER]**
  - `getPostList`
  - query: query?, category?, tag?, page?, size?
  - 기능: 공개 게시글 목록 조회, 카테고리/태그 필터링, 검색, 페이징, 조회수순/최신순 정렬
- [ ] GET /posts/:pstNo **[USER]**
  - `getPostByPstNo`
  - params: pstNo: number
  - 기능: 특정 게시글 상세 조회, 조회수 증가, 댓글 수 포함, 이전/다음 글 링크
- [ ] GET /posts/slug/:slug **[USER]**
  - `getPostBySlug`
  - params: slug: string
  - 기능: SEO 친화적 URL로 게시글 조회, 메타 태그 정보 포함

### 관리자 기능

- [ ] POST /admin/posts **[ADMIN]**
  - `adminCreatePost`
  - body: CreatePostDto
  - 기능: 새 게시글 작성, 마크다운 처리, 태그 연결, 썸네일 생성, 발행 상태 설정
- [ ] PATCH /admin/posts/:pstNo **[ADMIN]**
  - `adminUpdatePost`
  - params: pstNo: number
  - body: UpdatePostDto
  - 기능: 게시글 수정, 발행/비공개 상태 변경, 태그 수정, 썸네일 업데이트
- [ ] PATCH /admin/posts/multiple **[ADMIN]**
  - `adminMultipleUpdatePost`
  - body: UpdatePostDto (pstNoList 포함)
  - 기능: 다수 게시글 일괄 수정, 카테고리 일괄 변경, 상태 일괄 변경
- [ ] DELETE /admin/posts/:pstNo **[ADMIN]**
  - `adminDeletePost`
  - params: pstNo: number
  - 기능: 게시글 삭제, 관련 댓글 처리, 태그 연결 해제, 이미지 파일 정리
- [ ] DELETE /admin/posts/multiple **[ADMIN]**
  - `adminMultipleDeletePost`
  - body: UpdatePostDto (pstNoList 포함)
  - 기능: 다수 게시글 일괄 삭제, 관련 데이터 정리

## 6. Category 엔티티

### 일반 사용자 기능

- [ ] GET /categories **[USER]**
  - `getCategoryList`
  - 기능: 전체 카테고리 목록 조회, 계층 구조 표시, 게시글 수 포함, 정렬순 적용
- [ ] GET /categories/:ctgryNo **[USER]**
  - `getCategoryByCtgryNo`
  - params: ctgryNo: number
  - 기능: 특정 카테고리 상세 정보 조회, 하위 카테고리 포함, 게시글 목록
- [ ] GET /categories/name/:name **[USER]**
  - `getCategoryByCtgryNm`
  - params: name: string
  - 기능: 카테고리명으로 검색, 유사 이름 카테고리 제안

### 관리자 기능

- [ ] POST /admin/categories **[ADMIN]**
  - `adminCreateCategory`
  - body: CreateCategoryDto
  - 기능: 새 카테고리 생성, 부모 카테고리 설정, 정렬 순서 지정, URL 슬러그 생성
- [ ] POST /admin/categories/multiple **[ADMIN]**
  - `adminMultipleCreateCategory`
  - body: CreateCategoryDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 일괄 생성, 계층 구조 일괄 설정
- [ ] PATCH /admin/categories/:ctgryNo **[ADMIN]**
  - `adminUpdateCategory`
  - params: ctgryNo: number
  - body: UpdateCategoryDto
  - 기능: 카테고리 정보 수정, 부모 변경, 정렬 순서 변경, 활성/비활성 상태 변경
- [ ] PATCH /admin/categories/multiple **[ADMIN]**
  - `adminMultipleUpdateCategory`
  - body: UpdateCategoryDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 일괄 수정, 정렬 순서 일괄 변경, 상태 일괄 변경
- [ ] DELETE /admin/categories/:ctgryNo **[ADMIN]**
  - `adminDeleteCategory`
  - params: ctgryNo: number
  - 기능: 카테고리 삭제, 하위 카테고리 처리, 관련 게시글 미분류 처리
- [ ] DELETE /admin/categories/multiple **[ADMIN]**
  - `adminMultipleDeleteCategory`
  - body: UpdateCategorySubscribeDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 일괄 삭제, 관련 데이터 정리

## 7. Tag 엔티티

### 일반 사용자 기능

- [ ] GET /tags **[USER]**
  - `getTagList`
  - 기능: 전체 태그 목록 조회, 인기도순/알파벳순 정렬, 사용 횟수 포함
- [ ] GET /tags/:tagNo **[USER]**
  - `getTagByTagNo`
  - params: tagNo: number
  - 기능: 특정 태그 상세 정보 조회, 태그된 게시글 목록, 관련 태그 추천
- [ ] GET /tags/name/:name **[USER]**
  - `getTagByTagNm`
  - params: name: string
  - 기능: 태그명으로 검색, 자동완성 기능, 유사 태그 제안

### 관리자 기능

- [ ] POST /admin/tags **[ADMIN]**
  - `adminCreateTag`
  - body: CreateTagDto
  - 기능: 새 태그 생성, 태그명 중복 검증, URL 슬러그 생성, 색상 설정
- [ ] POST /admin/tags/multiple **[ADMIN]**
  - `adminMultipleCreateTag`
  - body: CreateTagDto (tagNoList 포함)
  - 기능: 다수 태그 일괄 생성, 게시글에서 태그 추출 시 사용
- [ ] PATCH /admin/tags/:tagNo **[ADMIN]**
  - `adminUpdateTag`
  - params: tagNo: number
  - body: UpdateTagDto
  - 기능: 태그 정보 수정, 태그명 변경, 색상 변경, 활성/비활성 상태 변경
- [ ] PATCH /admin/tags/multiple **[ADMIN]**
  - `adminMultipleUpdateTag`
  - body: UpdateTagDto (tagNoList 포함)
  - 기능: 다수 태그 일괄 수정, 태그 분류 일괄 변경, 상태 일괄 변경
- [ ] DELETE /admin/tags/:tagNo **[ADMIN]**
  - `adminDeleteTag`
  - params: tagNo: number
  - 기능: 태그 삭제, 게시글에서 태그 연결 해제, 구독 정보 정리
- [ ] DELETE /admin/tags/multiple **[ADMIN]**
  - `adminMultipleDeleteTag`
  - body: UpdateTagSubscribeDto (tagNoList 포함)
  - 기능: 다수 태그 일괄 삭제, 관련 연결 정보 정리

## 8. Comment 엔티티

### 일반 사용자 기능

- [ ] GET /comments **[USER]**
  - `getCommentList`
  - query: pstNo?, page?, size?
  - 기능: 댓글 목록 조회, 게시글별 필터링, 계층형 댓글 구조, 승인된 댓글만 조회
- [ ] GET /comments/:cmntNo **[USER]**
  - `getCommentByCommentNo`
  - params: cmntNo: number
  - 기능: 특정 댓글 상세 조회, 대댓글 포함, 작성자 정보
- [ ] POST /comments **[USER]**
  - `createComment`
  - body: CreateCommentDto
  - 기능: 새 댓글 작성, 대댓글 작성, 스팸 필터링, 승인 대기 상태 설정
- [ ] PATCH /comments/:cmntNo **[USER]**
  - `updateComment`
  - params: cmntNo: number
  - body: UpdateCommentDto
  - 기능: 댓글 수정(본인), 신고 처리
- [ ] DELETE /comments/:cmntNo **[USER]**
  - `deleteComment`
  - params: cmntNo: number
  - 기능: 댓글 삭제(본인), 대댓글 처리, 삭제 표시 또는 완전 삭제

### 관리자 기능

- [ ] PATCH /admin/comments/:cmntNo **[ADMIN]**
  - `adminUpdateComment`
  - params: cmntNo: number
  - body: UpdateCommentDto
  - 기능: 댓글 승인/거부 상태 변경(관리자), 신고 처리
- [ ] PATCH /admin/comments/multiple **[ADMIN]**
  - `adminMultipleUpdateComment`
  - body: UpdateCommentDto (cmntNoList 포함)
  - 기능: 다수 댓글 일괄 수정, 상태 일괄 변경, 스팸 일괄 처리
- [ ] DELETE /admin/comments/:cmntNo **[ADMIN]**
  - `adminDeleteComment`
  - params: cmntNo: number
  - 기능: 댓글 삭제(관리자), 대댓글 처리, 삭제 표시 또는 완전 삭제
- [ ] DELETE /admin/comments/multiple **[ADMIN]**
  - `adminMultipleDeleteComment`
  - body: UpdateCommentDto (cmntNoList 포함)
  - 기능: 다수 댓글 일괄 삭제, 스팸 댓글 일괄 정리
