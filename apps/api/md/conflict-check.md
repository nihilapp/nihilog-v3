# 2025 1008 유니크 중복 및 필수값 체크 개선 작업 계획서

## 요약

각 엔티티의 서비스에서 생성, 수정, 삭제 시 유니크 중복 및 필수값 체크를 강화하기 위한 개선 작업 계획을 수립합니다.

## 현황 분석

### 1. 데이터베이스 레벨 제약조건 (Prisma Schema 기준)

#### 유니크 제약조건

- **UserInfo**: `emlAddr` (이메일), `userNm` (사용자명)
- **CtgryInfo**: `ctgryNm` (카테고리명)
- **TagInfo**: `tagNm` (태그명)
- **PstInfo**: `pstTtl` (게시글 제목), `pstCd` (게시글 코드/슬러그)
- **CtgrySbcrMpng**: `[sbcrNo, ctgryNo]` (구독자-카테고리 조합)
- **TagSbcrMpng**: `[sbcrNo, tagNo]` (구독자-태그 조합)
- **PstTagMpng**: `[pstNo, tagNo]` (게시글-태그 조합)
- **PstBkmrkMpng**: `[userNo, pstNo]` (사용자-게시글 북마크 조합)
- **UserSbcrInfo**: `userNo` (사용자별 구독 설정)

#### 필수값 (NOT NULL)

- **UserInfo**: `emlAddr`, `userNm`, `encptPswd`
- **CtgryInfo**: `ctgryNm`, `ctgryStp`
- **TagInfo**: `tagNm`
- **PstInfo**: `userNo`, `pstTtl`, `pstMtxt`
- **CmntInfo**: `pstNo`, `cmntCntnt`
- **CtgrySbcrMpng**: `sbcrNo`, `ctgryNo`
- **TagSbcrMpng**: `sbcrNo`, `tagNo`
- **PstTagMpng**: `pstNo`, `tagNo`
- **PstBkmrkMpng**: `userNo`, `pstNo`

### 2. 서비스 레벨 검증 현황

#### ✅ 잘 구현된 부분

1. **UserService**:

   - 이메일 중복 체크 (`getUserByEmail`)
   - 사용자명 중복 체크 (`getUserByName`)
   - 프로필 수정 시 사용자명 중복 체크

2. **AdminTagsService**:
   - 태그명 중복 체크 (`getTagByTagNm`)
   - 태그 매핑 중복 체크 (`getPostTagMappingByTagNo`)

#### ❌ 개선이 필요한 부분

### 3. 개선이 필요한 엔티티별 현황

#### 3.1 Categories (카테고리)

**현재 상태**: 검증 로직 없음
**필요한 개선사항**:

- 카테고리명 중복 체크 누락
- 상위 카테고리 존재 여부 검증 누락
- 카테고리 수정 시 중복 체크 누락

#### 3.2 Posts (게시글)

**현재 상태**: 검증 로직 없음
**필요한 개선사항**:

- 게시글 제목 중복 체크 누락
- 게시글 코드(슬러그) 중복 체크 누락
- 카테고리 존재 여부 검증 누락
- 사용자 존재 여부 검증 누락

#### 3.3 Comments (댓글)

**현재 상태**: 검증 로직 없음
**필요한 개선사항**:

- 게시글 존재 여부 검증 누락
- 부모 댓글 존재 여부 검증 누락
- 댓글 내용 필수값 검증 누락

#### 3.4 Subscribe (구독)

**현재 상태**: 검증 로직 없음
**필요한 개선사항**:

- 구독자-카테고리 중복 체크 누락
- 구독자-태그 중복 체크 누락
- 구독 설정 존재 여부 검증 누락

#### 3.5 PostBookmark (북마크)

**현재 상태**: 검증 로직 없음
**필요한 개선사항**:

- 사용자-게시글 북마크 중복 체크 누락
- 게시글 존재 여부 검증 누락

## 개선 작업 계획

### Phase 1: 핵심 엔티티 검증 강화 (우선순위: 높음)

#### 1.1 CategoriesService 개선

