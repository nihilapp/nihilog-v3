# Admin Tags Controller API 문서

## 컨트롤러: AdminTagsController

**Base Path:** `/admin/tags`

---

## 태그 통계 관련 엔드포인트

### 1. adminGetAnalyzeTagData (통계)

- **메소드명:** adminGetAnalyzeTagData
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/overview`
- **요청 데이터 (Query):** AnalyzeStatDto, tagNo (선택적, number)
- **반환 타입:** ResponseDto<AnalyzeTagStatItemType[]>
- **설명:** 태그 분석 통계 (시간대별 합산) - 9개 지표 통합
- **인증:** JWT 인증 필요 (ADMIN)

---

### 2. adminGetTopUsedTagsByCount (통계)

- **메소드명:** adminGetTopUsedTagsByCount
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/top-used`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TopUsedTagItemType[]>
- **설명:** 태그별 사용 횟수 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 3. adminGetTagUsageTrend (통계)

- **메소드명:** adminGetTagUsageTrend
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/usage-trend`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TagUsageTrendItemType[]>
- **설명:** 태그별 사용 추이
- **인증:** JWT 인증 필요 (ADMIN)

---

### 4. adminGetUnusedTagsList (통계)

- **메소드명:** adminGetUnusedTagsList
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/unused`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<UnusedTagItemType[]>
- **설명:** 미사용 태그 목록
- **인증:** JWT 인증 필요 (ADMIN)

---

### 5. adminGetTopTagsBySubscriberCount (통계)

- **메소드명:** adminGetTopTagsBySubscriberCount
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/top-subscribers`
- **요청 데이터 (Query):** limit (number)
- **반환 타입:** ResponseDto<TopTagsBySubscriberItemType[]>
- **설명:** 태그별 구독자 수 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 6. adminGetTagSubscriberGrowthRate (통계)

- **메소드명:** adminGetTagSubscriberGrowthRate
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/subscriber-growth`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TagSubscriberGrowthRateItemType[]>
- **설명:** 태그별 구독자 성장률
- **인증:** JWT 인증 필요 (ADMIN)

---

### 7. adminGetTagsWithoutSubscribers (통계)

- **메소드명:** adminGetTagsWithoutSubscribers
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/no-subscribers`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<TagWithoutSubscribersItemType[]>
- **설명:** 구독자 없는 태그 목록
- **인증:** JWT 인증 필요 (ADMIN)

---

### 8. adminGetTagUsageEfficiency (통계)

- **메소드명:** adminGetTagUsageEfficiency
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/efficiency`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<TagUsageEfficiencyItemType[]>
- **설명:** 태그별 사용 효율성
- **인증:** JWT 인증 필요 (ADMIN)

---

### 9. adminGetTagAverageUsageFrequency (통계)

- **메소드명:** adminGetTagAverageUsageFrequency
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/frequency`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TagAverageUsageFrequencyItemType[]>
- **설명:** 태그별 평균 사용 빈도
- **인증:** JWT 인증 필요 (ADMIN)

---

### 10. adminGetTagLifecycleAnalysis (통계)

- **메소드명:** adminGetTagLifecycleAnalysis
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/lifecycle`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<TagLifecycleItemType[]>
- **설명:** 태그 생명주기 분석
- **인증:** JWT 인증 필요 (ADMIN)

---

### 11. adminGetTagStatusDistribution (통계)

- **메소드명:** adminGetTagStatusDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/status-distribution`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<TagStatusDistributionItemType[]>
- **설명:** 태그 상태별 분포
- **인증:** JWT 인증 필요 (ADMIN)

---

### 12. adminGetTagCreatorStatistics (통계)

- **메소드명:** adminGetTagCreatorStatistics
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/creator-stats`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<TagCreatorStatItemType[]>
- **설명:** 태그 생성자별 통계
- **인증:** JWT 인증 필요 (ADMIN)

---

### 13. adminGetTagCleanupRecommendations (통계)

