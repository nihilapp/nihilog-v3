# Admin Comments Controller API 문서

## 컨트롤러: AdminCommentsController

**Base Path:** `/admin/comments`

---

## 댓글 통계 관련 엔드포인트

### 1. adminGetAnalyzeCommentData (통계)

- **메소드명:** adminGetAnalyzeCommentData
- **요청 메소드:** POST
- **요청 주소:** `/admin/comments/analyze/overview`
- **요청 데이터 (Body):** AnalyzeStatDto
- **요청 데이터 (Query):** pstNo (선택적, number)
- **반환 타입:** ResponseDto<AnalyzeCommentStatItemType[]>
- **설명:** 댓글 분석 통계
- **인증:** JWT 인증 필요 (ADMIN)

---

### 2. adminGetTopPostsByCommentCount (통계)

- **메소드명:** adminGetTopPostsByCommentCount
- **요청 메소드:** POST
- **요청 주소:** `/admin/comments/analyze/top-posts`
- **요청 데이터 (Query):** limit (number)
- **요청 데이터 (Body):** AnalyzeStatDto (선택적)
- **반환 타입:** ResponseDto<TopPostsByCommentItemType[]>
- **설명:** 포스트별 댓글 수 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 3. adminGetTopUsersByCommentCount (통계)

- **메소드명:** adminGetTopUsersByCommentCount
- **요청 메소드:** POST
- **요청 주소:** `/admin/comments/analyze/top-users`
- **요청 데이터 (Query):** limit (number)
- **요청 데이터 (Body):** AnalyzeStatDto (선택적)
- **반환 타입:** ResponseDto<TopUsersByCommentItemType[]>
- **설명:** 사용자별 댓글 작성 수 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 4. adminGetAverageCommentCountPerPost (통계)

- **메소드명:** adminGetAverageCommentCountPerPost
- **요청 메소드:** POST
- **요청 주소:** `/admin/comments/analyze/average-per-post`
- **요청 데이터 (Body):** AnalyzeStatDto
- **반환 타입:** ResponseDto<AverageCommentPerPostItemType[]>
- **설명:** 평균 댓글 수 / 포스트
- **인증:** JWT 인증 필요 (ADMIN)

---

### 5. adminGetCommentStatusDistribution (통계)

- **메소드명:** adminGetCommentStatusDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/comments/analyze/status-distribution`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<CommentStatusDistributionItemType[]>
- **설명:** 댓글 상태별 분포
- **인증:** JWT 인증 필요 (ADMIN)

---

### 6. adminGetCommentApprovalRate (통계)

- **메소드명:** adminGetCommentApprovalRate
- **요청 메소드:** POST
- **요청 주소:** `/admin/comments/analyze/approval-rate`
- **요청 데이터 (Body):** AnalyzeStatDto
- **반환 타입:** ResponseDto<CommentApprovalRateItemType[]>
- **설명:** 댓글 승인율
- **인증:** JWT 인증 필요 (ADMIN)

---

### 7. adminGetCommentSpamRate (통계)

- **메소드명:** adminGetCommentSpamRate
- **요청 메소드:** POST
- **요청 주소:** `/admin/comments/analyze/spam-rate`
- **요청 데이터 (Body):** AnalyzeStatDto
- **반환 타입:** ResponseDto<CommentSpamRateItemType[]>
- **설명:** 스팸 댓글 비율
- **인증:** JWT 인증 필요 (ADMIN)

---

### 8. adminGetCommentReplyRatio (통계)

- **메소드명:** adminGetCommentReplyRatio
- **요청 메소드:** POST
- **요청 주소:** `/admin/comments/analyze/reply-ratio`
- **요청 데이터 (Body):** AnalyzeStatDto
- **반환 타입:** ResponseDto<CommentReplyRatioItemType[]>
- **설명:** 답글 비율
- **인증:** JWT 인증 필요 (ADMIN)

---

### 9. adminGetCommentAverageDepth (통계)

- **메소드명:** adminGetCommentAverageDepth
- **요청 메소드:** POST
- **요청 주소:** `/admin/comments/analyze/average-depth`
- **요청 데이터 (Body):** AnalyzeStatDto
- **반환 타입:** ResponseDto<CommentAverageDepthItemType[]>
- **설명:** 평균 답글 깊이
- **인증:** JWT 인증 필요 (ADMIN)

---

### 10. adminGetPostsWithoutComments (통계)

- **메소드명:** adminGetPostsWithoutComments
- **요청 메소드:** GET
- **요청 주소:** `/admin/comments/analyze/posts-without-comments`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<PostsWithoutCommentsItemType[]>
- **설명:** 댓글 없는 포스트 목록
- **인증:** JWT 인증 필요 (ADMIN)

---

## 기존 관리자 기능

### 11. adminMultipleUpdateComment

- **메소드명:** adminMultipleUpdateComment
- **요청 메소드:** PUT
- **요청 주소:** `/admin/comments/multiple`
- **요청 데이터 (Body):** UpdateCommentDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 댓글 일괄 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 12. adminMultipleDeleteComment

- **메소드명:** adminMultipleDeleteComment
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/comments/multiple`
- **요청 데이터 (Body):** DeleteCommentDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 댓글 일괄 삭제
- **인증:** JWT 인증 필요 (ADMIN)
