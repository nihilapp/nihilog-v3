import { useMediaQuery } from 'react-responsive';

export function useResponsive() {
  /**
   * @description 모바일 소형 디바이스
   */
  const isMoSm = useMediaQuery({
    query: '(max-width: 480px)',
  });

  /**
   * @description 모바일 중형 디바이스
   */
  const isMoMd = useMediaQuery({
    query: '(max-width: 768px)',
  });

  /**
   * @description 모바일 대형 디바이스
   */
  const isMoLg = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return {
    isMoSm,
    isMoMd,
    isMoLg,
  };
}
