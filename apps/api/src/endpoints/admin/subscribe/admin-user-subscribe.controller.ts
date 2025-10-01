import {
  Body,
  Controller,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, SearchSubscribeDto } from '@/dto';
import { DeleteMultipleUsersDto } from '@/dto';
import type { ListDto } from '@/dto/response.dto';
import { ResponseDto } from '@/dto/response.dto';
import {
  CreateSubscribeDto,
  UpdateSubscribeDto,
  UserSubscribeDto
} from '@/dto/subscribe.dto';
import { AdminSubscribeService } from '@/endpoints/admin/subscribe/admin-user-subscribe.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import { createResponse } from '@/utils';
import { createExampleSubscribe } from '@/utils/createExampleSubscribe';

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
            [ createExampleSubscribe('list'), ],
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
  async adminGetUserSubscribeList(@Body() searchData: SearchSubscribeDto & Partial<UserSubscribeDto>): Promise<ResponseDto<ListDto<UserSubscribeDto>>> {
    const result = await this.subscribeService.adminGetUserSubscribeList(searchData);

    return createResponse(
      'SUCCESS',
      'ADMIN_SUBSCRIBE_LIST_SUCCESS',
      result
    );
  }

  /**
   * @description 관리자가 특정 사용자 구독 설정 생성
   * @param req 인증 요청 객체
   * @param createData 구독 설정 생성 데이터
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
            createExampleSubscribe('detail'),
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
   * @param req 인증 요청 객체
   * @param updateData 구독 설정 수정 데이터
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
              updatedSubscribes: [ createExampleSubscribe('detail'), ],
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
   * @param req 인증 요청 객체
   * @param sbcrNo 구독 번호
   */
  @Endpoint({
    endpoint: '/:sbcrNo',
    method: 'DELETE',
    summary: '🗑️ 구독 설정 삭제',
    description: '특정 사용자의 구독 설정을 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'sbcrNo', '구독 번호', 'number', true, ],
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
    @Param('sbcrNo') sbcrNo: number
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return await this.subscribeService.adminDeleteUserSubscribe(req.user.userNo, sbcrNo);
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 삭제
   * @param req 인증 요청 객체
   * @param deleteData 삭제할 사용자 목록 데이터
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
