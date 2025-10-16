# Tag Subscribe Controller API 문서

## 컨트롤러: TagSubscribeController

**Base Path:** `/users/subscribes/tags`

---

### 1. getTagSubscribeList

- **메소드명:** getTagSubscribeList
- **요청 메소드:** POST
- **요청 주소:** `/users/subscribes/tags/search`
- **요청 데이터 (Body):** SearchTagSubscribeDto
- **반환 타입:** ResponseDto<ListType<SelectTagSbcrMpngListItemType>>
- **설명:** 사용자가 구독한 태그 목록 조회
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 2. getTagSubscribeByTagNo

- **메소드명:** getTagSubscribeByTagNo
- **요청 메소드:** POST
- **요청 주소:** `/users/subscribes/tags/:tagNo/search`
- **요청 데이터 (Param):** tagNo (number)
- **요청 데이터 (Body):** SearchTagSubscribeDto
- **반환 타입:** ResponseDto<ListType<SelectTagSbcrMpngListItemType>>
- **설명:** 특정 태그 구독 상태 조회
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 3. createTagSubscribe

- **메소드명:** createTagSubscribe
- **요청 메소드:** POST
- **요청 주소:** `/users/subscribes/tags/:tagNo`
- **요청 데이터 (Param):** tagNo (number)
- **요청 데이터 (Body):** CreateTagSubscribeDto
- **반환 타입:** ResponseDto<SelectTagSbcrMpngType>
- **설명:** 특정 태그 구독 설정
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 4. multipleCreateTagSubscribe

- **메소드명:** multipleCreateTagSubscribe
- **요청 메소드:** POST
- **요청 주소:** `/users/subscribes/tags/multiple`
- **요청 데이터 (Body):** CreateTagSubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 태그 일괄 구독
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 5. updateTagSubscribe

- **메소드명:** updateTagSubscribe
- **요청 메소드:** PUT
- **요청 주소:** `/users/subscribes/tags/:tagSbcrNo`
- **요청 데이터 (Param):** tagSbcrNo (number)
- **요청 데이터 (Body):** UpdateTagSubscribeDto
- **반환 타입:** ResponseDto<SelectTagSbcrMpngType>
- **설명:** 특정 태그 구독 설정 변경
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 6. multipleUpdateTagSubscribe

- **메소드명:** multipleUpdateTagSubscribe
- **요청 메소드:** PUT
- **요청 주소:** `/users/subscribes/tags/multiple`
- **요청 데이터 (Body):** UpdateTagSubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 태그 구독 설정 일괄 변경
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 7. deleteTagSubscribe

- **메소드명:** deleteTagSubscribe
- **요청 메소드:** DELETE
- **요청 주소:** `/users/subscribes/tags/:tagSbcrNo`
- **요청 데이터 (Param):** tagSbcrNo (number)
- **반환 타입:** ResponseDto<boolean>
- **설명:** 특정 태그 구독 해제
- **인증:** JWT 인증 필요 (USER, ADMIN)

---

### 8. multipleDeleteTagSubscribe

- **메소드명:** multipleDeleteTagSubscribe
- **요청 메소드:** DELETE
- **요청 주소:** `/users/subscribes/tags/multiple`
- **요청 데이터 (Body):** DeleteTagSubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 태그 구독 일괄 해제
- **인증:** JWT 인증 필요 (USER, ADMIN)
