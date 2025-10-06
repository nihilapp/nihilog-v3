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
import { ResponseDto, ListDto } from '@/dto/response.dto';
import {
  TagSubscribeDto,
  CreateTagSubscribeDto,
  DeleteTagSubscribeDto,
  SearchTagSubscribeDto,
  UpdateTagSubscribeDto
} from '@/dto/tag-subscribe.dto';
import { AdminTagSubscribeService } from '@/endpoints/admin/tag-subscribe/admin-tag-subscribe.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

@ApiTags('admin/tag-subscribe')
@Controller('admin/subscribes/tags')
@UseGuards(AdminAuthGuard)
export class AdminTagSubscribeController {
  constructor(private readonly tagSubscribeService: AdminTagSubscribeService) {}

  /**
   * @description 태그 구독 전체 목록 조회
   * @param req 인증 요청 객체
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '/search',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagSubscribeList(
    @Req() req: AuthRequest,
    @Body() searchData: SearchTagSubscribeDto
  ): Promise<ResponseDto<ListDto<TagSubscribeDto>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.adminGetTagSubscribeList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'TAG_SUBSCRIBE_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_SUBSCRIBE_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그별 구독자 조회
   * @param req 인증 요청 객체
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagSubscribeByTagNo(
    @Req() req: AuthRequest,
    @Param('tagNo') tagNo: number,
    @Body() searchData: SearchTagSubscribeDto
  ): Promise<ResponseDto<ListDto<TagSubscribeDto>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.adminGetTagSubscribeByTagNo(tagNo, searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'TAG_SUBSCRIBE_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_SUBSCRIBE_BY_TAG_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그 구독 생성
   * @param req 인증 요청 객체
   * @param createData 태그 구독 생성 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminCreateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() createData: CreateTagSubscribeDto
  ): Promise<ResponseDto<TagSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.adminCreateTagSubscribe(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_SUBSCRIBE_CREATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 다수 태그 구독 생성
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

    const result = await this.tagSubscribeService.adminMultipleCreateTagSubscribe(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_CREATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 태그 구독 수정
   * @param req 인증 요청 객체
   * @param tagSbcrNo 태그 구독 번호
   * @param updateData 태그 구독 수정 데이터
   */
  @Endpoint({
    endpoint: '/:tagSbcrNo',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminUpdateTagSubscribe(
    @Req() req: AuthRequest,
    @Param('tagSbcrNo') tagSbcrNo: number,
    @Body() updateData: UpdateTagSubscribeDto
  ): Promise<ResponseDto<TagSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.adminUpdateTagSubscribe(req.user.userNo, { ...updateData, tagSbcrNo, });

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_SUBSCRIBE_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 다수 태그 구독 수정
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

    const result = await this.tagSubscribeService.adminMultipleUpdateTagSubscribe(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 태그 구독 삭제
   * @param req 인증 요청 객체
   * @param tagSbcrNo 태그 구독 번호
   * @param updateData 태그 구독 삭제 데이터
   */
  @Endpoint({
    endpoint: '/:tagSbcrNo',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminDeleteTagSubscribe(
    @Req() req: AuthRequest,
    @Param('tagSbcrNo') tagSbcrNo: number,
    @Body() updateData: UpdateTagSubscribeDto
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.adminDeleteTagSubscribe(req.user.userNo, { ...updateData, tagSbcrNo, });

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_SUBSCRIBE_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_DELETE_SUCCESS', result.data);
  }

  /**
   * @description 다수 태그 구독 삭제
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

    const result = await this.tagSubscribeService.adminMultipleDeleteTagSubscribe(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', result.data);
  }
}
