# 점검 목표

1. 응답 코드, 응답 메시지, 응답 데이터가 일치하는지 확인.
2. Endpoint 데코레이터의 예시 응답 코드, 예시 메시지가 실제 응답(성공 실패 등 모든 케이스 점검)과 일치하는지 확인.

# A - 첫번째 케이스.

1. 하나의 리포 메소드를 사용함.
2. 리포의 응답과 서비스의 응답이 일치하는지 확인. (실제 응답과 응답 타입까지 전부.)
3. 서비스의 응답과 컨트롤러의 응답이 일치하는지 확인. (실제 응답과 응답 타입까지 전부.)
4. Endpoint 데코레이터의 예시 응답 코드, 예시 메시지가 실제 응답(성공 실패 등 모든 케이스 점검)과 일치하는지 확인.

# B - 두번째 케이스.

1. 여러 리포 메소드를 사용함.
2. 최종적으로 반환하는 서비스의 응답과 컨트롤러의 응답이 일치하는지 확인. (실제 응답과 응답 타입까지 전부.)
3. Endpoint 데코레이터의 예시 응답 코드, 예시 메시지가 실제 응답(성공 실패 등 모든 케이스 점검)과 일치하는지 확인.

# 점검 순서

1. ~~auth/auth.controller.ts~~
2. ~~users/users.controller.ts~~
3. ~~posts/posts.controller.ts~~
4. ~~subscribe/category-subscribe/category-subscribe.controller.ts~~
5. ~~subscribe/tag-subscribe/tag-subscribe.controller.ts~~
6. admin/admin.controller.ts
7. admin/category-subscribe/admin-category-subscribe.controller.ts
8. admin/subscribe/admin-user-subscribe.controller.ts
9. admin/tag-subscribe/admin-tag-subscribe.controller.ts
10. admin/users/admin-users.controller.ts
11. admin/posts/admin-posts.controller.ts

# 점검 방식

컨트롤러 하나씩 점검.

# 점검 결과 양식 (첫번째 케이스 기준)

A1번 점검 결과
A2번 점검 결과
A3번 점검 결과
A4번 점검 결과
