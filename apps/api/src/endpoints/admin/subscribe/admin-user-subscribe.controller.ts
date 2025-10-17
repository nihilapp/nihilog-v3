import {
  Body,
  Controller,
  Param,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { AuthRequest, DeleteSubscribeDto, SearchSubscribeDto } from '@/dto';
import { AnalyzeStatDto } from '@/dto/common.dto';
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
import type {
  AnalyzeSubscribeStatItemType,
  SubscribeNotificationDistributionItemType,
  TotalActiveNotificationUsersItemType,
  TotalInactiveNotificationUsersItemType
} from '@/endpoints/prisma/types/subscribe.types';
import { createError, createResponse } from '@/utils';

@Controller('admin/subscribes')
@UseGuards(AdminAuthGuard)
export class AdminSubscribeController {
  constructor(private readonly subscribeService: AdminSubscribeService) {}

  // ========================================================
  // 구독 설정 통계 관련 엔드포인트
  // ========================================================

  /**
   * @description 구독 설정 분석 통계
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/overview',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAnalyzeSubscribeData(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<AnalyzeSubscribeStatItemType[]>> {
    const result = await this.subscribeService.adminGetAnalyzeSubscribeData(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.ANALYZE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.ADMIN.ANALYZE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 알림 설정별 분포 통계
   */
  @Endpoint({
    endpoint: '/analyze/notification-distribution',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetSubscribeNotificationDistribution(): Promise<ResponseDto<SubscribeNotificationDistributionItemType[]>> {
    const result = await this.subscribeService.adminGetSubscribeNotificationDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 전체 알림 활성 사용자 수 통계
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/active-users',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTotalActiveNotificationUsers(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<TotalActiveNotificationUsersItemType[]>> {
    const result = await this.subscribeService.adminGetTotalActiveNotificationUsers(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 전체 알림 비활성 사용자 수 통계
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/inactive-users',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTotalInactiveNotificationUsers(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<TotalInactiveNotificationUsersItemType[]>> {
    const result = await this.subscribeService.adminGetTotalInactiveNotificationUsers(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  // ========================================================
  // 기존 구독 설정 관리 엔드포인트
  // ========================================================

  /**
   * @description 전체 사용자 구독 설정 목록 조회
   */
  @Endpoint({
    endpoint: '/search',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserSubscribeList(@Query() searchData: SearchSubscribeDto): Promise<ResponseDto<ListDto<UserSubscribeDto>>> {
    const result = await this.subscribeService.adminGetUserSubscribeList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.ADMIN.SEARCH_SUCCESS,
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
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.SEARCH_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.SEARCH_SUCCESS, result.data);
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
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.CREATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.CREATE_SUCCESS, result.data);
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
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.MULTIPLE_UPDATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.MULTIPLE_UPDATE_SUCCESS, result.data);
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
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.DELETE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.DELETE_SUCCESS, result.data);
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
        result?.error?.message || MESSAGE.SUBSCRIBE.ADMIN.MULTIPLE_DELETE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.ADMIN.MULTIPLE_DELETE_SUCCESS, result.data);
  }
}
