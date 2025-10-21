/**
 * @description JWT expiresIn 형식의 문자열을 밀리초로 변환
 * @param expiresIn '1h', '60m', '30d', '3600s' 등의 형식
 * @returns 밀리초 단위 숫자
 */
export function parseExpiresInToMs(expiresIn: string): number {
  const match = expiresIn.match(/^(\d+)([smhd])$/);

  if (!match) {
    // 숫자만 있는 경우 밀리초로 간주
    const num = parseInt(
      expiresIn,
      10
    );
    return isNaN(num)
      ? 0
      : num;
  }

  const [
    ,
    value,
    unit,
  ] = match;
  const num = parseInt(
    value,
    10
  );

  switch (unit) {
    case 's': // 초
      return num * 1000;
    case 'm': // 분
      return num * 60 * 1000;
    case 'h': // 시간
      return num * 60 * 60 * 1000;
    case 'd': // 일
      return num * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
}
