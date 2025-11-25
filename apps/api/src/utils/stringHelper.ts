// 문자열이 null/undefined 이거나 공백을 포함해 비어있을 때 true
export function isEmptyString(str: string | null | undefined): boolean {
  if (str == null) return true;
  if (typeof str !== 'string') return true;
  return str.trim() === '';
}

// 문자열이 비어있지 않을 때 true
export function isNonEmptyString(str: string | null | undefined): boolean {
  return !isEmptyString(str);
}

/**
 * 문자열 또는 숫자를 숫자로 변환
 * 쿼리 파라미터는 문자열로 전달될 수 있으므로 숫자로 변환 필요
 * @param value 변환할 값 (문자열 또는 숫자)
 * @returns 숫자로 변환된 값 (이미 숫자면 그대로 반환)
 */
export function toNumber(value: string | number | null | undefined): number | undefined {
  if (value == null) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = Number(value);
    return Number.isNaN(num)
      ? undefined
      : num;
  }
  return undefined;
}
