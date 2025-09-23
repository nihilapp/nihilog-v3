import { categoryInfo, commentInfo, postInfo, postTagMap, tagInfo, userInfo, userSubscribeInfo } from '@drizzle/tables';

export const schemas = {
  // 필요하면 @repo/drizzle 패키지에서 테이블을 정의하고 빌드 후 임포트
  userInfo,
  postInfo,
  categoryInfo,
  tagInfo,
  postTagMap,
  commentInfo,
  userSubscribeInfo,
};
