import {
  Body,
  Controller,
  Req,
  UseGuards
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import {
  CreateTagSubscribeDto,
  DeleteTagSubscribeDto,
  UpdateTagSubscribeDto
} from '@/dto/tag-subscribe.dto';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { TagSubscribeService } from '@/endpoints/subscribe/tag-subscribe/tag-subscribe.service';
import { createError, createResponse } from '@/utils';

@Controller('admin/subscribes/tags')
@UseGuards(AdminAuthGuard)
export class AdminTagSubscribeController {
  constructor(private readonly tagSubscribeService: TagSubscribeService) {}

  /**
   * @description 관리자 - 다수 태그 구독 일괄 생성
   * @param req 인증 요청 객체
   * @param createData 다수 태그 구독 생성 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleCreateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() createData: CreateTagSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.multipleCreateTagSubscribe(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_CREATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_CREATE_SUCCESS, result.data);
  }

  /**
   * @description 관리자 - 다수 태그 구독 일괄 수정
   * @param req 인증 요청 객체
   * @param updateData 다수 태그 구독 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleUpdateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateTagSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.multipleUpdateTagSubscribe(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_UPDATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_UPDATE_SUCCESS, result.data);
  }

  /**
   * @description 관리자 - 다수 태그 구독 일괄 삭제
   * @param req 인증 요청 객체
   * @param deleteData 다수 태그 구독 삭제 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteTagSubscribe(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteTagSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.multipleDeleteTagSubscribe(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_DELETE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.TAG.ADMIN_MULTIPLE_DELETE_SUCCESS, result.data);
  }
}
