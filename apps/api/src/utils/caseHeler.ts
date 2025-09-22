export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function camelToUpperSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase();
}

// 파스칼/카멜을 대문자 스네이크로 바꾸되, 연속 대문자와 숫자 경계도 처리
export function toUpperSnakeCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1_$2')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();
}
