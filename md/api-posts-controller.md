# Posts Controller API 문서

## 컨트롤러: PostsController

**Base Path:** `/posts`

---

### 1. getPostList

- **메소드명:** getPostList
- **요청 메소드:** POST
- **요청 주소:** `/posts/search`
- **요청 데이터 (Body):** SearchPostDto
- **반환 타입:** ResponseDto<ListType<SelectPostListItemType>>
- **설명:** 포스트 목록 조회

---

### 2. getPostByPstNo

- **메소드명:** getPostByPstNo
- **요청 메소드:** GET
- **요청 주소:** `/posts/:pstNo`
- **요청 데이터 (Param):** pstNo (number)
- **반환 타입:** ResponseDto<SelectPostType>
- **설명:** 포스트 상세 조회

---

### 3. getPostByPstCd

- **메소드명:** getPostByPstCd
- **요청 메소드:** GET
- **요청 주소:** `/posts/slug/:pstCd`
- **요청 데이터 (Param):** pstCd (string)
- **반환 타입:** ResponseDto<SelectPostType>
- **설명:** 포스트 슬러그로 상세 조회

---

### 4. getPostListByTagNo

- **메소드명:** getPostListByTagNo
- **요청 메소드:** POST
- **요청 주소:** `/posts/tag/:tagNo`
- **요청 데이터 (Param):** tagNo (number)
- **요청 데이터 (Body):** SearchPostDto
- **반환 타입:** ResponseDto<ListType<SelectPostListItemType>>
- **설명:** 태그별 포스트 목록 조회

---

### 5. getPostListByCtgryNo

- **메소드명:** getPostListByCtgryNo
- **요청 메소드:** POST
- **요청 주소:** `/posts/category/:ctgryNo`
- **요청 데이터 (Param):** ctgryNo (number)
- **요청 데이터 (Body):** SearchPostDto
- **반환 타입:** ResponseDto<ListType<SelectPostListItemType>>
- **설명:** 카테고리별 포스트 목록 조회

---

### 6. getPostListFromArchive

- **메소드명:** getPostListFromArchive
- **요청 메소드:** POST
- **요청 주소:** `/posts/archive/:date`
- **요청 데이터 (Param):** date (string, yyyyMM 형식)
- **요청 데이터 (Body):** SearchPostDto
- **반환 타입:** ResponseDto<ListType<SelectPostListItemType>>
- **설명:** 년월별 포스트 목록 조회

---

### 7. getAdvancedPostList

- **메소드명:** getAdvancedPostList
- **요청 메소드:** POST
- **요청 주소:** `/posts/advanced-search`
- **요청 데이터 (Body):** SearchPostDto
- **반환 타입:** ResponseDto<ListType<SelectPostListItemType>>
- **설명:** 고급 검색을 통한 포스트 목록 조회

---

### 8. createPostViewLog

- **메소드명:** createPostViewLog
- **요청 메소드:** POST
- **요청 주소:** `/posts/:pstNo/view`
- **요청 데이터 (Param):** pstNo (number)
- **요청 데이터 (IP):** 자동 추출
- **반환 타입:** ResponseDto<SelectPostViewLogType>
- **설명:** 포스트 조회 로그 기록

---

### 9. createPostShareLog

- **메소드명:** createPostShareLog
- **요청 메소드:** POST
- **요청 주소:** `/posts/:pstNo/share`
- **요청 데이터 (Body):** CreatePostShareLogDto
- **반환 타입:** ResponseDto<SelectPostShareLogType>
- **설명:** 포스트 공유 로그 기록

---

### 10. createPostBookmark

- **메소드명:** createPostBookmark
- **요청 메소드:** POST
- **요청 주소:** `/posts/:pstNo/bookmark`
- **요청 데이터 (Param):** pstNo (number)
- **요청 데이터 (Body):** CreatePostBookmarkDto
- **반환 타입:** ResponseDto<SelectPostBookmarkType>
- **설명:** 포스트 북마크 생성
- **인증:** JWT 인증 필요

---

### 11. deletePostBookmark

- **메소드명:** deletePostBookmark
- **요청 메소드:** DELETE
- **요청 주소:** `/posts/:pstNo/bookmark`
- **요청 데이터 (Param):** pstNo (number)
- **요청 데이터 (Body):** DeletePostBookmarkDto
- **반환 타입:** ResponseDto<boolean>
- **설명:** 포스트 북마크 삭제
- **인증:** JWT 인증 필요

---

### 12. getBookmarkedPostListByUserNo

- **메소드명:** getBookmarkedPostListByUserNo
- **요청 메소드:** POST
- **요청 주소:** `/posts/bookmarked`
- **요청 데이터 (Body):** SearchPostBookmarkDto
- **반환 타입:** ResponseDto<ListType<SelectPostBookmarkListItemType>>
- **설명:** 북마크한 포스트 목록 조회
- **인증:** JWT 인증 필요
