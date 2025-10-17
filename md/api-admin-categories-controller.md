# Admin Categories Controller API 문서

## 컨트롤러: AdminCategoriesController

**Base Path:** `/admin/categories`

---

## 카테고리 통계 관련 엔드포인트

### 1. adminGetAnalyzeCategoryData (통계)

- **메소드명:** adminGetAnalyzeCategoryData
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/overview`
- **요청 데이터 (Query):** AnalyzeStatDto, ctgryNo (선택적, number)
- **반환 타입:** ResponseDto<AnalyzeCategoryStatItemType[]>
- **설명:** 카테고리 분석 통계
- **인증:** JWT 인증 필요 (ADMIN)

---

### 2. adminGetTopPopularCategoriesByIndex (통계)

- **메소드명:** adminGetTopPopularCategoriesByIndex
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/popular-index`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TopPopularCategoryItemType[]>
- **설명:** 카테고리별 인기 지수 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 3. adminGetTopCategoriesBySubscriberCount (통계)

- **메소드명:** adminGetTopCategoriesBySubscriberCount
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/top-subscribers`
- **요청 데이터 (Query):** limit (number)
- **반환 타입:** ResponseDto<TopCategoriesBySubscriberItemType[]>
- **설명:** 구독자 많은 카테고리 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 4. adminGetAverageBookmarkCountPerCategory (통계)

- **메소드명:** adminGetAverageBookmarkCountPerCategory
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/average-bookmarks`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<AverageBookmarkPerCategoryItemType[]>
- **설명:** 평균 북마크 수 / 카테고리
- **인증:** JWT 인증 필요 (ADMIN)

---

### 5. adminGetAverageViewCountPerCategory (통계)

- **메소드명:** adminGetAverageViewCountPerCategory
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/average-views`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<AverageViewPerCategoryItemType[]>
- **설명:** 카테고리별 평균 조회수
- **인증:** JWT 인증 필요 (ADMIN)

---

### 6. adminGetCategoryHierarchyDistribution (통계)

- **메소드명:** adminGetCategoryHierarchyDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/hierarchy-distribution`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<CategoryHierarchyDistributionItemType[]>
- **설명:** 계층별 카테고리 분포
- **인증:** JWT 인증 필요 (ADMIN)

---

### 7. adminGetCategoryHierarchyPostDistribution (통계)

- **메소드명:** adminGetCategoryHierarchyPostDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/hierarchy-posts`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<CategoryHierarchyPostDistributionItemType[]>
- **설명:** 계층별 포스트 분포
- **인증:** JWT 인증 필요 (ADMIN)

---

### 8. adminGetCategoryHierarchySubscriberDistribution (통계)

- **메소드명:** adminGetCategoryHierarchySubscriberDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/hierarchy-subscribers`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<CategoryHierarchySubscriberDistributionItemType[]>
- **설명:** 계층별 구독자 분포
- **인증:** JWT 인증 필요 (ADMIN)

---

### 9. adminGetCategoryStatusDistribution (통계)

- **메소드명:** adminGetCategoryStatusDistribution
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/status-distribution`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<CategoryStatusDistributionItemType[]>
- **설명:** 카테고리 상태별 분포
- **인증:** JWT 인증 필요 (ADMIN)

---

### 10. adminGetCategoryCreatorStatistics (통계)

- **메소드명:** adminGetCategoryCreatorStatistics
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/creator-stats`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<CategoryCreatorStatItemType[]>
- **설명:** 카테고리 생성자별 통계
- **인증:** JWT 인증 필요 (ADMIN)

---

### 11. adminGetUnusedCategoriesList (통계)

- **메소드명:** adminGetUnusedCategoriesList
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/unused`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<UnusedCategoryItemType[]>
- **설명:** 미사용 카테고리 목록
- **인증:** JWT 인증 필요 (ADMIN)

---

### 12. adminGetCategorySubscriberGrowthRate (통계)

- **메소드명:** adminGetCategorySubscriberGrowthRate
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/subscriber-growth`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<CategorySubscriberGrowthRateItemType[]>
- **설명:** 카테고리별 구독자 성장률 (시계열)
- **인증:** JWT 인증 필요 (ADMIN)

---

### 13. adminGetCategoriesWithoutSubscribers (통계)

- **메소드명:** adminGetCategoriesWithoutSubscribers
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/analyze/no-subscribers`
- **요청 데이터 (Body):** 없음
- **반환 타입:** ResponseDto<CategoriesWithoutSubscribersItemType[]>
- **설명:** 구독자 없는 카테고리 목록
- **인증:** JWT 인증 필요 (ADMIN)

---

## 카테고리 CRUD 엔드포인트

### 14. adminGetCategoryList

- **메소드명:** adminGetCategoryList
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/search`
- **요청 데이터 (Query):** SearchCategoryDto의 모든 필드들을 Query 파라미터로
- **반환 타입:** ResponseDto<ListType<SelectCategoryListItemType>>
- **설명:** 카테고리 목록 조회

---

### 15. adminGetCategoryByCtgryNo

- **메소드명:** adminGetCategoryByCtgryNo
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/:ctgryNo`
- **요청 데이터 (Param):** ctgryNo (number)
- **반환 타입:** ResponseDto<SelectCategoryType>
- **설명:** 카테고리 번호로 카테고리 조회

---

### 16. adminGetCategoryByCtgryNm

- **메소드명:** adminGetCategoryByCtgryNm
- **요청 메소드:** GET
- **요청 주소:** `/admin/categories/name/:name`
- **요청 데이터 (Param):** name (string)
- **반환 타입:** ResponseDto<SelectCategoryType>
- **설명:** 카테고리명으로 카테고리 조회

---

### 17. adminCreateCategory

- **메소드명:** adminCreateCategory
- **요청 메소드:** POST
- **요청 주소:** `/admin/categories`
- **요청 데이터 (Body):** CreateCategoryDto
- **반환 타입:** ResponseDto<SelectCategoryType>
- **설명:** 카테고리 생성

---

### 18. adminMultipleCreateCategory

- **메소드명:** adminMultipleCreateCategory
- **요청 메소드:** POST
- **요청 주소:** `/admin/categories/multiple`
- **요청 데이터 (Body):** CreateCategoryDto[]
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 카테고리 생성

---

### 19. adminUpdateCategory

- **메소드명:** adminUpdateCategory
- **요청 메소드:** PATCH
- **요청 주소:** `/admin/categories/:ctgryNo`
- **요청 데이터 (Param):** ctgryNo (number)
- **요청 데이터 (Body):** UpdateCategoryDto
- **반환 타입:** ResponseDto<SelectCategoryType>
- **설명:** 카테고리 수정

---

### 20. adminMultipleUpdateCategory

- **메소드명:** adminMultipleUpdateCategory
- **요청 메소드:** PATCH
- **요청 주소:** `/admin/categories/multiple`
- **요청 데이터 (Body):** UpdateCategoryDto & { ctgryNoList: number[] }
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 카테고리 수정

---

### 21. adminDeleteCategory

- **메소드명:** adminDeleteCategory
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/categories/:ctgryNo`
- **요청 데이터 (Param):** ctgryNo (number)
- **반환 타입:** ResponseDto<boolean>
- **설명:** 카테고리 삭제

---

### 22. adminMultipleDeleteCategory

- **메소드명:** adminMultipleDeleteCategory
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/categories/multiple`
- **요청 데이터 (Body):** DeleteCategoryDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 다수 카테고리 삭제
