import {
  Body,
  Controller,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, ListDto } from '@/dto';
import {
  CategorySubscribeDto,
  CreateCategorySubscribeDto,
  DeleteCategorySubscribeDto,
  SearchCategorySubscribeDto,
  UpdateCategorySubscribeDto
} from '@/dto/category-subscribe.dto';
import { ResponseDto } from '@/dto/response.dto';
import { AdminCategorySubscribeService } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

@ApiTags('admin/category-subscribe')
@Controller('admin/subscribes/categories')
@UseGuards(AdminAuthGuard)
export class AdminCategorySubscribeController {
  constructor(private readonly categorySubscribeService: AdminCategorySubscribeService) {}

  /**
   * @description 카테고리 구독 전체 목록 조회
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
  async adminGetCategorySubscribeList(
    @Req() req: AuthRequest,
    @Body() searchData: SearchCategorySubscribeDto
  ): Promise<ResponseDto<ListDto<CategorySubscribeDto>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.adminGetCategorySubscribeList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'CATEGORY_SUBSCRIBE_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_CATEGORY_SUBSCRIBE_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 카테고리별 구독자 조회
   * @param req 인증 요청 객체
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCategorySubscribeByCtgryNo(
    @Req() req: AuthRequest,
    @Param('ctgryNo') ctgryNo: number,
    @Body() searchData: SearchCategorySubscribeDto
  ): Promise<ResponseDto<ListDto<CategorySubscribeDto>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.adminGetCategorySubscribeByCtgryNo(ctgryNo, searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'CATEGORY_SUBSCRIBE_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_CATEGORY_SUBSCRIBE_BY_CATEGORY_SUCCESS',
      result.data
    );
  }

  /**
   * @description 카테고리 구독 생성
   * @param req 인증 요청 객체
   * @param createData 카테고리 구독 생성 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminCreateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() createData: CreateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.adminCreateCategorySubscribe(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_SUBSCRIBE_CREATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 다수 카테고리 구독 생성
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

    const result = await this.categorySubscribeService.adminMultipleCreateCategorySubscribe(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 카테고리 구독 수정
   * @param req 인증 요청 객체
   * @param updateData 카테고리 구독 수정 데이터
   */
  @Endpoint({
    endpoint: '/:ctgrySbcrNo',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminUpdateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.adminUpdateCategorySubscribe(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_SUBSCRIBE_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 다수 카테고리 구독 수정
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

    const result = await this.categorySubscribeService.adminMultipleUpdateCategorySubscribe(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 카테고리 구독 삭제
   * @param req 인증 요청 객체
   * @param updateData 카테고리 구독 삭제 데이터
   */
  @Endpoint({
    endpoint: '/:ctgrySbcrNo',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminDeleteCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: DeleteCategorySubscribeDto
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.adminDeleteCategorySubscribe(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_SUBSCRIBE_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_DELETE_SUCCESS', result.data);
  }

  /**
   * @description 다수 카테고리 구독 삭제
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

    const result = await this.categorySubscribeService.adminMultipleDeleteCategorySubscribe(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', result.data);
  }
}
