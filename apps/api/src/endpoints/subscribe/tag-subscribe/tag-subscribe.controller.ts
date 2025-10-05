import {
  Controller,
  Body,
  Req,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto, AuthRequest, type SearchTagSubscribeDto, type TagSubscribeDto, type CreateTagSubscribeDto, type UpdateTagSubscribeDto, type DeleteTagSubscribeDto } from '@/dto';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectTagSbcrMpngListItemType, SelectTagSbcrMpngType } from '@/endpoints/prisma/types/tag-subscribe.types';
import { createError, createResponse } from '@/utils';
import { createExampleTagSubscribe } from '@/utils/createExampleTagSubscribe';

import { TagSubscribeService } from './tag-subscribe.service';

@ApiTags('users/subscribes/tags')
@Controller('users/subscribes/tags')
export class TagSubscribeController {
  constructor(private readonly tagSubscribeService: TagSubscribeService) {}

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/',
    method: 'GET',
    summary: '📋 태그 구독 목록 조회',
    description: '사용자가 구독한 태그 목록을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '태그 구독 목록 조회 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_SEARCH_SUCCESS', [
            createExampleTagSubscribe('list'),
          ], ],
        ],
        [
          '태그 구독 목록 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_SEARCH_ERROR', null, ],
        ],
      ],
    },
  })
  async getTagSubscribeList(
    @Req() req: AuthRequest,
    @Body() body: SearchTagSubscribeDto & Partial<TagSubscribeDto>
  ): Promise<ResponseDto<ListType<SelectTagSbcrMpngListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    try {
      const result = await this.tagSubscribeService.getTagSubscribeList(body);
      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_SEARCH_SUCCESS', result);
    }
    catch {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_SEARCH_ERROR');
    }
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param req 요청 객체
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'GET',
    summary: '📋 특정 태그 구독 상태 조회',
    description: '특정 태그의 구독 상태를 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '태그 구독 상태 조회 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_SEARCH_SUCCESS', createExampleTagSubscribe('detail'), ],
        ],
        [
          '태그 구독 상태 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_SEARCH_ERROR', null, ],
        ],
      ],
    },
  })
  async getTagSubscribeByTagNo(
    @Req() req: AuthRequest,
    @Param('tagNo', ParseIntPipe) tagNo: number,
    @Body() body: SearchTagSubscribeDto & Partial<TagSubscribeDto>
  ): Promise<ResponseDto<ListType<SelectTagSbcrMpngListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    try {
      const result = await this.tagSubscribeService.getTagSubscribeByTagNo(tagNo, body);
      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_SEARCH_SUCCESS', result);
    }
    catch {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_SEARCH_ERROR');
    }
  }

  /**
   * @description 특정 태그 구독 설정
   * @param req 요청 객체
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'POST',
    summary: '➕ 태그 구독 설정',
    description: '특정 태그를 구독합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '태그 구독 설정 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_CREATE_SUCCESS', createExampleTagSubscribe('detail'), ],
        ],
        [
          '태그 구독 설정 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_CREATE_ERROR', null, ],
        ],
      ],
    },
  })
  async createTagSubscribe(
    @Req() req: AuthRequest,
    @Param('tagNo', ParseIntPipe) tagNo: number,
    @Body() body: CreateTagSubscribeDto
  ): Promise<ResponseDto<SelectTagSbcrMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.createTagSubscribe(req.user.userNo, { ...body, tagNo, });

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_CREATE_ERROR');
    }

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_CREATE_SUCCESS', result);
  }

  /**
   * @description 다수 태그 일괄 구독
   * @param req 요청 객체
   * @param body 구독할 태그 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    summary: '➕ 다수 태그 일괄 구독',
    description: '여러 태그를 한 번에 구독합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '구독할 태그 목록 DTO', Object, ],
      responses: [
        [
          '다수 태그 구독 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', [ createExampleTagSubscribe('detail'), ], ],
        ],
        [
          '다수 태그 구독 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_ERROR', null, ],
        ],
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

    const result = await this.tagSubscribeService.multipleCreateTagSubscribe(req.user.userNo, body);

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_CREATE_ERROR');
    }

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_CREATE_SUCCESS', result);
  }

  /**
   * @description 다수 태그 구독 설정 일괄 변경
   * @param req 요청 객체
   * @param body 변경할 구독 설정
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    summary: '✏️ 다수 태그 구독 설정 일괄 변경',
    description: '여러 태그의 구독 설정을 한 번에 변경합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '구독 설정 변경 DTO', Object, ],
      responses: [
        [
          '다수 태그 구독 설정 변경 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', [ createExampleTagSubscribe('detail'), ], ],
        ],
        [
          '다수 태그 구독 설정 변경 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_UPDATE_ERROR', null, ],
        ],
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

    const result = await this.tagSubscribeService.multipleUpdateTagSubscribe(req.user.userNo, body);

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_UPDATE_ERROR');
    }

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_UPDATE_SUCCESS', result);
  }

  /**
   * @description 특정 태그 구독 해제
   * @param req 요청 객체
   * @param tagSbcrNo 태그 구독 번호
   */
  @Endpoint({
    endpoint: '/:tagSbcrNo',
    method: 'DELETE',
    summary: '➖ 태그 구독 해제',
    description: '특정 태그 구독을 해제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '태그 구독 해제 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_DELETE_SUCCESS', true, ],
        ],
        [
          '태그 구독 해제 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_DELETE_ERROR', false, ],
        ],
      ],
    },
  })
  async deleteTagSubscribe(
    @Req() req: AuthRequest,
    @Param('tagSbcrNo', ParseIntPipe) tagSbcrNo: number
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.tagSubscribeService.deleteTagSubscribe(req.user.userNo, tagSbcrNo);

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_DELETE_ERROR');
    }

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_DELETE_SUCCESS', result);
  }

  /**
   * @description 다수 태그 구독 일괄 해제
   * @param req 요청 객체
   * @param body 해제할 태그 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    summary: '➖ 다수 태그 구독 일괄 해제',
    description: '여러 태그 구독을 한 번에 해제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '구독 해제할 태그 목록 DTO', Object, ],
      responses: [
        [
          '다수 태그 구독 해제 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', [ createExampleTagSubscribe('detail'), ], ],
        ],
        [
          '다수 태그 구독 해제 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_DELETE_ERROR', null, ],
        ],
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

    const result = await this.tagSubscribeService.multipleDeleteTagSubscribe(req.user.userNo, body);

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_DELETE_ERROR');
    }

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_DELETE_SUCCESS', result);
  }
}
