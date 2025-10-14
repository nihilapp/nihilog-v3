import {
  Controller,
  Body,
  Req,
  Param,
  ParseIntPipe
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto, AuthRequest, type SearchCategorySubscribeDto, CreateCategorySubscribeDto, UpdateCategorySubscribeDto, DeleteCategorySubscribeDto } from '@/dto';
import type { SelectCtgrySbcrMpngListItemType, SelectCtgrySbcrMpngType } from '@/endpoints/prisma/types/category-subscribe.types';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

import { CategorySubscribeService } from './category-subscribe.service';

@Controller('users/subscribes/categories')
export class CategorySubscribeController {
  constructor(private readonly categorySubscribeService: CategorySubscribeService) { }

  /**
   * @description 사용자가 구독한 카테고리 목록 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/search',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async getCategorySubscribeList(
    @Req() req: AuthRequest,
    @Body() body: SearchCategorySubscribeDto
  ): Promise<ResponseDto<ListType<SelectCtgrySbcrMpngListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.getCategorySubscribeList(body);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.SEARCH_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.CATEGORY.SEARCH_SUCCESS, result.data);
  }

  /**
   * @description 특정 카테고리 구독 상태 조회
   * @param req 요청 객체
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async getCategorySubscribeByCtgryNo(
    @Req() req: AuthRequest,
    @Param('ctgryNo', ParseIntPipe) ctgryNo: number,
    @Body() body: SearchCategorySubscribeDto
  ): Promise<ResponseDto<ListType<SelectCtgrySbcrMpngListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.getCategorySubscribeByCtgryNo(ctgryNo, body);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.SEARCH_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.CATEGORY.SEARCH_SUCCESS, result.data);
  }

  /**
   * @description 특정 카테고리 구독 설정
   * @param req 요청 객체
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async createCategorySubscribe(
    @Req() req: AuthRequest,
    @Param('ctgryNo', ParseIntPipe) ctgryNo: number,
    @Body() body: CreateCategorySubscribeDto
  ): Promise<ResponseDto<SelectCtgrySbcrMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.createCategorySubscribe(req.user.userNo, { ...body, ctgryNo, });

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.CREATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.CATEGORY.CREATE_SUCCESS, result.data);
  }

  /**
   * @description 다수 카테고리 일괄 구독
   * @param req 요청 객체
   * @param body 구독할 카테고리 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async multipleCreateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() body: CreateCategorySubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.multipleCreateCategorySubscribe(req.user.userNo, body);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.MULTIPLE_CREATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.CATEGORY.MULTIPLE_CREATE_SUCCESS, result.data);
  }

  /**
   * @description 특정 카테고리 구독 설정 변경
   * @param req 요청 객체
   * @param ctgrySbcrNo 카테고리 구독 번호
   * @param body 변경할 구독 설정
   */
  @Endpoint({
    endpoint: '/:ctgrySbcrNo',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async updateCategorySubscribe(
    @Req() req: AuthRequest,
    @Param('ctgrySbcrNo', ParseIntPipe) ctgrySbcrNo: number,
    @Body() body: UpdateCategorySubscribeDto
  ): Promise<ResponseDto<SelectCtgrySbcrMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.updateCategorySubscribe(
      req.user.userNo,
      { ...body, ctgrySbcrNo, }
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.UPDATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.CATEGORY.UPDATE_SUCCESS, result.data);
  }

  /**
   * @description 다수 카테고리 구독 설정 일괄 변경
   * @param req 요청 객체
   * @param body 변경할 구독 설정
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async multipleUpdateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() body: UpdateCategorySubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.multipleUpdateCategorySubscribe(req.user.userNo, body);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.MULTIPLE_UPDATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.CATEGORY.MULTIPLE_UPDATE_SUCCESS, result.data);
  }

  /**
   * @description 특정 카테고리 구독 해제
   * @param req 요청 객체
   * @param ctgrySbcrNo 카테고리 구독 번호
   */
  @Endpoint({
    endpoint: '/:ctgrySbcrNo',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async deleteCategorySubscribe(
    @Req() req: AuthRequest,
    @Param('ctgrySbcrNo', ParseIntPipe) ctgrySbcrNo: number
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.deleteCategorySubscribe(req.user.userNo, ctgrySbcrNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.DELETE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.CATEGORY.DELETE_SUCCESS, result.data);
  }

  /**
   * @description 다수 카테고리 구독 일괄 해제
   * @param req 요청 객체
   * @param body 해제할 카테고리 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
    },
  })
  async multipleDeleteCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() body: DeleteCategorySubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.categorySubscribeService.multipleDeleteCategorySubscribe(req.user.userNo, body);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.CATEGORY.MULTIPLE_DELETE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.SUBSCRIBE.CATEGORY.MULTIPLE_DELETE_SUCCESS, result.data);
  }
}
