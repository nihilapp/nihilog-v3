import cloneDeep from 'lodash/cloneDeep';

import type { ResponseDto, ListDto } from '@/dto/response.dto';
import type { UserInfoDto } from '@/dto/user.dto';

/**
 * 단일 사용자 객체에서 민감정보 제거
 */
export const removeSensitiveInfo = <T extends UserInfoDto | null>(user: T): T => {
  if (!user) return user;
  const cleanUser = cloneDeep(user);
  cleanUser.encptPswd = null;
  cleanUser.reshToken = null;
  return cleanUser;
};

/**
 * 사용자 배열에서 민감정보 제거
 */
export const removeSensitiveInfoFromList = (users: UserInfoDto[]): UserInfoDto[] => {
  return users.map((user) => removeSensitiveInfo(user));
};

/**
 * ResponseDto<UserInfoDto>에서 민감정보 제거
 */
export const removeSensitiveInfoFromResponse = (response: ResponseDto<UserInfoDto>): ResponseDto<UserInfoDto> => {
  if (response.data) {
    response.data = removeSensitiveInfo(response.data);
  }
  return response;
};

/**
 * ResponseDto<ListDto<UserInfoDto>>에서 민감정보 제거
 */
export const removeSensitiveInfoFromListResponse = (response: ResponseDto<ListDto<UserInfoDto>>): ResponseDto<ListDto<UserInfoDto>> => {
  if (response.data?.list) {
    response.data.list = removeSensitiveInfoFromList(response.data.list);
  }
  return response;
};