```typescript
// 추가할 검증 로직
- adminCreateCategory: 카테고리명 중복 체크
- adminUpdateCategory: 카테고리명 중복 체크 (자신 제외)
- adminCreateCategory: 상위 카테고리 존재 여부 검증
```

**CategoryRepository 추가 메서드:**

```typescript
// 상위 카테고리 존재 여부 검증
async checkParentCategoryExists(upCtgryNo: number): Promise<RepoResponseType<boolean> | null>

// 카테고리명 중복 체크 (수정 시 자신 제외)
async checkCategoryNameUnique(ctgryNm: string, excludeCtgryNo?: number): Promise<RepoResponseType<boolean> | null>
```

#### 1.2 PostsService 개선

```typescript
// 추가할 검증 로직
- createPost: 게시글 제목 중복 체크
- createPost: 게시글 코드 중복 체크 (pstCd가 있는 경우)
- createPost: 카테고리 존재 여부 검증
- updatePost: 게시글 제목 중복 체크 (자신 제외)
- updatePost: 게시글 코드 중복 체크 (자신 제외)
```

**PostRepository 추가 메서드:**

```typescript
// 게시글 제목 중복 체크
async checkPostTitleUnique(pstTtl: string, excludePstNo?: number): Promise<RepoResponseType<boolean> | null>

// 게시글 코드(슬러그) 중복 체크
async checkPostCodeUnique(pstCd: string, excludePstNo?: number): Promise<RepoResponseType<boolean> | null>

// 게시글 존재 여부 검증
async checkPostExists(pstNo: number): Promise<RepoResponseType<boolean> | null>

// 카테고리 존재 여부 검증
async checkCategoryExists(ctgryNo: number): Promise<RepoResponseType<boolean> | null>
```

#### 1.3 CommentsService 개선

```typescript
// 추가할 검증 로직
- createComment: 게시글 존재 여부 검증
- createComment: 부모 댓글 존재 여부 검증 (prntCmntNo가 있는 경우)
- updateComment: 댓글 소유권 검증
- deleteComment: 댓글 소유권 검증
```

**CommentRepository 추가 메서드:**

```typescript
// 게시글 존재 여부 검증
async checkPostExists(pstNo: number): Promise<RepoResponseType<boolean> | null>

// 부모 댓글 존재 여부 검증
async checkParentCommentExists(prntCmntNo: number): Promise<RepoResponseType<boolean> | null>

// 댓글 소유권 검증
async checkCommentOwnership(cmntNo: number, userNo: number): Promise<RepoResponseType<boolean> | null>
```

### Phase 2: 구독 및 매핑 엔티티 검증 강화 (우선순위: 중간)

#### 2.1 Subscribe 관련 검증

```typescript
// CategorySubscribeService
- createCategorySubscribe: 구독자-카테고리 중복 체크
- createCategorySubscribe: 카테고리 존재 여부 검증

// TagSubscribeService
- createTagSubscribe: 구독자-태그 중복 체크
- createTagSubscribe: 태그 존재 여부 검증
```

**SubscribeRepository 추가 메서드:**

```typescript
// 사용자 구독 설정 존재 여부 검증
async checkUserSubscribeExists(userNo: number): Promise<RepoResponseType<boolean> | null>
```

**CategorySubscribeRepository 추가 메서드:**

```typescript
// 구독자-카테고리 중복 체크
async checkCategorySubscribeUnique(sbcrNo: number, ctgryNo: number): Promise<RepoResponseType<boolean> | null>

// 구독 설정 존재 여부 검증
async checkSubscriptionExists(sbcrNo: number): Promise<RepoResponseType<boolean> | null>

// 카테고리 존재 여부 검증
async checkCategoryExists(ctgryNo: number): Promise<RepoResponseType<boolean> | null>
```

**TagSubscribeRepository 추가 메서드:**

```typescript
// 구독자-태그 중복 체크
async checkTagSubscribeUnique(sbcrNo: number, tagNo: number): Promise<RepoResponseType<boolean> | null>

// 구독 설정 존재 여부 검증
async checkSubscriptionExists(sbcrNo: number): Promise<RepoResponseType<boolean> | null>

// 태그 존재 여부 검증
async checkTagExists(tagNo: number): Promise<RepoResponseType<boolean> | null>
```

