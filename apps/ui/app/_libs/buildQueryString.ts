/**
 * params 객체를 URLSearchParams로 변환하는 헬퍼 함수
 *
 * @param params - URL 쿼리 파라미터 객체
 * @returns 인코딩된 쿼리 스트링 (예: "key1=value1&key2=value2")
 */
export function buildQueryString(params: Record<string, string | number | boolean | null | undefined | (string | number)[]> = {}): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([
    key,
    value,
  ]) => {
    // null 또는 undefined 값은 제외
    if (value === null || value === undefined) {
      return;
    }

    // 배열인 경우 각 요소를 개별적으로 추가
    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(
          key,
          String(item)
        );
      });
    }
    else {
      // string, number, boolean을 string으로 변환하여 추가
      searchParams.append(
        key,
        String(value)
      );
    }
  });

  return searchParams.toString();
}
