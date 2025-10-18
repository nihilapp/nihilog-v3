```ts
export async function useGetUsers() {
  const { response, loading, done, ...other } = useGet({
    url: [], // 세그먼트 단위로 요청 주소 입력.
    // key 쿼리키의 경우에는 url 이 자동으로 쿼리키로 취급됨. 따라서 별도로 입력할 필요 없음.
    params: {}, // 쿼리 스트링 값들을 여기에 넣음.
    body: {}, // 요청 데이터가 있을 경우 여기에 넣음.
    options: {
      ttl: 60, // 분 단위의 캐시 유지 시간.
      enabled: true, // 요청 여부를 결정하는 옵션. true 일 경우 요청 실행, false 일 경우 요청 실행하지 않음.
      callback(res) {
        // res = 요청 성공시 얻는 응답 객체
      },
      errorCallback(err) {
        // err = 요청 실패시 얻는 에러 객체
      },
    }, // useQuery 옵션들을 여기에 넣음.
  });

  // response = 요청 성공시 얻는 응답 객체
  // loading = 요청 중일 때 true, 아닐 때 false
  // done = 요청 완료시 true, 아닐 때 false
  // other = useGet(useQuery) 훅의 나머지 옵션들

  return {
    response,
    loading,
    done,
    ...other,
  };
}
```
