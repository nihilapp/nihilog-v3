import {
  Controller,
  Body,
  Req
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto, AuthRequest } from '@/dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { UserSubscribeDto, UpdateSubscribeDto } from '@/dto/subscribe.dto';
import { UserInfoDto, UpdateUserDto } from '@/dto/user.dto';
import { UserService } from '@/endpoints/users/users.service';
import { removeSensitiveInfoFromResponse } from '@/utils';
import { createExampleSubscribe } from '@/utils/createExampleSubscribe';
import { createExampleUser } from '@/utils/createExampleUser';

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

    const result = await this.userService.getUserProfile(req.user);
    return removeSensitiveInfoFromResponse(result);
  }

  /**
   * @description 이메일 구독 설정 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/subscribe',
    method: 'GET',
    summary: '📧 이메일 구독 설정 조회',
    description: '현재 로그인한 사용자의 이메일 알림 및 구독 설정을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      responses: [
        [
          '구독 설정 조회 성공',
          [ false, 'SUCCESS', 'SUBSCRIBE_FETCH_SUCCESS', createExampleSubscribe(), ],
        ],
        [
          '구독 설정 조회 실패',
          [ true, 'NOT_FOUND', 'SUBSCRIBE_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async getUserSubscribeByUserNo(@Req() req: AuthRequest): Promise<ResponseDto<UserSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.getUserSubscribeByUserNo(req.user);
  }

  /**
   * @description 새 사용자 계정 생성
   * @param createUserData 사용자 생성 정보
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    summary: '👤 사용자 계정 생성',
    description: '새로운 사용자 계정을 생성합니다.',
    options: {
      throttle: [ 3, 60000, ],
      roles: [ 'USER', 'ADMIN', ],
      body: [ '사용자 생성 DTO', CreateUserDto, ],
      serialize: true,
      responses: [
        [
          '사용자 생성 성공',
          [ false, 'CREATED', 'USER_CREATE_SUCCESS', createExampleUser(), ],
        ],
        [
          '이메일 중복',
          [ true, 'CONFLICT', 'EMAIL_IN_USE', null, ],
        ],
      ],
    },
  })
  async createUser(@Body() createUserData: CreateUserDto): Promise<ResponseDto<UserInfoDto>> {
    return this.userService.createUser(createUserData);
  }

  /**
   * @description 프로필 정보 수정
   * @param req 요청 객체
   * @param updateData 사용자 정보 수정 데이터
   */
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

    const result = await this.userService.updateUserProfile(req.user, updateData);
    return removeSensitiveInfoFromResponse(result);
  }

  /**
   * @description 이메일 구독 설정 변경
   * @param req 요청 객체
   * @param updateData 구독 설정 수정 데이터
   */
  @Endpoint({
    endpoint: '/subscribe',
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
          [ false, 'SUCCESS', 'SUBSCRIBE_UPDATE_SUCCESS', createExampleSubscribe(), ],
        ],
        [
          '구독 설정을 찾을 수 없음',
          [ true, 'NOT_FOUND', 'SUBSCRIBE_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async updateUserSubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateSubscribeDto
  ): Promise<ResponseDto<UserSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.updateUserSubscribe(req.user, updateData);
  }

  /**
   * @description 내 프로필 삭제
   * @param req 요청 객체
   */
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
