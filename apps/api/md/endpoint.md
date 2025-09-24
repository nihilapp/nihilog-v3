# 엔드포인트 설계

개인 블로그 프로젝트 엔드포인트 설계. 글을 발행할 수 있는 블로거와 구독자, 방문자로 구분. 블로거는 ADMIN 이고 구독자는 USER 이다. 방문자는 가입하지 않은 길가던 사람들이다.

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

## Users (구독자)

- [x] GET /users/profile - 자신의 프로필 조회 (JWT 필요)
- [x] PUT /users/profile - 자신의 프로필 수정 (JWT 필요)

```ts
interface UpdateUserProfileDto {
  userNm?: string;
  proflImg?: string;
  userBiogp?: string;
}
```

- [x] DELETE /users/profile - 회원 탈퇴 (JWT 필요)
- [⏳] GET /users/subscription - 이메일 구독 설정 조회 (JWT 필요) **[구독 리포지토리 구현 필요]**
- [⏳] PUT /users/subscription - 이메일 구독 설정 변경 (JWT 필요) **[구독 리포지토리 구현 필요]**

```ts
interface UpdateSubscriptionDto {
  emlNtfyYn?: "Y" | "N";        // 이메일 알림 전체 on/off
  newPstNtfyYn?: "Y" | "N";     // 새 글 알림
  cmntRplNtfyYn?: "Y" | "N";    // 내 댓글 답글 알림
  sbcrCtgryList?: number[];     // 구독할 카테고리 목록
  sbcrTagList?: number[];       // 구독할 태그 목록
}
```

### 구독 관리 API (Users/Subscriptions)

- [⏳] GET /users/subscriptions/categories - 내 카테고리 구독 목록 조회 (JWT 필요)
- [⏳] POST /users/subscriptions/categories/:ctgryNo - 카테고리 구독 추가 (JWT 필요)
- [⏳] DELETE /users/subscriptions/categories/:ctgryNo - 카테고리 구독 삭제 (JWT 필요)

```ts
interface CategorySubscriptionDto {
  ctgrySbcrNo: number;
  sbcrNo: number;
  ctgryNo: number;
  ctgryNm: string;          // 조인해서 카테고리명 포함
  useYn: "Y" | "N";
  crtDt: string;
}
```

- [⏳] GET /users/subscriptions/tags - 내 태그 구독 목록 조회 (JWT 필요)
- [⏳] POST /users/subscriptions/tags/:tagNo - 태그 구독 추가 (JWT 필요)
- [⏳] DELETE /users/subscriptions/tags/:tagNo - 태그 구독 삭제 (JWT 필요)

```ts
interface TagSubscriptionDto {
  tagSbcrNo: number;
  sbcrNo: number;
  tagNo: number;
  tagNm: string;            // 조인해서 태그명 포함
  useYn: "Y" | "N";
  crtDt: string;
}
```

- [⏳] POST /users/subscriptions/bulk - 구독 일괄 설정 (JWT 필요)

```ts
interface BulkSubscriptionDto {
  categories: number[];     // 구독할 카테고리 번호 목록
  tags: number[];          // 구독할 태그 번호 목록
  replaceMode: boolean;    // true: 기존 구독 모두 삭제 후 새로 설정, false: 추가만
}
```

### 기존 댓글 API

- [ ] GET /users/comments?page=&size= - 내가 작성한 댓글 목록 (JWT 필요) **[댓글 시스템 구현 후]**
- [ ] PUT /users/comments/:cmntNo - 내 댓글 수정 (JWT 필요) **[댓글 시스템 구현 후]**
- [ ] DELETE /users/comments/:cmntNo - 내 댓글 삭제 (JWT 필요) **[댓글 시스템 구현 후]**

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
  page: number;
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

- [ ] GET /posts?query=&category=&tag=&page=&size= - 공개글 목록 **[게시글 시스템 구현 필요]**
- [ ] GET /posts/:pstNo - 단건 조회 **[게시글 시스템 구현 필요]**

## Admin/Posts (관리자)

- [ ] POST /admin/posts - 생성 **[게시글 시스템 구현 필요]**
- [ ] PATCH /admin/posts/:pstNo - 수정 (상태/발행 포함) **[게시글 시스템 구현 필요]**
- [ ] DELETE /admin/posts/:pstNo - 삭제 **[게시글 시스템 구현 필요]**

## Tags (공개)

- [ ] GET /tags - 태그 목록 **[태그 시스템 구현 필요]**
- [ ] GET /tags/:tagNo - 단건 **[태그 시스템 구현 필요]**
- [ ] GET /posts?tag= - 태그 기준 게시글 목록 **[태그 시스템 구현 필요]**

## Admin/Tags (관리자)

- [ ] POST /admin/tags - 생성 **[태그 시스템 구현 필요]**
- [ ] PATCH /admin/tags/:tagNo - 수정 **[태그 시스템 구현 필요]**
- [ ] DELETE /admin/tags/:tagNo - 삭제 **[태그 시스템 구현 필요]**
- [ ] POST /admin/tags/map - 게시글-태그 매핑(옵션) **[태그 시스템 구현 필요]**

## Categories (공개)

- [ ] GET /categories - 카테고리 목록(트리/플랫) **[카테고리 시스템 구현 필요]**
- [ ] GET /posts?category= - 카테고리 기준 게시글 목록 **[카테고리 시스템 구현 필요]**

## Admin/Categories (관리자)

