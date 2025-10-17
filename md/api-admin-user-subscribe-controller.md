# Admin User Subscribe Controller API 문서

## 컨트롤러: AdminSubscribeController

**Base Path:** `/admin/subscribes`

---

## 구독 설정 통계 관련 엔드포인트

### 1. adminGetAnalyzeSubscribeData (통계)

- **메소드명:** adminGetAnalyzeSubscribeData
- **요청 메소드:** GET
- **요청 주소:** `/admin/subscribes/analyze/overview`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<AnalyzeSubscribeStatItemType[]>
- **설명:** 구독 설정 분석 통계
- **인증:** JWT 인증 필요 (ADMIN)

---

### 2. adminGetSubscribeNotificationDistribution (통계)

- **메소드명:** adminGetSubscribeNotificationDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/subscribes/analyze/notification-distribution`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<SubscribeNotificationDistributionItemType[]>
- **설명:** 알림 설정별 분포 통계
- **인증:** JWT 인증 필요 (ADMIN)

---

### 3. adminGetTotalActiveNotificationUsers (통계)

- **메소드명:** adminGetTotalActiveNotificationUsers
- **요청 메소드:** GET
- **요청 주소:** `/admin/subscribes/analyze/active-users`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TotalActiveNotificationUsersItemType[]>
- **설명:** 전체 알림 활성 사용자 수 통계
- **인증:** JWT 인증 필요 (ADMIN)

---

### 4. adminGetTotalInactiveNotificationUsers (통계)

- **메소드명:** adminGetTotalInactiveNotificationUsers
- **요청 메소드:** GET
- **요청 주소:** `/admin/subscribes/analyze/inactive-users`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TotalInactiveNotificationUsersItemType[]>
- **설명:** 전체 알림 비활성 사용자 수 통계
- **인증:** JWT 인증 필요 (ADMIN)

---

## 기존 구독 설정 관리 엔드포인트

### 5. adminGetUserSubscribeList

- **메소드명:** adminGetUserSubscribeList
- **요청 메소드:** GET
- **요청 주소:** `/admin/subscribes/search`
- **요청 데이터 (Query):** SearchSubscribeDto의 모든 필드들을 Query 파라미터로
- **반환 타입:** ResponseDto<ListDto<UserSubscribeDto>>
- **설명:** 전체 사용자 구독 설정 목록 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 6. getUserSubscribeByUserNo

- **메소드명:** getUserSubscribeByUserNo
- **요청 메소드:** GET
- **요청 주소:** `/admin/subscribes/:userNo`
- **요청 데이터 (Param):** userNo (number)
- **반환 타입:** ResponseDto<UserSubscribeDto>
- **설명:** 특정 사용자 구독 설정 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 7. adminCreateUserSubscribe

- **메소드명:** adminCreateUserSubscribe
- **요청 메소드:** POST
- **요청 주소:** `/admin/subscribes`
- **요청 데이터 (Body):** CreateSubscribeDto
- **반환 타입:** ResponseDto<UserSubscribeDto>
- **설명:** 관리자가 특정 사용자 구독 설정 생성
- **인증:** JWT 인증 필요 (ADMIN)

---

### 8. adminMultipleUpdateUserSubscribe

- **메소드명:** adminMultipleUpdateUserSubscribe
- **요청 메소드:** PUT
- **요청 주소:** `/admin/subscribes/multiple`
- **요청 데이터 (Body):** UpdateSubscribeDto
- **반환 타입:** ResponseDto<any>
- **설명:** 다수 사용자 구독 설정 일괄 변경
- **인증:** JWT 인증 필요 (ADMIN)

---

### 9. adminDeleteUserSubscribe

- **메소드명:** adminDeleteUserSubscribe
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/subscribes/:sbcrNo`
- **요청 데이터 (Param):** sbcrNo (number)
- **반환 타입:** ResponseDto<boolean>
- **설명:** 특정 사용자 구독 설정 삭제
- **인증:** JWT 인증 필요 (ADMIN)

---

### 10. adminMultipleDeleteUserSubscribe

- **메소드명:** adminMultipleDeleteUserSubscribe
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/subscribes/multiple`
- **요청 데이터 (Body):** DeleteSubscribeDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 사용자 구독 설정 일괄 삭제
- **인증:** JWT 인증 필요 (ADMIN)