#### 2.2 PostBookmark 검증

```typescript
// PostsService
- createPostBookmark: 사용자-게시글 북마크 중복 체크
- createPostBookmark: 게시글 존재 여부 검증
```

**PostRepository 북마크 관련 추가 메서드:**

```typescript
// 사용자-게시글 북마크 중복 체크
async checkPostBookmarkUnique(userNo: number, pstNo: number): Promise<RepoResponseType<boolean> | null>

// 게시글 존재 여부 검증 (북마크용)
async checkPostExistsForBookmark(pstNo: number): Promise<RepoResponseType<boolean> | null>
```

### Phase 3: Repository 레벨 검증 메서드 추가 (우선순위: 중간)

#### 3.1 공통 검증 메서드 추가

```typescript
// 각 Repository에 추가할 메서드들
- checkUniqueConstraint(): 유니크 제약조건 검증
- validateForeignKey(): 외래키 존재 여부 검증
- checkOwnership(): 소유권 검증
```

**공통 검증 메서드 (각 Repository에 추가):**

```typescript
// 외래키 존재 여부 검증 (범용)
async checkForeignKeyExists(tableName: string, fieldName: string, value: number): Promise<RepoResponseType<boolean> | null>

// 유니크 제약조건 검증 (범용)
async checkUniqueConstraint(tableName: string, fieldName: string, value: string, excludeId?: number, idField?: string): Promise<RepoResponseType<boolean> | null>
```

**메서드명 규칙:**

1. **`check` + `엔티티명` + `속성` + `Unique`**: 중복 체크
2. **`check` + `엔티티명` + `Exists`**: 존재 여부 검증
3. **`check` + `엔티티명` + `Ownership`**: 소유권 검증
4. **`check` + `관계명` + `Unique`**: 관계 중복 체크

### Phase 4: DTO 레벨 검증 강화 (우선순위: 낮음)

#### 4.1 Zod 스키마 개선

```typescript
// 추가할 검증 규칙
- 이메일 형식 검증 강화
- 사용자명 중복 검증 (서비스 레벨과 연동)
- 카테고리명 중복 검증
- 태그명 중복 검증
```

## 구현 우선순위

### 1단계 (즉시 구현)

1. **CategoriesService** - 카테고리명 중복 체크
2. **PostsService** - 게시글 제목/코드 중복 체크
3. **CommentsService** - 게시글 존재 여부 검증

### 2단계 (1주 내)

1. **Subscribe 관련 서비스** - 구독 중복 체크
2. **PostBookmark** - 북마크 중복 체크
3. **Repository 메서드** - 공통 검증 메서드 추가

### 3단계 (2주 내)

1. **DTO 검증 강화** - Zod 스키마 개선
2. **에러 메시지 표준화** - 일관된 에러 응답
3. **테스트 케이스 추가** - 검증 로직 테스트

## 예상 효과

### 데이터 무결성 향상

- 중복 데이터 생성 방지
- 참조 무결성 보장
- 데이터 일관성 유지

### 사용자 경험 개선

- 명확한 에러 메시지 제공
- 중복 시도 시 적절한 안내
- 데이터 검증 실패 시 구체적인 원인 제공

### 시스템 안정성 강화

- 예외 상황 사전 방지
- 데이터베이스 제약조건 위반 방지
- API 응답 일관성 확보

## 주의사항

1. **성능 고려**: 중복 체크 시 인덱스 활용
2. **트랜잭션 관리**: 검증과 생성/수정을 동일 트랜잭션에서 처리
3. **에러 처리**: 일관된 에러 응답 형식 유지
4. **테스트**: 각 검증 로직에 대한 단위 테스트 필수

## 결론

현재 시스템에서 유니크 중복 및 필수값 체크가 부분적으로만 구현되어 있어, 데이터 무결성과 사용자 경험 측면에서 개선이 필요합니다. 위 계획에 따라 단계적으로 검증 로직을 강화하여 더욱 안정적이고 신뢰할 수 있는 시스템을 구축하겠습니다.
