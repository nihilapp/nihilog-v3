import {
  Body,
  Controller,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import { DeleteMultipleUsersDto } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import {
  CreateSubscribeDto,
  UpdateSubscribeDto,
  UserSubscribeDto
} from '@/dto/subscribe.dto';
import { AdminSubscribeService } from '@/endpoints/admin/subscribe/admin-subscribe.service';
import { createResponse } from '@/utils';
import { createExampleSubscribe } from '@/utils/createExampleSubscribe';
import { AdminAuthGuard } from '@auth/admin-auth.guard';

@ApiTags('admin/subscribe')
@Controller('admin/subscribes')
@UseGuards(AdminAuthGuard)
export class AdminSubscribeController {
  constructor(private readonly subscribeService: AdminSubscribeService) {}

  /**
   * @description 전체 사용자 구독 설정 목록 조회
   */
  @Endpoint({
    endpoint: '',
    method: 'GET',
    summary: '📋 구독 설정 목록 조회',
    description: '전체 사용자의 구독 설정 목록을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      responses: [
        [
          '구독 설정 목록 조회 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_SUBSCRIBE_LIST_SUCCESS',
            [ createExampleSubscribe(), ],
          ],
        ],
        [
          '관리자 권한 없음',
          [
            true,
            'FORBIDDEN',
            'ADMIN_UNAUTHORIZED',
            null,
          ],
        ],
      ],
    },
  })
  async adminGetUserSubscribeList(): Promise<ResponseDto<UserSubscribeDto[]>> {
    const result = await this.subscribeService.adminGetUserSubscribeList();

    return createResponse(
      'SUCCESS',
      'ADMIN_SUBSCRIBE_LIST_SUCCESS',
      result
    );
  }

  /**
   * @description 관리자가 특정 사용자 구독 설정 생성
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    summary: '✏️ 구독 설정 생성',
    description: '관리자가 특정 사용자의 구독 설정을 생성합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '구독 설정 생성 정보', CreateSubscribeDto, ],
      responses: [
        [
          '구독 설정 생성 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_SUBSCRIBE_CREATE_SUCCESS',
            createExampleSubscribe(),
          ],
        ],
        [
          '사용자를 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'USER_NOT_FOUND',
            null,
          ],
        ],
        [
          '이미 구독 설정이 존재함',
          [
            true,
            'CONFLICT',
            'ADMIN_SUBSCRIBE_ALREADY_EXISTS',
            null,
          ],
        ],
        [
          '관리자 권한 없음',
          [
            true,
            'FORBIDDEN',
            'ADMIN_UNAUTHORIZED',
            null,
          ],
        ],
      ],
    },
  })
  async adminCreateUserSubscribe(
    @Req() req: AuthRequest,
    @Body() createData: CreateSubscribeDto
  ): Promise<ResponseDto<UserSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return await this.subscribeService.adminCreateUserSubscribe(req.user.userNo, createData);
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 변경
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    summary: '🔄 구독 설정 일괄 변경',
    description: '다수 사용자의 구독 설정을 일괄 변경합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '구독 설정 일괄 변경 정보', UpdateSubscribeDto, ],
      responses: [
        [
          '구독 설정 일괄 변경 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS',
            {
              successCount: 3,
              failureCount: 1,
              updatedSubscribes: [ createExampleSubscribe(), ],
            },
          ],
        ],
        [
          '유효하지 않은 사용자 목록',
          [
            true,
            'BAD_REQUEST',
            'ADMIN_SUBSCRIBE_INVALID_USER_LIST',
            null,
          ],
        ],
        [
          '구독 설정을 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'SUBSCRIBE_NOT_FOUND',
            null,
          ],
        ],
        [
          '관리자 권한 없음',
          [
            true,
            'FORBIDDEN',
            'ADMIN_UNAUTHORIZED',
            null,
          ],
        ],
      ],
    },
  })
  async adminMultipleUpdateUserSubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateSubscribeDto
  ): Promise<ResponseDto<any>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return await this.subscribeService.adminMultipleUpdateUserSubscribe(req.user.userNo, updateData);
  }

  /**
   * @description 특정 사용자 구독 설정 삭제
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'DELETE',
    summary: '🗑️ 구독 설정 삭제',
    description: '특정 사용자의 구독 설정을 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'userNo', '사용자 번호', 'number', true, ],
      ],
      responses: [
        [
          '구독 설정 삭제 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_SUBSCRIBE_DELETE_SUCCESS',
            null,
          ],
        ],
        [
          '구독 설정을 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'SUBSCRIBE_NOT_FOUND',
            null,
          ],
        ],
        [
          '관리자 권한 없음',
          [
            true,
            'FORBIDDEN',
            'ADMIN_UNAUTHORIZED',
            null,
          ],
        ],
        [
          '이미 삭제된 구독 설정',
          [
            true,
            'CONFLICT',
            'ADMIN_SUBSCRIBE_ALREADY_DELETED',
            null,
          ],
        ],
      ],
    },
  })
  async adminDeleteUserSubscribe(
    @Req() req: AuthRequest,
    @Param('userNo') userNo: number
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return await this.subscribeService.adminDeleteUserSubscribe(req.user.userNo, userNo);
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 삭제
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    summary: '🗑️ 구독 설정 일괄 삭제',
    description: '다수 사용자의 구독 설정을 일괄 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '구독 설정 일괄 삭제 정보', DeleteMultipleUsersDto, ],
      responses: [
        [
          '구독 설정 일괄 삭제 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS',
            null,
          ],
        ],
        [
          '유효하지 않은 사용자 목록',
          [
            true,
            'BAD_REQUEST',
            'ADMIN_SUBSCRIBE_INVALID_USER_LIST',
            null,
          ],
        ],
        [
          '구독 설정을 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'SUBSCRIBE_NOT_FOUND',
            null,
          ],
        ],
        [
          '관리자 권한 없음',
          [
            true,
            'FORBIDDEN',
            'ADMIN_UNAUTHORIZED',
            null,
          ],
        ],
      ],
    },
  })
  async adminMultipleDeleteUserSubscribe(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteMultipleUsersDto
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return await this.subscribeService.adminMultipleDeleteUserSubscribe(req.user.userNo, deleteData);
  }
}
