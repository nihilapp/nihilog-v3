import {
  Body,
  Controller,
  Req,
  UseGuards,
  Param
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { AuthRequest, UpdateUserDto } from '@/dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { ResponseDto } from '@/dto/response.dto';
import { SearchUserDto, DeleteMultipleUsersDto } from '@/dto/user.dto';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserInfoListItemType, SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { createError, createResponse, removeSensitiveInfoFromListResponse, removeSensitiveInfo } from '@/utils';

import { AdminUserService } from './admin-users.service';

@Controller('admin/users')
@UseGuards(AdminAuthGuard)
export class AdminUserController {
  constructor(private readonly usersService: AdminUserService) { }

  /**
   * @description 사용자 목록 검색
   * @param req 요청 객체
   * @param body 검색 조건
   */
  @Endpoint({
    endpoint: '/search',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserList(
    @Req() req: AuthRequest,
    @Body() body: SearchUserDto
  ): Promise<ResponseDto<ListType<SelectUserInfoListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserList(body);

    if (!result?.success) {
      return createError(result?.error?.code || 'INTERNAL_SERVER_ERROR', result?.error?.message || MESSAGE.USER.USER.SEARCH_ERROR);
    }

    return removeSensitiveInfoFromListResponse(createResponse('SUCCESS', MESSAGE.USER.USER.SEARCH_SUCCESS, result.data));
  }

  /**
   * @description 사용자 번호로 조회
   * @param req 요청 객체
   * @param userNo 사용자 번호
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserByUserNo(
    @Req() req: AuthRequest,
    @Param('userNo') userNo: number
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByNo(userNo);

    if (!result?.success) {
      return createError(result?.error?.code || 'NOT_FOUND', result?.error?.message || MESSAGE.USER.USER.NOT_FOUND);
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse('SUCCESS', MESSAGE.USER.USER.FETCH_SUCCESS, userToReturn);
  }

  /**
   * @description 사용자명으로 조회
   * @param req 요청 객체
   * @param name 사용자명
   */
  @Endpoint({
    endpoint: '/name/:name',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserByUserNm(
    @Req() req: AuthRequest,
    @Param('name') name: string
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByNm(name);

    if (!result?.success) {
      return createError(result?.error?.code || 'NOT_FOUND', result?.error?.message || MESSAGE.USER.USER.NOT_FOUND);
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse('SUCCESS', MESSAGE.USER.USER.FETCH_SUCCESS, userToReturn);
  }

  /**
   * @description 이메일로 사용자 조회
   * @param req 요청 객체
   * @param email 이메일 주소
   */
  @Endpoint({
    endpoint: '/email/:email',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserByEmlAddr(
    @Req() req: AuthRequest,
    @Param('email') email: string
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByEmail(email);

    if (!result?.success) {
      return createError(result?.error?.code || 'NOT_FOUND', result?.error?.message || MESSAGE.USER.USER.NOT_FOUND);
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse('SUCCESS', MESSAGE.USER.USER.FETCH_SUCCESS, userToReturn);
  }

  /**
   * @description 새 사용자 생성
   * @param req 요청 객체
   * @param createUserData 사용자 생성 정보
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminCreateUser(
    @Req() req: AuthRequest,
    @Body() createUserData: CreateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.createUser(req.user, createUserData);

    if (!result?.success) {
      return createError(result?.error?.code || 'INTERNAL_SERVER_ERROR', result?.error?.message || MESSAGE.USER.USER.CREATE_ERROR);
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse('CREATED', MESSAGE.USER.USER.CREATE_SUCCESS, userToReturn);
  }

  /**
   * @description 사용자 정보 수정
   * @param req 요청 객체
   * @param userNo 사용자 번호
   * @param updateUserData 사용자 수정 정보
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminUpdateUser(
    @Req() req: AuthRequest,
    @Param('userNo') userNo: number,
    @Body() updateUserData: UpdateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.updateUser(req.user.userNo, userNo, updateUserData);

    if (!result?.success) {
      return createError(result?.error?.code || 'INTERNAL_SERVER_ERROR', result?.error?.message || MESSAGE.USER.USER.UPDATE_ERROR);
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse('SUCCESS', MESSAGE.USER.USER.UPDATE_SUCCESS, userToReturn);
  }

  // TODO: 여기서부터 다시 진행할 것

  /**
   * @description 다수 사용자 일괄 수정
   * @param req 요청 객체
   * @param adminMultipleUpdateUser 사용자 수정 정보 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleUpdateUser(
    @Req() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.multipleUpdateUser(req.user.userNo, updateUserDto);

    if (!result?.success) {
      return createError(result?.error?.code || 'INTERNAL_SERVER_ERROR', result?.error?.message || MESSAGE.USER.USER.UPDATE_ERROR);
    }

    return createResponse('SUCCESS', MESSAGE.USER.USER.UPDATE_SUCCESS, result.data);
  }

  /**
   * @description 사용자 삭제
   * @param req 요청 객체
   * @param userNo 사용자 번호
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminDeleteUser(
    @Req() req: AuthRequest,
    @Param('userNo') userNo: number
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.adminDeleteUser(
      req.user.userNo,
      userNo
    );

    if (!result?.success) {
      return createError(result?.error?.code || 'INTERNAL_SERVER_ERROR', result?.error?.message || MESSAGE.USER.USER.DELETE_ERROR);
    }

    return createResponse('SUCCESS', MESSAGE.USER.USER.DELETE_SUCCESS, result.data);
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param req 요청 객체
   * @param body 삭제할 사용자 번호 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteUser(
    @Req() req: AuthRequest,
    @Body() body: DeleteMultipleUsersDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.adminMultipleDeleteUser(req.user.userNo, body.userNoList);

    if (!result?.success) {
      return createError(result?.error?.code || 'INTERNAL_SERVER_ERROR', result?.error?.message || MESSAGE.USER.USER.DELETE_ERROR);
    }

    return createResponse('SUCCESS', MESSAGE.USER.USER.DELETE_SUCCESS, result.data);
  }
}
