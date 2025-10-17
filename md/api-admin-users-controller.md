# Admin Users Controller API 문서

## 컨트롤러: AdminUserController

**Base Path:** `/admin/users`

---

## 사용자 통계 관련 엔드포인트

### 1. getAnalyzeUserData (통계)

- **메소드명:** getAnalyzeUserData
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/overview`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<AnalyzeUserStatItemType[]>
- **설명:** 사용자 분석 통계 (9개 지표 통합)
- **인증:** JWT 인증 필요 (ADMIN)

---

### 2. getActiveUserAnalysis (통계)

- **메소드명:** getActiveUserAnalysis
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/active-users`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<ActiveUserAnalysisItemType[]>
- **설명:** 활성 사용자 분석
- **인증:** JWT 인증 필요 (ADMIN)

---

### 3. getTopUsersByContribution (통계)

- **메소드명:** getTopUsersByContribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/top-contribution`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TopUsersByContributionItemType[]>
- **설명:** 사용자별 기여도 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 4. getTopUsersByPostCount (통계)

- **메소드명:** getTopUsersByPostCount
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/top-post-count`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TopUsersByPostCountItemType[]>
- **설명:** 사용자별 포스트 작성 수 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 5. getTopUsersByCommentCount (통계)

- **메소드명:** getTopUsersByCommentCount
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/top-comment-count`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TopUsersByCommentCountItemType[]>
- **설명:** 사용자별 댓글 작성 수 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 6. getUserRoleDistribution (통계)

- **메소드명:** getUserRoleDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/role-distribution`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<UserRoleDistributionItemType[]>
- **설명:** 역할별 사용자 분포
- **인증:** JWT 인증 필요 (ADMIN)

---

### 7. getUserStatusDistribution (통계)

- **메소드명:** getUserStatusDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/status-distribution`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<UserStatusDistributionItemType[]>
- **설명:** 상태별 사용자 분포
- **인증:** JWT 인증 필요 (ADMIN)

---

### 8. getInactiveUsersList (통계)

- **메소드명:** getInactiveUsersList
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/inactive-users`
- **요청 데이터 (Query):** daysThreshold (선택적, number)
- **반환 타입:** ResponseDto<InactiveUsersListItemType[]>
- **설명:** 비활성 사용자 목록
- **인증:** JWT 인증 필요 (ADMIN)

---

### 9. getUserGrowthRate (통계)

- **메소드명:** getUserGrowthRate
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/growth-rate`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<UserGrowthRateItemType[]>
- **설명:** 사용자 성장률
- **인증:** JWT 인증 필요 (ADMIN)

---

### 10. getUserRetentionRate (통계)

- **메소드명:** getUserRetentionRate
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/analyze/retention-rate`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<UserRetentionRateItemType[]>
- **설명:** 사용자 유지율
- **인증:** JWT 인증 필요 (ADMIN)

---

## 기존 관리자 사용자 관련 엔드포인트

### 11. adminGetUserList

- **메소드명:** adminGetUserList
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/search`
- **요청 데이터 (Query):** SearchUserDto의 모든 필드들을 Query 파라미터로
- **반환 타입:** ResponseDto<ListType<SelectUserInfoListItemType>>
- **설명:** 사용자 목록 검색
- **인증:** JWT 인증 필요 (ADMIN)

---

### 12. adminGetUserByUserNo

- **메소드명:** adminGetUserByUserNo
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/:userNo`
- **요청 데이터 (Param):** userNo (number)
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 사용자 번호로 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 13. adminGetUserByUserNm

- **메소드명:** adminGetUserByUserNm
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/name/:name`
- **요청 데이터 (Param):** name (string)
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 사용자명으로 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 14. adminGetUserByEmlAddr

- **메소드명:** adminGetUserByEmlAddr
- **요청 메소드:** GET
- **요청 주소:** `/admin/users/email/:email`
- **요청 데이터 (Param):** email (string)
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 이메일로 사용자 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 15. adminCreateUser

- **메소드명:** adminCreateUser
- **요청 메소드:** POST
- **요청 주소:** `/admin/users`
- **요청 데이터 (Body):** CreateUserDto
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 새 사용자 생성 (기존 어드민이 새 어드민 추가)
- **인증:** JWT 인증 필요 (ADMIN)

---

### 16. adminSignup

- **메소드명:** adminSignup
- **요청 메소드:** POST
- **요청 주소:** `/admin/users/signup`
- **요청 데이터 (Body):** CreateUserDto
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 최초 어드민 생성 (개발 환경에서만)
- **인증:** 없음 (개발 환경에서만 접근 가능)

---

### 17. adminUpdateUser

- **메소드명:** adminUpdateUser
- **요청 메소드:** PUT
- **요청 주소:** `/admin/users/:userNo`
- **요청 데이터 (Param):** userNo (number)
- **요청 데이터 (Body):** UpdateUserDto
- **반환 타입:** ResponseDto<SelectUserInfoType>
- **설명:** 사용자 정보 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 18. adminMultipleUpdateUser

- **메소드명:** adminMultipleUpdateUser
- **요청 메소드:** PUT
- **요청 주소:** `/admin/users/multiple`
- **요청 데이터 (Body):** UpdateUserDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 사용자 일괄 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 19. adminDeleteUser

- **메소드명:** adminDeleteUser
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/users/:userNo`
- **요청 데이터 (Param):** userNo (number)
- **반환 타입:** ResponseDto<boolean>
- **설명:** 사용자 삭제
- **인증:** JWT 인증 필요 (ADMIN)

---

### 20. adminMultipleDeleteUser

- **메소드명:** adminMultipleDeleteUser
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/users/multiple`
- **요청 데이터 (Body):** DeleteMultipleUsersDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 사용자 일괄 삭제
- **인증:** JWT 인증 필요 (ADMIN)
