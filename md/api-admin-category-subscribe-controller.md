# Admin Category Subscribe Controller API 문서

## 컨트롤러: AdminCategorySubscribeController

**Base Path:** `/admin/subscribes/categories`

---

### 1. adminMultipleCreateCategorySubscribe

- **메소드명:** adminMultipleCreateCategorySubscribe
- **요청 메소드:** POST
- **요청 주소:** `/admin/subscribes/categories/multiple`
- **요청 데이터 (Body):** CreateCategorySubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 - 다수 카테고리 구독 일괄 생성
- **인증:** JWT 인증 필요 (ADMIN)

---

### 2. adminMultipleUpdateCategorySubscribe

- **메소드명:** adminMultipleUpdateCategorySubscribe
- **요청 메소드:** PUT
- **요청 주소:** `/admin/subscribes/categories/multiple`
- **요청 데이터 (Body):** UpdateCategorySubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 - 다수 카테고리 구독 일괄 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 3. adminMultipleDeleteCategorySubscribe

- **메소드명:** adminMultipleDeleteCategorySubscribe
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/subscribes/categories/multiple`
- **요청 데이터 (Body):** DeleteCategorySubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 - 다수 카테고리 구독 일괄 삭제
- **인증:** JWT 인증 필요 (ADMIN)
