**CRITICAL** 이 문서는 작업 순서 체크 이외엔 수정하지 않습니다.

# 작업 개요

- 목표:
  - `/src/endpoints/` 폴더 내의 컨트롤러와 서비스의 엔드포인트 및 실제 응답과 `/openapi/endpoints` 내의 `endpoints.ts` 파일의 응답 예시들이 일치하는지 확인.
    - 컨트롤러에서 `@Body` 데코레이터를 통해 받는 DTO와 `endpoints.ts` 파일의 각 엔드포인트에 명시되어 있는 body 의 스키마 가 같은지 확인.
    - 컨트롤러에서 `@Param` 데코레이터를 통해 받는 파라미터와 `endpoints.ts` 파일의 각 엔드포인트에 명시되어 있는 params 의 스키마 가 같은지 확인.
    - 컨트롤러의 응답 객체(`ResponseDto`)의(code, message) 가 `endpoints.ts` 에 명시되어있는 값들과 같은지 확인.
    - 서비스에서 반환하는 모든 응답 유형과 에러 케이스들이 `endpoints.ts`에 올바르게 문서화되어 있는지 확인.
    - 서비스의 비즈니스 로직에서 발생할 수 있는 모든 예외 상황과 에러 응답이 API 문서에 반영되어 있는지 확인.
- 중요도: 최상

# 작업 내용

1. `/src/endpoints/` 폴더 내의 컨트롤러와 서비스의 엔드포인트 및 실제 응답과 `/openapi/endpoints` 내의 `endpoints.ts` 파일의 응답 예시들이 일치하는지 확인.
2. 컨트롤러에서 `@Body` 데코레이터를 통해 받는 DTO와 `endpoints.ts` 파일의 각 엔드포인트에 명시되어 있는 body 의 스키마 가 같은지 확인.
3. 컨트롤러에서 `@Param` 데코레이터를 통해 받는 파라미터와 `endpoints.ts` 파일의 각 엔드포인트에 명시되어 있는 params 의 스키마 가 같은지 확인.
4. 컨트롤러의 응답 객체(`ResponseDto`)의(code, message) 가 `endpoints.ts` 에 명시되어있는 값들과 같은지 확인.
5. 서비스에서 반환하는 모든 응답 유형(성공, 실패, 에러)이 `endpoints.ts`에 올바르게 문서화되어 있는지 확인.
6. 서비스의 비즈니스 로직에서 발생할 수 있는 모든 예외 상황과 에러 응답이 API 문서에 반영되어 있는지 확인.
7. 서비스에서 사용하는 레포지토리 메서드의 응답과 에러 케이스가 최종 API 응답에 올바르게 반영되는지 확인.

# 작업 순서

## 엔드포인트 목록

**CRITICAL** 컨트롤러와 연관된 서비스, 레포지토리까지 모두 확인해야 합니다. 서비스의 모든 응답 유형과 에러 케이스를 분석하여 API 문서와 일치하는지 검증합니다.

1. **admin [✅]**

   - 컨트롤러: `admin/admin.controller.ts`
   - 서비스: `admin/admin.service.ts`
   - 레포지토리: 없음 (별도로 리포지토리를 사용하지 않고 UserRepository 를 사용)
   - endpoints.ts: `admin.endpoints.ts`

2. **admin-categories [✅]**

   - 컨트롤러: `admin/categories/admin-categories.controller.ts`
   - 서비스: `admin/categories/admin-categories.service.ts`
   - 레포지토리: `repositories/category.repository.ts`
   - endpoints.ts: `admin-categories.endpoints.ts`

3. **admin-category-subscribe [✅]**

   - 컨트롤러: `admin/category-subscribe/admin-category-subscribe.controller.ts`
   - 서비스: `subscribe/category-subscribe/category-subscribe.service.ts` (일반 사용자용 서비스 재사용)
   - 레포지토리: `repositories/category-subscribe.repository.ts`
   - endpoints.ts: `admin-category-subscribe.endpoints.ts`

4. **admin-comments [✅]**

   - 컨트롤러: `admin/comments/admin-comments.controller.ts`
   - 서비스: `admin/comments/admin-comments.service.ts`
   - 레포지토리: `repositories/comment.repository.ts`
   - endpoints.ts: `admin-comments.endpoints.ts`

5. **admin-posts [✅]**

   - 컨트롤러: `admin/posts/admin-posts.controller.ts`
   - 서비스: `admin/posts/admin-posts.service.ts`
   - 레포지토리: `repositories/post.repository.ts`
   - endpoints.ts: `admin-posts.endpoints.ts`

