import type { ResponseDto } from '@/dto/response.dto';
import type { ListType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserInfoListItemType, SelectUserInfoType } from '@/endpoints/prisma/types/user.types';

/**
 * 단일 사용자 객체에서 민감정보 제거
 */
export const removeSensitiveInfo = <T extends SelectUserInfoType | null>(user: T): T => {
  if (!user) return user;
  const cleanUser = {
    ...(user as SelectUserInfoType),
    encptPswd: null,
    reshToken: null,
  } as unknown as T;
  return cleanUser;
};

/**
 * 사용자 리스트에서 민감정보 제거
 */
export const removeSensitiveInfoFromList = (users: ListType<SelectUserInfoListItemType>): ListType<SelectUserInfoListItemType> => {
  const sanitizedList = users.list.map((user) => ({
    ...user,
    encptPswd: null,
    reshToken: null,
  })) as unknown as SelectUserInfoListItemType[];

  return {
    totalCnt: users.totalCnt,
    list: sanitizedList,
  };
};

/**
 * ResponseDto<SelectUserInfoType>에서 민감정보 제거
 */
export const removeSensitiveInfoFromResponse = (response: ResponseDto<SelectUserInfoType>): ResponseDto<SelectUserInfoType> => {
  if (response.data) {
    response.data = removeSensitiveInfo(response.data);
  }
  return response;
};

/**
 * ResponseDto<ListType<SelectUserInfoListItemType>>에서 민감정보 제거
 */
export const removeSensitiveInfoFromListResponse = (response: ResponseDto<ListType<SelectUserInfoListItemType>>): ResponseDto<ListType<SelectUserInfoListItemType>> => {
  if (response.data?.list) {
    response.data = removeSensitiveInfoFromList(response.data);
  }
  return response;
};
