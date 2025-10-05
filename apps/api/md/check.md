이 문서는 모든 컨트롤러를 탐색해서 Endpoint 데코레이터의 responses 를 점검하는 것이 목적입니다.

1. 리포지토리, 서비스, 컨트롤러의 실제 응답 처리를 탐색해서 리스팅합니다. 하나도 빠짐 없이 엔티티별로 리스팅해야 합니다.
2. responses 와 비교해서 Endpoint 데코레이터에만 있는 응답 예시를 추려냅니다.
3. 실제와 예시가 다른 경우에도 추려냅니다.
4. 여기서 말하는 응답 처리란, RepoResponseType 과 ResponseType 에 들어가는 error 유무, code 와 message, data 를 의미합니다.

현재 존재하는 컨트롤러는 12개입니다.

## 점검 결과 (2025 0921)

### 요약

- 총 12개 컨트롤러 점검 완료
- 대부분의 컨트롤러에서 실제 응답 처리와 Endpoint 데코레이터의 responses가 일치함
- 일부 컨트롤러에서 누락된 응답 케이스 발견

### 누락된 응답 케이스

#### 1. Admin Posts Controller

- `adminGetPostViewStats`: `BAD_REQUEST` (INVALID_REQUEST) 누락
- `adminGetPostShareStatsByPlatform`: `BAD_REQUEST` (INVALID_REQUEST) 누락
- `adminGetAllPostShareStatsByPlatform`: `BAD_REQUEST` (INVALID_REQUEST) 누락

#### 2. Admin Controller

- `updateProfile`: `UNAUTHORIZED` (UNAUTHORIZED) 누락

#### 3. Admin Subscribe Controller

- `adminGetUserSubscribeList`: `INTERNAL_SERVER_ERROR` (ADMIN_SUBSCRIBE_SEARCH_ERROR) 누락

### 정상적으로 문서화된 컨트롤러

- Users Controller ✅
- Tag Subscribe Controller ✅
- Category Subscribe Controller ✅
- Posts Controller ✅
- Auth Controller ✅
- Admin Tag Subscribe Controller ✅
- Admin Users Controller ✅
- Admin Category Subscribe Controller ✅
- **Tags Controller ✅** (2025 0921 추가)

### 권장사항

1. 누락된 응답 케이스들을 Endpoint 데코레이터에 추가
2. 실제 서비스 로직과 문서화된 응답이 일치하는지 정기적으로 점검
3. 새로운 에러 케이스 추가 시 문서화도 함께 업데이트