- [ ] POST /admin/categories - 생성 **[카테고리 시스템 구현 필요]**
- [ ] PATCH /admin/categories/:ctgryNo - 수정/트리 재배치 **[카테고리 시스템 구현 필요]**
- [ ] DELETE /admin/categories/:ctgryNo - 삭제 **[카테고리 시스템 구현 필요]**

---

## 🚧 처리해야 할 내용

### 우선순위 1 (즉시 처리 필요)
1. **구독 리포지토리 구현** - `subscription.repository.ts`
   ```ts
   // 구독 정보 조회
   async findSubscriptionByUserNo(userNo: number): Promise<UserSubscriptionType | null>

   // 초기 구독 설정 생성 (회원가입 시 기본값으로)
   async createDefaultSubscription(userNo: number): Promise<UserSubscriptionType>

   // 구독 설정 수정
   async updateSubscription(userNo: number, updateData: UpdateSubscriptionDto): Promise<UserSubscriptionType | null>

   // 구독 설정 삭제 (회원 탈퇴 시)
   async deleteSubscription(userNo: number): Promise<UserSubscriptionType | null>

   // 특정 카테고리/태그를 구독하는 사용자 목록 (이메일 발송용)
   async findSubscribersByCategory(categoryNo: number): Promise<UserSubscriptionType[]>
   async findSubscribersByTag(tagNo: number): Promise<UserSubscriptionType[]>
   async findAllActiveSubscribers(): Promise<UserSubscriptionType[]>
   ```

2. **구독 테이블 마이그레이션**
   - `user_subscribe_info` 테이블 생성
   - 시퀀스 `user_subscribe_info_seq` 생성

### 우선순위 2 (다음 단계)
1. **게시글 시스템** - `post.repository.ts`
   ```ts
   // 게시글 CRUD
   async findPostByNo(pstNo: number): Promise<PostInfoType | null>
   async findPostsByStatus(status: PostStatus): Promise<PostInfoType[]>
   async findPublishedPosts(page?: number, limit?: number): Promise<PostInfoType[]>
   async findPostsByCtgryNo(ctgryNo: number): Promise<PostInfoType[]>
   async findPostsByTagNo(tagNo: number): Promise<PostInfoType[]>
   async searchPosts(query: string): Promise<PostInfoType[]>

   async createPost(postData: CreatePostDto): Promise<PostInfoType>
   async updatePost(pstNo: number, updateData: UpdatePostDto): Promise<PostInfoType | null>
   async deletePost(pstNo: number): Promise<PostInfoType | null>
   async publishPost(pstNo: number): Promise<PostInfoType | null>
   async unpublishPost(pstNo: number): Promise<PostInfoType | null>
   ```

2. **카테고리 시스템** - `category.repository.ts`
   ```ts
   // 카테고리 CRUD
   async findCategoryByNo(ctgryNo: number): Promise<CategoryInfoType | null>
   async findAllCategories(): Promise<CategoryInfoType[]>
   async findCategoryTree(): Promise<CategoryInfoType[]>
   async findChildCategories(parentCtgryNo: number): Promise<CategoryInfoType[]>

   async createCategory(categoryData: CreateCategoryDto): Promise<CategoryInfoType>
   async updateCategory(ctgryNo: number, updateData: UpdateCategoryDto): Promise<CategoryInfoType | null>
   async deleteCategory(ctgryNo: number): Promise<CategoryInfoType | null>
   async reorderCategories(categoryOrders: { ctgryNo: number, orderNo: number }[]): Promise<void>
   ```

3. **태그 시스템** - `tag.repository.ts`
   ```ts
   // 태그 CRUD
   async findTagByNo(tagNo: number): Promise<TagInfoType | null>
   async findAllTags(): Promise<TagInfoType[]>
   async findTagsByPstNo(pstNo: number): Promise<TagInfoType[]>
   async findPopularTags(limit?: number): Promise<TagInfoType[]>

   async createTag(tagData: CreateTagDto): Promise<TagInfoType>
   async updateTag(tagNo: number, updateData: UpdateTagDto): Promise<TagInfoType | null>
   async deleteTag(tagNo: number): Promise<TagInfoType | null>

   // 게시글-태그 매핑
   async mapPostTags(pstNo: number, tagNos: number[]): Promise<void>
   async unmapPostTags(pstNo: number): Promise<void>
   ```

### 우선순위 3 (추후 구현)
1. **댓글 시스템** - `comment.repository.ts`
   ```ts
   // 댓글 CRUD
   async findCommentByNo(cmntNo: number): Promise<CommentInfoType | null>
   async findCommentsByPstNo(pstNo: number): Promise<CommentInfoType[]>
   async findCommentsByStatus(status: CommentStatus): Promise<CommentInfoType[]>
   async findCommentsByUserNo(userNo: number): Promise<CommentInfoType[]>

   async createComment(commentData: CreateCommentDto): Promise<CommentInfoType>
   async updateComment(cmntNo: number, updateData: UpdateCommentDto): Promise<CommentInfoType | null>
   async deleteComment(cmntNo: number): Promise<CommentInfoType | null>
   async approveComment(cmntNo: number): Promise<CommentInfoType | null>
   async rejectComment(cmntNo: number): Promise<CommentInfoType | null>
   ```

2. **이메일 알림 시스템**
   - 새 글 발행 시 구독자 이메일 발송
   - 댓글 알림 시스템
   - 이메일 템플릿 관리

### 완료된 항목 ✅
- ✅ 사용자 인증 시스템 (Auth)
- ✅ 관리자 사용자 관리 (Admin/Users)
- ✅ 구독자 프로필 관리 (Users/Profile)
- ✅ 구독 설정 API 뼈대 (Users/Subscription)
