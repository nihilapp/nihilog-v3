# Auth Controller API 문서

## 컨트롤러: AuthController

**Base Path:** `/auth`

---

### 1. signIn

- **메소드명:** signIn
- **요청 메소드:** POST
- **요청 주소:** `/auth/signin`
- **요청 데이터 (Body):** SignInDto
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 사용자 로그인

---

### 2. refreshToken

- **메소드명:** refreshToken
- **요청 메소드:** POST
- **요청 주소:** `/auth/refresh`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 액세스 토큰 재발급
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 3. signOut

- **메소드명:** signOut
- **요청 메소드:** POST
- **요청 주소:** `/auth/signout`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<null>
- **설명:** 사용자 로그아웃

---

### 4. getSession

- **메소드명:** getSession
- **요청 메소드:** GET
- **요청 주소:** `/auth/session`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<UserInfoDto>
- **설명:** 현재 세션 조회
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 5. changePassword

- **메소드명:** changePassword
- **요청 메소드:** POST
- **요청 주소:** `/auth/change-password`
- **요청 데이터 (Body):** ChangePasswordDto
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 비밀번호 변경
- **인증:** JWT 인증 필요 (USER, ADMIN)
