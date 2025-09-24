import { ctgryInfo, cmntInfo, pstInfo, pstTagMpng, tagInfo, userInfo, userSbcrInfo, ctgrySbcrMpng, tagSbcrMpng } from '@drizzle/tables';

export const schemas = {
  // 필요하면 @repo/drizzle 패키지에서 테이블을 정의하고 빌드 후 임포트
  userInfo,
  pstInfo,
  ctgryInfo,
  tagInfo,
  pstTagMpng,
  cmntInfo,
  userSbcrInfo,
  ctgrySbcrMpng,
  tagSbcrMpng,
};
