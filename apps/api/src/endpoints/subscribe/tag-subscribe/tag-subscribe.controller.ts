import {
  Controller,
  Body,
  Req,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto, AuthRequest, type SearchTagSubscribeDto, CreateTagSubscribeDto, UpdateTagSubscribeDto, DeleteTagSubscribeDto } from '@/dto';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectTagSbcrMpngListItemType, SelectTagSbcrMpngType } from '@/endpoints/prisma/types/tag-subscribe.types';
import { createError, createResponse } from '@/utils';

import { TagSubscribeService } from './tag-subscribe.service';

@Controller('users/subscribes/tags')
export class TagSubscribeController {
  constructor(private readonly tagSubscribeService: TagSubscribeService) {}

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [
        'USER',
        'ADMIN',
      ],
    },
  })
  async getTagSubscribeList(
    @Req() req: AuthRequest,
    @Query() body: SearchTagSubscribeDto
  ): Promise<ResponseDto<ListType<SelectTagSbcrMpngListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.getTagSubscribeList(body);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.TAG.SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param req 요청 객체
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [
        'USER',
        'ADMIN',
      ],
    },
  })
  async getTagSubscribeByTagNo(
    @Req() req: AuthRequest,
    @Param(
      'tagNo',
      ParseIntPipe
    ) tagNo: number,
    @Query() body: SearchTagSubscribeDto
  ): Promise<ResponseDto<ListType<SelectTagSbcrMpngListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.getTagSubscribeByTagNo(
      tagNo,
      body
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.TAG.SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 특정 태그 구독 설정
   * @param req 요청 객체
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [
        'USER',
        'ADMIN',
      ],
    },
  })
  async createTagSubscribe(
    @Req() req: AuthRequest,
    @Param(
      'tagNo',
      ParseIntPipe
    ) tagNo: number,
    @Body() body: CreateTagSubscribeDto
  ): Promise<ResponseDto<SelectTagSbcrMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.createTagSubscribe(
      req.user.userNo,
      {
        ...body,
        tagNo,
      }
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.CREATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.TAG.CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 태그 일괄 구독
   * @param req 요청 객체
   * @param body 구독할 태그 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [
        'USER',
        'ADMIN',
      ],
    },
  })
  async multipleCreateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() body: CreateTagSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.multipleCreateTagSubscribe(
      req.user.userNo,
      body
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.MULTIPLE_CREATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.TAG.MULTIPLE_CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 특정 태그 구독 설정 변경
   * @param req 요청 객체
   * @param tagSbcrNo 태그 구독 번호
   * @param body 변경할 구독 설정
   */
  @Endpoint({
    endpoint: '/:tagSbcrNo',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [
        'USER',
        'ADMIN',
      ],
    },
  })
  async updateTagSubscribe(
    @Req() req: AuthRequest,
    @Param(
      'tagSbcrNo',
      ParseIntPipe
    ) tagSbcrNo: number,
    @Body() body: UpdateTagSubscribeDto
  ): Promise<ResponseDto<SelectTagSbcrMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.updateTagSubscribe(
      req.user.userNo,
      {
        ...body,
        tagSbcrNo,
      } as UpdateTagSubscribeDto & { tagSbcrNo: number }
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.TAG.UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 태그 구독 설정 일괄 변경
   * @param req 요청 객체
   * @param body 변경할 구독 설정
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [
        'USER',
        'ADMIN',
      ],
    },
  })
  async multipleUpdateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() body: UpdateTagSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.multipleUpdateTagSubscribe(
      req.user.userNo,
      body
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.MULTIPLE_UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.TAG.MULTIPLE_UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 특정 태그 구독 해제
   * @param req 요청 객체
   * @param tagSbcrNo 태그 구독 번호
   */
  @Endpoint({
    endpoint: '/:tagSbcrNo',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [
        'USER',
        'ADMIN',
      ],
    },
  })
  async deleteTagSubscribe(
    @Req() req: AuthRequest,
    @Param(
      'tagSbcrNo',
      ParseIntPipe
    ) tagSbcrNo: number
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.deleteTagSubscribe(
      req.user.userNo,
      tagSbcrNo
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.TAG.DELETE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 태그 구독 일괄 해제
   * @param req 요청 객체
   * @param body 해제할 태그 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [
        'USER',
        'ADMIN',
      ],
    },
  })
  async multipleDeleteTagSubscribe(
    @Req() req: AuthRequest,
    @Body() body: DeleteTagSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.multipleDeleteTagSubscribe(
      req.user.userNo,
      body
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.SUBSCRIBE.TAG.MULTIPLE_DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.SUBSCRIBE.TAG.MULTIPLE_DELETE_SUCCESS,
      result.data
    );
  }
}
