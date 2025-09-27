import {
  Controller,
  Body,
  Req
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto, AuthRequest } from '@/dto';
import { UserSubscribeDto, UpdateSubscribeDto } from '@/dto/subscribe.dto';
import { UserInfoDto, UpdateUserDto } from '@/dto/user.dto';
import { createExampleSubscription } from '@/utils/createExampleSubscription';
import { createExampleUser } from '@/utils/createExampleUser';
import type { UserService } from '@users/users.service';

@ApiTags('users')
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
    summary: '👤 내 프로필 조회',
    description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '프로필 조회 성공',
          [ false, 'SUCCESS', 'PROFILE_GET_SUCCESS', createExampleUser(), ],
        ],
        [
          '프로필 조회 실패',
          [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async getUserProfile(@Req() req: AuthRequest): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.getUserProfile(req.user);
  }

  @Endpoint({
    endpoint: '/subscription',
    method: 'GET',
    summary: '📧 이메일 구독 설정 조회',
    description: '현재 로그인한 사용자의 이메일 알림 및 구독 설정을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      responses: [
        [
          '구독 설정 조회 성공',
          [ false, 'SUCCESS', 'SUBSCRIBE_FETCH_SUCCESS', createExampleSubscription(), ],
        ],
        [
          '구독 설정 조회 실패',
          [ true, 'NOT_FOUND', 'SUBSCRIBE_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async getUserSubscriptionByUserNo(@Req() req: AuthRequest): Promise<ResponseDto<UserSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.getUserSubscribeByUserNo(req.user);
  }

  @Endpoint({
    endpoint: '/profile',
    method: 'PUT',
    summary: '✏️ 내 프로필 수정',
    description: '현재 로그인한 사용자의 프로필 정보를 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '프로필 수정 성공',
          [ false, 'SUCCESS', 'USER_UPDATE_SUCCESS', createExampleUser(), ],
        ],
        [
          '프로필 수정 실패',
          [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async updateUserProfile(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateUserDto
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.updateUserProfile(req.user, updateData);
  }

  @Endpoint({
    endpoint: '/subscription',
    method: 'PUT',
    summary: '⚙️ 이메일 구독 설정 변경',
    description: '현재 로그인한 사용자의 이메일 알림 및 구독 설정을 변경합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '구독 설정 수정 DTO', UpdateSubscribeDto, ],
      responses: [
        [
          '구독 설정 변경 성공',
          [ false, 'SUCCESS', 'SUBSCRIBE_UPDATE_SUCCESS', createExampleSubscription(), ],
        ],
        [
          '구독 설정을 찾을 수 없음',
          [ true, 'NOT_FOUND', 'SUBSCRIBE_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async updateUserSubscription(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateSubscribeDto
  ): Promise<ResponseDto<UserSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.updateUserSubscribe(req.user, updateData);
  }

  @Endpoint({
    endpoint: '/profile',
    method: 'DELETE',
    summary: '🗑️ 내 프로필 삭제',
    description: '현재 로그인한 사용자의 프로필 정보를 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '프로필 삭제 성공',
          [ false, 'SUCCESS', 'USER_DELETE_SUCCESS', null, ],
        ],
        [
          '프로필 삭제 실패',
          [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async deleteUserProfile(@Req() req: AuthRequest): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.deleteUserProfile(req.user);
  }
}
