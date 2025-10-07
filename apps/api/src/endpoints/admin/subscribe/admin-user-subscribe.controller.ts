import {
  Body,
  Controller,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { AuthRequest, DeleteSubscribeDto, SearchSubscribeDto } from '@/dto';
import type { ListDto } from '@/dto/response.dto';
import { ResponseDto } from '@/dto/response.dto';
import {
  CreateSubscribeDto,
  UpdateSubscribeDto,
  UserSubscribeDto
} from '@/dto/subscribe.dto';
import { AdminSubscribeService } from '@/endpoints/admin/subscribe/admin-user-subscribe.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

@Controller('admin/subscribes')
@UseGuards(AdminAuthGuard)
export class AdminSubscribeController {
  constructor(private readonly subscribeService: AdminSubscribeService) {}

  /**
   * @description 전체 사용자 구독 설정 목록 조회
   */
  @Endpoint({
    endpoint: '/search',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserSubscribeList(@Body() searchData: SearchSubscribeDto): Promise<ResponseDto<ListDto<UserSubscribeDto>>> {
    const result = await this.subscribeService.adminGetUserSubscribeList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_SUBSCRIBE_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_SUBSCRIBE_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 특정 사용자 구독 설정 조회
   * @param req 인증 요청 객체
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
  async getUserSubscribeByUserNo(
    @Req() req: AuthRequest,
    @Param('userNo') userNo: number
  ): Promise<ResponseDto<UserSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.subscribeService.getUserSubscribeByUserNo(userNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_SUBSCRIBE_SEARCH_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_SEARCH_SUCCESS', result.data);
  }

  /**
   * @description 관리자가 특정 사용자 구독 설정 생성
   * @param req 인증 요청 객체
   * @param createData 구독 설정 생성 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminCreateUserSubscribe(
    @Req() req: AuthRequest,
    @Body() createData: CreateSubscribeDto
  ): Promise<ResponseDto<UserSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.subscribeService.adminCreateUserSubscribe(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_SUBSCRIBE_CREATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 변경
   * @param req 인증 요청 객체
   * @param updateData 구독 설정 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleUpdateUserSubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateSubscribeDto
  ): Promise<ResponseDto<any>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.subscribeService.adminMultipleUpdateUserSubscribe(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_SUBSCRIBE_MULTIPLE_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 특정 사용자 구독 설정 삭제
   * @param req 인증 요청 객체
   * @param sbcrNo 구독 번호
   */
  @Endpoint({
    endpoint: '/:sbcrNo',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminDeleteUserSubscribe(
    @Req() req: AuthRequest,
    @Param('sbcrNo') sbcrNo: number
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.subscribeService.adminDeleteUserSubscribe(req.user.userNo, sbcrNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_SUBSCRIBE_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_DELETE_SUCCESS', result.data);
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 삭제
   * @param req 인증 요청 객체
   * @param deleteData 삭제할 사용자 목록 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteUserSubscribe(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.subscribeService.adminMultipleDeleteUserSubscribe(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_SUBSCRIBE_MULTIPLE_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', result.data);
  }
}
