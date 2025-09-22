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