6. **admin-subscribe [✅]**

   - 컨트롤러: `admin/subscribe/admin-user-subscribe.controller.ts`
   - 서비스: `admin/subscribe/admin-user-subscribe.service.ts`
   - 레포지토리: `repositories/subscribe.repository.ts`
   - endpoints.ts: `admin-subscribe.endpoints.ts`

7. **admin-tag-subscribe [✅]**

   - 컨트롤러: `admin/tag-subscribe/admin-tag-subscribe.controller.ts`
   - 서비스: `subscribe/tag-subscribe/tag-subscribe.service.ts` (일반 사용자용 서비스 재사용)
   - 레포지토리: `repositories/tag-subscribe.repository.ts`
   - endpoints.ts: `admin-tag-subscribe.endpoints.ts`

8. **admin-tags [✅]**

   - 컨트롤러: `admin/tags/admin-tags.controller.ts`
   - 서비스: `admin/tags/admin-tags.service.ts`
   - 레포지토리: `repositories/tag.repository.ts`
   - endpoints.ts: `admin-tags.endpoints.ts`

9. **admin-users [✅]**

   - 컨트롤러: `admin/users/admin-users.controller.ts`
   - 서비스: `admin/users/admin-users.service.ts`
   - 레포지토리: `repositories/user.repository.ts`
   - endpoints.ts: `admin-users.endpoints.ts`

10. **auth [✅]**

    - 컨트롤러: `auth/auth.controller.ts`
    - 서비스: `auth/auth.service.ts`
    - 레포지토리: `repositories/user.repository.ts`
    - endpoints.ts: `auth.endpoints.ts`

11. **categories [✅]**

    - 컨트롤러: `categories/categories.controller.ts`
    - 서비스: `categories/categories.service.ts`
    - 레포지토리: `repositories/category.repository.ts`
    - endpoints.ts: `categories.endpoints.ts`

12. **category-subscribe [✅]**

    - 컨트롤러: `subscribe/category-subscribe/category-subscribe.controller.ts`
    - 서비스: `subscribe/category-subscribe/category-subscribe.service.ts`
    - 레포지토리: `repositories/category-subscribe.repository.ts`
    - endpoints.ts: `category-subscribe.endpoints.ts`

13. **comments [✅]**

    - 컨트롤러: `comments/comments.controller.ts`
    - 서비스: `comments/comments.service.ts`
    - 레포지토리: `repositories/comment.repository.ts`
    - endpoints.ts: `comments.endpoints.ts`

14. **posts [✅]**

    - 컨트롤러: `posts/posts.controller.ts`
    - 서비스: `posts/posts.service.ts`
    - 레포지토리: `repositories/post.repository.ts`
    - endpoints.ts: `posts.endpoints.ts`

15. **tag-subscribe [✅]**

    - 컨트롤러: `subscribe/tag-subscribe/tag-subscribe.controller.ts`
    - 서비스: `subscribe/tag-subscribe/tag-subscribe.service.ts`
    - 레포지토리: `repositories/tag-subscribe.repository.ts`
    - endpoints.ts: `tag-subscribe.endpoints.ts`

16. **tags [✅]**

    - 컨트롤러: `tags/tags.controller.ts`
    - 서비스: `tags/tags.service.ts`
    - 레포지토리: `repositories/tag.repository.ts`
    - endpoints.ts: `tags.endpoints.ts`

17. **users [✅]**
    - 컨트롤러: `users/users.controller.ts`
    - 서비스: `users/users.service.ts`
    - 레포지토리: `repositories/user.repository.ts`
    - endpoints.ts: `users.endpoints.ts`

---

사용자가 번호를 요청하면 작업 순서의 번호를 의미합니다. 해당 번호를 작업내용에 따라 분석하면 됩니다. 확인하다가 일치하지 않는 부분을 발견하면 수정을 함께 진행합니다. 수정시에는 아래의 보고 양식에 추가해서 결과를 보강합니다. 문제가 없다면 문서를 수정해 완료 체크합니다.

**분석 대상:**

- 컨트롤러의 모든 엔드포인트와 응답
- 서비스의 모든 메서드와 응답 유형
- 레포지토리의 응답과 에러 케이스
- API 문서(`endpoints.ts`)의 모든 응답 스키마

# 작업 결과 보고 양식

작업내용의 순번에 따라 보고하되, 4번의 경우에는 ResponseDto 의 code 와 message 프로퍼티로 나열하며 비교 결과를 보고합니다. 미사여구 붙일 필요 없이 아래의 양식에 따라 보고합니다.

**컨트롤러 응답 분석: 성공 실패 예외 전부 메소드당 구분해서 응답별로 나열.**

```md
controller.ts

1. 메소드명:

- code: ''
- message: ''

endpoints.ts

1. 메소드명:

- code: ''
- message: ''
```

불일치 상세 항목

```md
-
```
