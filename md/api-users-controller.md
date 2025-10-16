# Users Controller API 문서

## 컨트롤러: UserController

**Base Path:** `/users`

---

### 1. getUserProfile

- **메소드명:** getUserProfile
- **요청 메소드:** GET
- **요청 주소:** `/users/profile`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 현재 로그인한 사용자의 프로필 정보를 조회합니다
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 2. getUserSubscribeByUserNo

- **메소드명:** getUserSubscribeByUserNo
- **요청 메소드:** GET
- **요청 주소:** `/users/subscribe`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<SelectUserSbcrInfoType>
- **설명:** 이메일 구독 설정 조회
- **인증:** JWT 인증 필요

---

### 3. createUser

- **메소드명:** createUser
- **요청 메소드:** POST
- **요청 주소:** `/users`
- **요청 데이터 (Body):** CreateUserDto
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 새 사용자 계정 생성

---

### 4. updateUserProfile

- **메소드명:** updateUserProfile
- **요청 메소드:** PUT
- **요청 주소:** `/users/profile`
- **요청 데이터 (Body):** UpdateUserDto
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 프로필 정보 수정
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 5. updateUserSubscribe

- **메소드명:** updateUserSubscribe
- **요청 메소드:** PUT
- **요청 주소:** `/users/subscribe`
- **요청 데이터 (Body):** UpdateSubscribeDto
- **반환 타입:** ResponseDto<SelectUserSbcrInfoType>
- **설명:** 이메일 구독 설정 변경
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 6. deleteUserProfile

- **메소드명:** deleteUserProfile
- **요청 메소드:** DELETE
- **요청 주소:** `/users/profile`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<boolean>
- **설명:** 내 프로필 삭제
- **인증:** JWT 인증 필요 (USER, ADMIN)
