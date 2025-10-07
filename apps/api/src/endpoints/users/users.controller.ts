import {
  Controller,
  Body,
  Req
} from '@nestjs/common';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto, AuthRequest } from '@/dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { UpdateSubscribeDto } from '@/dto/subscribe.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import type { SelectUserSbcrInfoType } from '@/endpoints/prisma/types/subscribe.types';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { UserService } from '@/endpoints/users/users.service';
import { createError, createResponse, removeSensitiveInfo } from '@/utils';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * @description 현재 로그인한 사용자의 프로필 정보를 조회합니다.
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/profile',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async getUserProfile(@Req() req: AuthRequest): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.userService.getUserProfile(req.user);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'USER_NOT_FOUND'
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);
    return createResponse('SUCCESS', 'PROFILE_GET_SUCCESS', userToReturn);
  }

  /**
   * @description 이메일 구독 설정 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/subscribe',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
    },
  })
  async getUserSubscribeByUserNo(@Req() req: AuthRequest): Promise<ResponseDto<SelectUserSbcrInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.userService.getUserSubscribeByUserNo(req.user);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'SUBSCRIBE_NOT_FOUND'
      );
    }

    return createResponse('SUCCESS', 'SUBSCRIBE_FETCH_SUCCESS', result.data);
  }

  /**
   * @description 새 사용자 계정 생성
   * @param createUserData 사용자 생성 정보
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      throttle: [ 3, 60000, ],
      serialize: true,
    },
  })
  async createUser(@Body() createUserData: CreateUserDto): Promise<ResponseDto<SelectUserInfoType>> {
    const result = await this.userService.createUser(createUserData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'CONFLICT',
        result?.error?.message || 'EMAIL_IN_USE'
      );
    }

    return createResponse('CREATED', 'USER_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 프로필 정보 수정
   * @param req 요청 객체
   * @param updateData 사용자 정보 수정 데이터
   */
  @Endpoint({
    endpoint: '/profile',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async updateUserProfile(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.userService.updateUserProfile(req.user, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'USER_NOT_FOUND'
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);
    return createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', userToReturn);
  }

  /**
   * @description 이메일 구독 설정 변경
   * @param req 요청 객체
   * @param updateData 구독 설정 수정 데이터
   */
  @Endpoint({
    endpoint: '/subscribe',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async updateUserSubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateSubscribeDto
  ): Promise<ResponseDto<SelectUserSbcrInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.userService.updateUserSubscribe(req.user, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'SUBSCRIBE_NOT_FOUND'
      );
    }

    return createResponse('SUCCESS', 'SUBSCRIBE_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 내 프로필 삭제
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/profile',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async deleteUserProfile(@Req() req: AuthRequest): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.userService.deleteUserProfile(req.user);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'USER_NOT_FOUND'
      );
    }

    return createResponse('SUCCESS', 'USER_DELETE_SUCCESS', result.data);
  }
}
