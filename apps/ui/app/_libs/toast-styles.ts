type ToastType = 'success' | 'error';

interface ToastStyle {
  background: string;
  color: string;
  border: string;
}

/**
 * 토스트 타입에 따른 스타일 객체를 반환하는 함수
 *
 * @param type - 토스트 타입 ('success' | 'error')
 * @returns 토스트 스타일 객체
 *
 * @example
 * ```typescript
 * toast.success('성공 메시지', {
 *   style: getToastStyle('success')
 * });
 *
 * toast.error('에러 메시지', {
 *   style: getToastStyle('error')
 * });
 * ```
 */
export function getToastStyle(type: ToastType): ToastStyle {
  switch (type) {
  case 'success':
    return {
      background: 'var(--color-blue-50)',
      color: 'var(--color-blue-500)',
      border: '1px solid var(--color-blue-500)',
    };
  case 'error':
    return {
      background: 'var(--color-red-50)',
      color: 'var(--color-red-500)',
      border: '1px solid var(--color-red-500)',
    };
  default:
    return {
      background: 'var(--popover)',
      color: 'var(--popover-foreground)',
      border: 'var(--border)',
    };
  }
}