- **메소드명:** adminGetTagCleanupRecommendations
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/analyze/cleanup`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<TagCleanupRecommendationItemType[]>
- **설명:** 태그 정리 필요도
- **인증:** JWT 인증 필요 (ADMIN)

---

## 태그 관리 관련 엔드포인트

### 14. adminCreateTag

- **메소드명:** adminCreateTag
- **요청 메소드:** POST
- **요청 주소:** `/admin/tags`
- **요청 데이터 (Body):** CreateTagDto
- **반환 타입:** ResponseDto<SelectTagInfoType>
- **설명:** 태그 생성
- **인증:** JWT 인증 필요 (ADMIN)

---

### 15. adminMultipleCreateTag

- **메소드명:** adminMultipleCreateTag
- **요청 메소드:** POST
- **요청 주소:** `/admin/tags/multiple`
- **요청 데이터 (Body):** CreateTagDto[]
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 태그 생성
- **인증:** JWT 인증 필요 (ADMIN)

---

### 16. adminUpdateTag

- **메소드명:** adminUpdateTag
- **요청 메소드:** PUT
- **요청 주소:** `/admin/tags`
- **요청 데이터 (Body):** UpdateTagDto
- **반환 타입:** ResponseDto<SelectTagInfoType>
- **설명:** 태그 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 17. adminMultipleUpdateTag

- **메소드명:** adminMultipleUpdateTag
- **요청 메소드:** PUT
- **요청 주소:** `/admin/tags/multiple`
- **요청 데이터 (Body):** UpdateTagDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 태그 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 18. adminDeleteTag

- **메소드명:** adminDeleteTag
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/tags`
- **요청 데이터 (Body):** DeleteTagDto
- **반환 타입:** ResponseDto<boolean>
- **설명:** 태그 삭제
- **인증:** JWT 인증 필요 (ADMIN)

---

### 19. adminMultipleDeleteTag

- **메소드명:** adminMultipleDeleteTag
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/tags/multiple`
- **요청 데이터 (Body):** DeleteTagDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 태그 삭제
- **인증:** JWT 인증 필요 (ADMIN)

---

### 20. adminGetTagMapping

- **메소드명:** adminGetTagMapping
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/mapping/search`
- **요청 데이터 (Query):** SearchPstTagMpngDto의 모든 필드들을 Query 파라미터로
- **반환 타입:** ResponseDto<ListType<SelectPstTagMpngListItemType>>
- **설명:** 태그 매핑 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 21. adminGetTagMappingByTagNo

- **메소드명:** adminGetTagMappingByTagNo
- **요청 메소드:** GET
- **요청 주소:** `/admin/tags/mapping/:pstNo/:tagNo`
- **요청 데이터 (Param):** pstNo (number), tagNo (number)
- **반환 타입:** ResponseDto<SelectPstTagMpngType>
- **설명:** 태그 번호로 매핑 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 22. adminAddTagMapping

- **메소드명:** adminAddTagMapping
- **요청 메소드:** POST
- **요청 주소:** `/admin/tags/mapping`
- **요청 데이터 (Body):** CreatePstTagMpngDto
- **반환 타입:** ResponseDto<SelectPstTagMpngType>
- **설명:** 태그 매핑 추가
- **인증:** JWT 인증 필요 (ADMIN)

---

### 23. adminMultipleAddTagMapping

- **메소드명:** adminMultipleAddTagMapping
- **요청 메소드:** POST
- **요청 주소:** `/admin/tags/mapping/multiple`
- **요청 데이터 (Body):** CreatePstTagMpngDto[]
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 태그 매핑 추가
- **인증:** JWT 인증 필요 (ADMIN)

---

### 24. adminDeleteTagMapping

- **메소드명:** adminDeleteTagMapping
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/tags/mapping`
- **요청 데이터 (Body):** DeletePstTagMpngDto
- **반환 타입:** ResponseDto<boolean>
- **설명:** 태그 매핑 삭제
- **인증:** JWT 인증 필요 (ADMIN)

---

### 25. adminMultipleDeleteTagMapping

- **메소드명:** adminMultipleDeleteTagMapping
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/tags/mapping/multiple`
- **요청 데이터 (Body):** DeletePstTagMpngDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 태그 매핑 삭제
- **인증:** JWT 인증 필요 (ADMIN)
