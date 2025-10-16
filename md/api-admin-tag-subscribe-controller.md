# Admin Tag Subscribe Controller API 문서

## 컨트롤러: AdminTagSubscribeController

**Base Path:** `/admin/subscribes/tags`

---

### 1. adminMultipleCreateTagSubscribe

- **메소드명:** adminMultipleCreateTagSubscribe
- **요청 메소드:** POST
- **요청 주소:** `/admin/subscribes/tags/multiple`
- **요청 데이터 (Body):** CreateTagSubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 - 다수 태그 구독 일괄 생성
- **인증:** JWT 인증 필요 (ADMIN)

---

### 2. adminMultipleUpdateTagSubscribe

- **메소드명:** adminMultipleUpdateTagSubscribe
- **요청 메소드:** PUT
- **요청 주소:** `/admin/subscribes/tags/multiple`
- **요청 데이터 (Body):** UpdateTagSubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 - 다수 태그 구독 일괄 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 3. adminMultipleDeleteTagSubscribe

- **메소드명:** adminMultipleDeleteTagSubscribe
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/subscribes/tags/multiple`
- **요청 데이터 (Body):** DeleteTagSubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 - 다수 태그 구독 일괄 삭제
- **인증:** JWT 인증 필요 (ADMIN)
