# Category Subscribe Controller API 문서

## 컨트롤러: CategorySubscribeController

**Base Path:** `/users/subscribes/categories`

---

### 1. getCategorySubscribeList

- **메소드명:** getCategorySubscribeList
- **요청 메소드:** POST
- **요청 주소:** `/users/subscribes/categories/search`
- **요청 데이터 (Body):** SearchCategorySubscribeDto
- **반환 타입:** ResponseDto<ListType<SelectCtgrySbcrMpngListItemType>>
- **설명:** 사용자가 구독한 카테고리 목록 조회
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 2. getCategorySubscribeByCtgryNo

- **메소드명:** getCategorySubscribeByCtgryNo
- **요청 메소드:** POST
- **요청 주소:** `/users/subscribes/categories/:ctgryNo/search`
- **요청 데이터 (Param):** ctgryNo (number)
- **요청 데이터 (Body):** SearchCategorySubscribeDto
- **반환 타입:** ResponseDto<ListType<SelectCtgrySbcrMpngListItemType>>
- **설명:** 특정 카테고리 구독 상태 조회
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 3. createCategorySubscribe

- **메소드명:** createCategorySubscribe
- **요청 메소드:** POST
- **요청 주소:** `/users/subscribes/categories/:ctgryNo`
- **요청 데이터 (Param):** ctgryNo (number)
- **요청 데이터 (Body):** CreateCategorySubscribeDto
- **반환 타입:** ResponseDto<SelectCtgrySbcrMpngType>
- **설명:** 특정 카테고리 구독 설정
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 4. multipleCreateCategorySubscribe

- **메소드명:** multipleCreateCategorySubscribe
- **요청 메소드:** POST
- **요청 주소:** `/users/subscribes/categories/multiple`
- **요청 데이터 (Body):** CreateCategorySubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 카테고리 일괄 구독
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 5. updateCategorySubscribe

- **메소드명:** updateCategorySubscribe
- **요청 메소드:** PUT
- **요청 주소:** `/users/subscribes/categories/:ctgrySbcrNo`
- **요청 데이터 (Param):** ctgrySbcrNo (number)
- **요청 데이터 (Body):** UpdateCategorySubscribeDto
- **반환 타입:** ResponseDto<SelectCtgrySbcrMpngType>
- **설명:** 특정 카테고리 구독 설정 변경
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 6. multipleUpdateCategorySubscribe

- **메소드명:** multipleUpdateCategorySubscribe
- **요청 메소드:** PUT
- **요청 주소:** `/users/subscribes/categories/multiple`
- **요청 데이터 (Body):** UpdateCategorySubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 카테고리 구독 설정 일괄 변경
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 7. deleteCategorySubscribe

- **메소드명:** deleteCategorySubscribe
- **요청 메소드:** DELETE
- **요청 주소:** `/users/subscribes/categories/:ctgrySbcrNo`
- **요청 데이터 (Param):** ctgrySbcrNo (number)
- **반환 타입:** ResponseDto<boolean>
- **설명:** 특정 카테고리 구독 해제
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 8. multipleDeleteCategorySubscribe

- **메소드명:** multipleDeleteCategorySubscribe
- **요청 메소드:** DELETE
- **요청 주소:** `/users/subscribes/categories/multiple`
- **요청 데이터 (Body):** DeleteCategorySubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 카테고리 구독 일괄 해제
- **인증:** JWT 인증 필요 (USER, ADMIN)
