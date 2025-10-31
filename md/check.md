# API 엔드포인트 목록

## 인증 관련 (AuthController)

- POST /auth/signin
- POST /auth/refresh
- POST /auth/signout
- GET /auth/session
- PUT /auth/password

## 사용자 관련 (UserController)

- GET /users/profile
- GET /users/subscribe
- POST /users
- PUT /users/profile
- PUT /users/subscribe
- DELETE /users/profile

## 게시글 관련 (PostsController)

- GET /posts
- GET /posts/:pstNo
- GET /posts/slug/:pstCd
- GET /posts/tags/:tagNo
- GET /posts/categories/:ctgryNo
- GET /posts/archive/:date
- POST /posts/view-logs
- POST /posts/share-logs
- POST /posts/bookmarks
- DELETE /posts/bookmarks
- GET /posts/bookmarks

## 태그 관련 (TagController)

- GET /tags
- GET /tags/:tagNo
- GET /tags/name/:name

## 댓글 관련 (CommentsController)

- GET /comments
- GET /comments/:cmntNo
- POST /comments
- PUT /comments/:cmntNo
- DELETE /comments/:cmntNo

## 카테고리 관련 (CategoriesController)

- GET /categories
- GET /categories/:ctgryNo
- GET /categories/name/:name

## 카테고리 구독 관련 (CategorySubscribeController)

- GET /users/subscribes/categories
- GET /users/subscribes/categories/:ctgryNo
- POST /users/subscribes/categories/:ctgryNo
- POST /users/subscribes/categories/multiple
- PUT /users/subscribes/categories/:ctgrySbcrNo
- PUT /users/subscribes/categories/multiple
- DELETE /users/subscribes/categories/:ctgrySbcrNo
- DELETE /users/subscribes/categories/multiple

## 태그 구독 관련 (TagSubscribeController)

- GET /users/subscribes/tags
- GET /users/subscribes/tags/:tagNo
- POST /users/subscribes/tags/:tagNo
- POST /users/subscribes/tags/multiple
- PUT /users/subscribes/tags/:tagSbcrNo
- PUT /users/subscribes/tags/multiple
- DELETE /users/subscribes/tags/:tagSbcrNo
- DELETE /users/subscribes/tags/multiple

## 관리자 관련 (AdminController)

- PATCH /admin/profile

## 관리자 사용자 관련 (AdminUserController)

- GET /admin/users/analyze/overview
- GET /admin/users/analyze/active-users
- GET /admin/users/analyze/top-contribution
- GET /admin/users/analyze/top-post-count
- GET /admin/users/analyze/top-comment-count
- GET /admin/users/analyze/role-distribution
- GET /admin/users/analyze/status-distribution
- GET /admin/users/analyze/inactive-users
- GET /admin/users/analyze/growth-rate
- GET /admin/users/analyze/retention-rate
- GET /admin/users
- GET /admin/users/:userNo
- GET /admin/users/name/:name
- GET /admin/users/email/:email
- POST /admin/users
- POST /admin/users/admin
- PATCH /admin/users/:userNo
- PATCH /admin/users/multiple
- DELETE /admin/users/:userNo
- DELETE /admin/users/multiple

## 관리자 게시글 관련 (AdminPostsController)

- GET /admin/posts/analyze/overview
- GET /admin/posts/analyze/shares
- GET /admin/posts/analyze/average-views
- GET /admin/posts/analyze/average-bookmarks
- GET /admin/posts/analyze/top-popular
- GET /admin/posts/analyze/top-comments
- GET /admin/posts/analyze/status-ratio
- POST /admin/posts
- PATCH /admin/posts/:pstNo
- PATCH /admin/posts/multiple
- DELETE /admin/posts/:pstNo
- DELETE /admin/posts/multiple

## 관리자 구독 관련 (AdminSubscribeController)

- GET /admin/subscribes/analyze/overview
- GET /admin/subscribes/analyze/notification-distribution
- GET /admin/subscribes/analyze/active-users
- GET /admin/subscribes/analyze/inactive-users
- GET /admin/subscribes
- GET /admin/subscribes/:userNo
- POST /admin/subscribes
- PATCH /admin/subscribes/multiple
- DELETE /admin/subscribes/:sbcrNo
- DELETE /admin/subscribes/multiple

## 관리자 카테고리 구독 관련 (AdminCategorySubscribeController)

- POST /admin/subscribes/categories/multiple
- PATCH /admin/subscribes/categories/multiple
- DELETE /admin/subscribes/categories/multiple

## 관리자 태그 구독 관련 (AdminTagSubscribeController)

- POST /admin/subscribes/tags/multiple
- PATCH /admin/subscribes/tags/multiple
- DELETE /admin/subscribes/tags/multiple

## 관리자 태그 관련 (AdminTagsController)

- GET /admin/tags/analyze/overview
- GET /admin/tags/analyze/top-used
- GET /admin/tags/analyze/usage-trend
- GET /admin/tags/analyze/unused
- GET /admin/tags/analyze/top-subscribers
- GET /admin/tags/analyze/subscriber-growth
- GET /admin/tags/analyze/no-subscribers
- GET /admin/tags/analyze/efficiency
- GET /admin/tags/analyze/frequency
- GET /admin/tags/analyze/lifecycle
- GET /admin/tags/analyze/status-distribution
- GET /admin/tags/analyze/creator-stats
- GET /admin/tags/analyze/cleanup
- POST /admin/tags
- POST /admin/tags/multiple
- PATCH /admin/tags/:tagNo
- PATCH /admin/tags/multiple
- DELETE /admin/tags/:tagNo
- DELETE /admin/tags/multiple
- GET /admin/tags/mapping/search
- GET /admin/tags/mapping/:pstNo/:tagNo
- POST /admin/tags/mapping
- POST /admin/tags/mapping/multiple
- DELETE /admin/tags/mapping
- DELETE /admin/tags/mapping/multiple

## 관리자 댓글 관련 (AdminCommentsController)

- GET /admin/comments/analyze/overview
- GET /admin/comments/analyze/top-posts
- GET /admin/comments/analyze/top-users
- GET /admin/comments/analyze/average-per-post
- GET /admin/comments/analyze/status-distribution
- GET /admin/comments/analyze/approval-rate
- GET /admin/comments/analyze/spam-rate
- GET /admin/comments/analyze/reply-ratio
- GET /admin/comments/analyze/average-depth
- GET /admin/comments/analyze/posts-without-comments
- PATCH /admin/comments/multiple
- DELETE /admin/comments/multiple
