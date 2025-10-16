# Comments Controller API 문서

## 컨트롤러: CommentsController

**Base Path:** `/comments`

---

### 1. getCommentList

- **메소드명:** getCommentList
- **요청 메소드:** POST
- **요청 주소:** `/comments/search`
- **요청 데이터 (Body):** SearchCommentDto
- **반환 타입:** ResponseDto<ListType<SelectCommentListItemType>>
- **설명:** 댓글 목록 조회

---

### 2. getCommentByCmntNo

- **메소드명:** getCommentByCmntNo
- **요청 메소드:** GET
- **요청 주소:** `/comments/:cmntNo`
- **요청 데이터 (Param):** cmntNo (number)
- **반환 타입:** ResponseDto<SelectCommentType>
- **설명:** 댓글 상세 조회

---

### 3. createComment

- **메소드명:** createComment
- **요청 메소드:** POST
- **요청 주소:** `/comments`
- **요청 데이터 (Body):** CreateCommentDto
- **반환 타입:** ResponseDto<SelectCommentType>
- **설명:** 댓글 작성
- **인증:** JWT 인증 필요

---

### 4. updateComment

- **메소드명:** updateComment
- **요청 메소드:** PUT
- **요청 주소:** `/comments`
- **요청 데이터 (Body):** UpdateCommentDto
- **반환 타입:** ResponseDto<SelectCommentType>
- **설명:** 댓글 수정
- **인증:** JWT 인증 필요

---

### 5. deleteComment

- **메소드명:** deleteComment
- **요청 메소드:** DELETE
- **요청 주소:** `/comments`
- **요청 데이터 (Body):** DeleteCommentDto
- **반환 타입:** ResponseDto<boolean>
- **설명:** 댓글 삭제
- **인증:** JWT 인증 필요
