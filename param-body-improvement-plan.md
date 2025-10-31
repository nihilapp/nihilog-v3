# URL 파라미터와 Body 중복 제거 개선 계획

## 분석 결과

### 문제가 있는 케이스 (URL 파라미터를 Body에 병합하는 패턴)

1. **CommentsController** (컨트롤러 5번)

   - `PUT /comments/:cmntNo` → 서비스에 `{ ...updateData, cmntNo }` 전달
   - `DELETE /comments/:cmntNo` → 서비스에 `{ ...deleteData, cmntNo }` 전달

2. **AdminPostsController** (컨트롤러 11번)

   - `PATCH /admin/posts/:pstNo` → 서비스에 `{ ...updateData, pstNo }` 전달
   - `DELETE /admin/posts/:pstNo` → 서비스에 `{ ...deleteData, pstNo }` 전달

3. **AdminTagsController** (컨트롤러 15번)

   - `PATCH /admin/tags/:tagNo` → 서비스에 `{ ...updateData, tagNo }` 전달
   - `DELETE /admin/tags/:tagNo` → 서비스에 `{ ...deleteData, tagNo }` 전달

4. **TagSubscribeController** (컨트롤러 8번)

   - `PUT /users/subscribes/tags/:tagSbcrNo` → 서비스에 `{ ...body, tagSbcrNo }` 전달

5. **CategorySubscribeController** (컨트롤러 7번)
   - `PUT /users/subscribes/categories/:ctgrySbcrNo` → 서비스에 `{ ...body, ctgrySbcrNo }` 전달

### 올바른 패턴 (수정 불필요)

- **AdminUserController**: DELETE는 파라미터만 사용 (Body 없음), PATCH는 파라미터를 별도로 전달
- **AdminCategoriesController**: DELETE는 파라미터만 사용 (Body 없음), PATCH는 파라미터를 별도로 전달
- **TagSubscribeController**: DELETE는 파라미터만 사용 (Body 없음)
- **CategorySubscribeController**: DELETE는 파라미터만 사용 (Body 없음)
- **AdminSubscribeController**: DELETE는 파라미터만 사용 (Body 없음)

## 개선 계획

### 백엔드 수정

컨트롤러에서 URL 파라미터를 Body에 병합하지 않고, 서비스 레이어에 별도 파라미터로 전달하도록 변경:

**변경 전:**

```typescript
async updateComment(
  @Param('cmntNo', ParseIntPipe) cmntNo: number,
  @Body() updateData: UpdateCommentDto
) {
  const result = await this.commentsService.updateComment(
    req.user.userNo,
    { ...updateData, cmntNo }  // ❌ Body에 병합
  );
}
```

**변경 후:**

```typescript
async updateComment(
  @Param('cmntNo', ParseIntPipe) cmntNo: number,
  @Body() updateData: UpdateCommentDto
) {
  const result = await this.commentsService.updateComment(
    req.user.userNo,
    cmntNo,        // ✅ 별도 파라미터
    updateData     // ✅ Body만
  );
}
```

### 프론트엔드 수정

1. **DELETE 요청**

   - Body가 실제로 필요한 데이터가 있는지 확인
   - Body가 비어있거나 불필요한 경우: `useDelete` 사용 (Body 없음)
   - Body가 필요한 경우: `useDeletes` 사용하되, URL 파라미터 ID를 body에서 제거

2. **PUT/PATCH 요청**
   - Body에서 URL 파라미터 ID 필드 제거
   - `usePut`/`usePatch` 사용

### 수정 대상 컨트롤러 목록

1. ✅ **CommentsController** (5번)

   - PUT /comments/:cmntNo
   - DELETE /comments/:cmntNo

2. **AdminPostsController** (11번)

   - PATCH /admin/posts/:pstNo
   - DELETE /admin/posts/:pstNo

3. **AdminTagsController** (15번)

   - PATCH /admin/tags/:tagNo
   - DELETE /admin/tags/:tagNo

4. **TagSubscribeController** (8번)

   - PUT /users/subscribes/tags/:tagSbcrNo

5. **CategorySubscribeController** (7번)
   - PUT /users/subscribes/categories/:ctgrySbcrNo

## 구체적인 수정 단계

### 1단계: 백엔드 서비스 시그니처 변경

- 각 서비스 메서드가 URL 파라미터를 별도 인자로 받도록 수정
- 컨트롤러에서 서비스 호출 시 파라미터와 Body를 분리하여 전달

### 2단계: 프론트엔드 타입 확인

- 각 DeleteDto, UpdateDto에서 ID 필드가 optional인지 확인
- 실제로 Body에 필요한 데이터가 있는지 확인

### 3단계: 프론트엔드 훅 수정

- URL 파라미터를 함수 매개변수로 받도록 수정
- Body에서 ID 필드 제거
- 적절한 훅 (`useDelete` vs `useDeletes`) 선택

### 4단계: 테스트

- 각 엔드포인트의 동작 확인
- 타입 안정성 확인
