# API 훅 개선 사항

## 개요

모든 API 훅에 `params` 옵션을 추가하여 쿼리 파라미터를 지원하도록 개선했습니다.

## 개선된 훅들

- `use-post.ts` - POST 요청용
- `use-put.ts` - PUT 요청용
- `use-patch.ts` - PATCH 요청용
- `use-delete.ts` - DELETE 요청용
- `use-prepare-mutation-params.ts` - 공통 헬퍼 함수

## 사용 예시

### POST 요청에 쿼리 파라미터 추가

```typescript
// 기존 방식
const mutation = usePost({
  url: ["admin", "posts", "analyze", "overview"],
  key: adminPostsKeys.analyzeOverview({}),
  // ...
});

// 개선된 방식 - 쿼리 파라미터 지원
const mutation = usePost({
  url: ["admin", "posts", "analyze", "overview"],
  key: adminPostsKeys.analyzeOverview({}),
  params: { pstNo: 123 }, // 쿼리 파라미터 추가
  // ...
});
```

### PUT 요청에 쿼리 파라미터 추가

```typescript
const mutation = usePut({
  url: ["admin", "posts", postId],
  key: adminPostsKeys.updatePost(postId),
  params: { includeComments: true }, // 쿼리 파라미터 추가
  // ...
});
```

### DELETE 요청에 쿼리 파라미터 추가

```typescript
const mutation = useDelete({
  url: ["admin", "posts", postId],
  key: adminPostsKeys.deletePost(postId),
  params: { force: true }, // 쿼리 파라미터 추가
  // ...
});
```

## 백엔드 @Query 파라미터와의 호환성

이제 다음 백엔드 엔드포인트들과 완전히 호환됩니다:

- `POST /admin/posts/analyze/overview?pstNo=123`
- `POST /admin/posts/analyze/shares?pstNo=123`
- `POST /admin/categories/analyze/overview?ctgryNo=456`
- `POST /admin/tags/analyze/overview?tagNo=789`
- `GET /admin/users/inactive?daysThreshold=30`
- 기타 모든 `@Query` 파라미터를 사용하는 엔드포인트

## 주의사항

- `params`는 선택적 옵션입니다
- 기존 코드는 수정 없이 그대로 작동합니다
- 쿼리 파라미터는 URLSearchParams를 사용하여 자동으로 인코딩됩니다
