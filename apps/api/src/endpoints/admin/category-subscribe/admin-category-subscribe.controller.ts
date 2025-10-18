import {
  Body,
  Controller,
  Req,
  UseGuards
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import {
  CreateCategorySubscribeDto,
  DeleteCategorySubscribeDto,
  UpdateCategorySubscribeDto
} from '@/dto/category-subscribe.dto';
import { ResponseDto } from '@/dto/response.dto';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { CategorySubscribeService } from '@/endpoints/subscribe/category-subscribe/category-subscribe.service';
import { createError, createResponse } from '@/utils';

@Controller('admin/subscribes/categories')
@UseGuards(AdminAuthGuard)
export class AdminCategorySubscribeController {
  constructor(private readonly categorySubscribeService: CategorySubscribeService) {}

  /**
   * @description 관리자 - 다수 카테고리 구독 일괄 생성
   * @param req 인증 요청 객체
   * @param createData 다수 카테고리 구독 생성 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleCreateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() createData: CreateCategorySubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.multipleCreateCategorySubscribe(
      req.user.userNo,
      createData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.ADMIN_MULTIPLE_CREATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.CATEGORY.ADMIN_MULTIPLE_CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 관리자 - 다수 카테고리 구독 일괄 수정
   * @param req 인증 요청 객체
   * @param updateData 다수 카테고리 구독 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleUpdateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateCategorySubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.multipleUpdateCategorySubscribe(
      req.user.userNo,
      updateData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.ADMIN_MULTIPLE_UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.CATEGORY.ADMIN_MULTIPLE_UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 관리자 - 다수 카테고리 구독 일괄 삭제
   * @param req 인증 요청 객체
   * @param deleteData 다수 카테고리 구독 삭제 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteCategorySubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.multipleDeleteCategorySubscribe(
      req.user.userNo,
      deleteData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.ADMIN_MULTIPLE_DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.CATEGORY.ADMIN_MULTIPLE_DELETE_SUCCESS,
      result.data
    );
  }
}
