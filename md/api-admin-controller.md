# Admin Controller API 문서

## 컨트롤러: AdminController

**Base Path:** `/admin`

---

### 1. updateProfile

- **메소드명:** updateProfile
- **요청 메소드:** PUT
- **요청 주소:** `/admin/profile`
- **요청 데이터 (Body):** UpdateUserDto
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 관리자 프로필 수정
- **인증:** JWT 인증 필요 (ADMIN)
