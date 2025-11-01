- 아래의 파일들을 참고해서 사용자의 요청을 해결합니다.
- controller 는 컨트롤러 라고 지칭합니다.
- service 는 서비스 라고 지칭합니다.
- repository 는 리포 라고 지칭합니다.
- openapi 는 api 문서 라고 지칭합니다.

# API 관련 파일 목록

1. **autn**

- `apps/api/src/endpoints/auth/auth.controller.ts`
- `apps/api/src/openapi/endpoints/auth.endpoints.ts`
- `apps/api/src/endpoints/auth/auth.service.ts`
- `apps/api/src/endpoints/repositories/user.repository.ts`

2. **users**

- `apps/api/src/endpoints/users/users.controller.ts`
- `apps/api/src/openapi/endpoints/users.endpoints.ts`
- `apps/api/src/endpoints/users/users.service.ts`
- `apps/api/src/endpoints/repositories/user.repository.ts`
- `apps/api/src/endpoints/repositories/subscribe.repository.ts`

3. **categories**

- `apps/api/src/endpoints/categories/categories.controller.ts`
- `apps/api/src/openapi/endpoints/categories.endpoints.ts`
- `apps/api/src/endpoints/categories/categories.service.ts`
- `apps/api/src/endpoints/repositories/category.repository.ts`

4. **tags**

- `apps/api/src/endpoints/tags/tags.controller.ts`
- `apps/api/src/openapi/endpoints/tags.endpoints.ts`
- `apps/api/src/endpoints/tags/tags.service.ts`
- `apps/api/src/endpoints/repositories/tag.repository.ts`

5.  **posts**

- `apps/api/src/endpoints/posts/posts.controller.ts`
- `apps/api/src/openapi/endpoints/posts.endpoints.ts`
- `apps/api/src/endpoints/posts/posts.service.ts`
- `apps/api/src/endpoints/repositories/post.repository.ts`

6.  **comments**

- `apps/api/src/endpoints/comments/comments.controller.ts`
- `apps/api/src/openapi/endpoints/comments.endpoints.ts`
- `apps/api/src/endpoints/comments/comments.service.ts`
- `apps/api/src/endpoints/repositories/comment.repository.ts`

7.  **category-subscribe**

- `apps/api/src/endpoints/subscribe/category-subscribe/category-subscribe.controller.ts`
- `apps/api/src/openapi/endpoints/category-subscribe.endpoints.ts`
- `apps/api/src/endpoints/subscribe/category-subscribe/category-subscribe.service.ts`
- `apps/api/src/endpoints/repositories/category-subscribe.repository.ts`

8.  **tag-subscribe**

- `apps/api/src/endpoints/subscribe/tag-subscribe/tag-subscribe.controller.ts`
- `apps/api/src/openapi/endpoints/tag-subscribe.endpoints.ts`
- `apps/api/src/endpoints/subscribe/tag-subscribe/tag-subscribe.service.ts`
- `apps/api/src/endpoints/repositories/tag-subscribe.repository.ts`

9.  **admin**

- `apps/api/src/endpoints/admin/admin.controller.ts`
- `apps/api/src/openapi/endpoints/admin.endpoints.ts`
- `apps/api/src/endpoints/admin/admin.service.ts`
- `apps/api/src/endpoints/repositories/user.repository.ts`

10. **admin-users**

- `apps/api/src/endpoints/admin/users/admin-users.controller.ts`
- `apps/api/src/openapi/endpoints/admin-users.endpoints.ts`
- `apps/api/src/endpoints/admin/users/admin-users.service.ts`
- `apps/api/src/endpoints/repositories/user.repository.ts`

11. **admin-categories**

- `apps/api/src/endpoints/admin/categories/admin-categories.controller.ts`
- `apps/api/src/openapi/endpoints/admin-categories.endpoints.ts`
- `apps/api/src/endpoints/admin/categories/admin-categories.service.ts`
- `apps/api/src/endpoints/repositories/category.repository.ts`

12. **admin-tags**

- `apps/api/src/endpoints/admin/tags/admin-tags.controller.ts`
- `apps/api/src/openapi/endpoints/admin-tags.endpoints.ts`
- `apps/api/src/endpoints/admin/tags/admin-tags.service.ts`
- `apps/api/src/endpoints/repositories/tag.repository.ts`

13. **admin-posts**

- `apps/api/src/endpoints/admin/posts/admin-posts.controller.ts`
- `apps/api/src/openapi/endpoints/admin-posts.endpoints.ts`
- `apps/api/src/endpoints/admin/posts/admin-posts.service.ts`
- `apps/api/src/endpoints/repositories/post.repository.ts`

14. **admin-comments**

- `apps/api/src/endpoints/admin/comments/admin-comments.controller.ts`
- `apps/api/src/openapi/endpoints/admin-comments.endpoints.ts`
- `apps/api/src/endpoints/admin/comments/admin-comments.service.ts`
- `apps/api/src/endpoints/repositories/comment.repository.ts`

15. **admin-category-subscribe**

- `apps/api/src/endpoints/admin/category-subscribe/admin-category-subscribe.controller.ts`
- `apps/api/src/openapi/endpoints/admin-category-subscribe.endpoints.ts`
- `apps/api/src/endpoints/subscribe/category-subscribe/category-subscribe.service.ts`
- `apps/api/src/endpoints/repositories/category-subscribe.repository.ts`

16. **admin-tag-subscribe**

- `apps/api/src/endpoints/admin/tag-subscribe/admin-tag-subscribe.controller.ts`
- `apps/api/src/openapi/endpoints/admin-tag-subscribe.endpoints.ts`
- `apps/api/src/endpoints/subscribe/tag-subscribe/tag-subscribe.service.ts`
- `apps/api/src/endpoints/repositories/tag-subscribe.repository.ts`

17. **admin-user-subscribe**

- `apps/api/src/endpoints/admin/subscribe/admin-user-subscribe.controller.ts`
- `apps/api/src/openapi/endpoints/admin-subscribe.endpoints.ts`
- `apps/api/src/endpoints/admin/subscribe/admin-user-subscribe.service.ts`
- `apps/api/src/endpoints/repositories/subscribe.repository.ts`
