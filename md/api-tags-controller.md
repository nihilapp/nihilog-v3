# Tags Controller API 문서

## 컨트롤러: TagController

**Base Path:** `/tags`

---

### 1. getTagList

- **메소드명:** getTagList
- **요청 메소드:** POST
- **요청 주소:** `/tags/search`
- **요청 데이터 (Body):** SearchTagDto
- **반환 타입:** ResponseDto<ListType<SelectTagInfoListItemType>>
- **설명:** 태그 목록 조회

---

### 2. getTagByTagNo

- **메소드명:** getTagByTagNo
- **요청 메소드:** GET
- **요청 주소:** `/tags/:tagNo`
- **요청 데이터 (Param):** tagNo (number)
- **반환 타입:** ResponseDto<SelectTagInfoType>
- **설명:** 태그 번호로 태그 조회

---

### 3. getTagByTagNm

- **메소드명:** getTagByTagNm
- **요청 메소드:** GET
- **요청 주소:** `/tags/name/:name`
- **요청 데이터 (Param):** name (string)
- **반환 타입:** ResponseDto<SelectTagInfoType>
- **설명:** 태그명으로 태그 조회
