# Categories Controller API 문서

## 컨트롤러: CategoriesController

**Base Path:** `/categories`

---

### 1. getCategoryList

- **메소드명:** getCategoryList
- **요청 메소드:** POST
- **요청 주소:** `/categories/search`
- **요청 데이터 (Body):** SearchCategoryDto
- **반환 타입:** ResponseDto<ListType<SelectCategoryListItemType>>
- **설명:** 카테고리 목록 조회

---

### 2. getCategoryByCtgryNo

- **메소드명:** getCategoryByCtgryNo
- **요청 메소드:** GET
- **요청 주소:** `/categories/:ctgryNo`
- **요청 데이터 (Param):** ctgryNo (number)
- **반환 타입:** ResponseDto<SelectCategoryType>
- **설명:** 카테고리 번호로 카테고리 조회

---

### 3. getCategoryByCtgryNm

- **메소드명:** getCategoryByCtgryNm
- **요청 메소드:** GET
- **요청 주소:** `/categories/name/:name`
- **요청 데이터 (Param):** name (string)
- **반환 타입:** ResponseDto<SelectCategoryType>
- **설명:** 카테고리명으로 카테고리 조회
