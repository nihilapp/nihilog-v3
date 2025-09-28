import {
  Controller,
  Body,
  Req,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto, AuthRequest } from '@/dto';
import { createError, createResponse } from '@/utils';

import { CategorySubscribeService } from './category-subscribe.service';

@ApiTags('users/subscribes/categories')
@Controller('users/subscribes/categories')
export class CategorySubscribeController {
  constructor(private readonly categorySubscribeService: CategorySubscribeService) { }

  /**
   * @description 사용자가 구독한 카테고리 목록 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/',
    method: 'GET',
    summary: '📋 카테고리 구독 목록 조회',
    description: '사용자가 구독한 카테고리 목록을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '카테고리 구독 목록 조회 성공',
          [ false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_LIST_SUCCESS', [], ],
        ],
        [
          '카테고리 구독 목록 조회 실패',
          [ true, 'NOT_FOUND', 'CATEGORY_SUBSCRIBE_LIST_ERROR', null, ],
        ],
      ],
    },
  })
  async getCategorySubscribeList(@Req() req: AuthRequest): Promise<ResponseDto<any[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    try {
      const result = await this.categorySubscribeService.getCategorySubscribeList(req.user.userNo);
      return createResponse(false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_LIST_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_LIST_ERROR', error.message);
    }
  }

  /**
   * @description 특정 카테고리 구독 상태 조회
   * @param req 요청 객체
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'GET',
    summary: '📋 특정 카테고리 구독 상태 조회',
    description: '특정 카테고리의 구독 상태를 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '카테고리 구독 상태 조회 성공',
          [ false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_LIST_SUCCESS', {}, ],
        ],
        [
          '카테고리 구독 상태 조회 실패',
          [ true, 'NOT_FOUND', 'CATEGORY_SUBSCRIBE_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async getCategorySubscribeByCtgryNo(
    @Req() req: AuthRequest,
    @Param('ctgryNo', ParseIntPipe) ctgryNo: number
  ): Promise<ResponseDto<any>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    try {
      const result = await this.categorySubscribeService.getCategorySubscribeByCtgryNo(req.user.userNo, ctgryNo);
      return createResponse(false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_GET_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'CATEGORY_SUBSCRIBE_GET_FAILED', error.message);
    }
  }

  /**
   * @description 특정 카테고리 구독 설정
   * @param req 요청 객체
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'POST',
    summary: '➕ 카테고리 구독 설정',
    description: '특정 카테고리를 구독합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '카테고리 구독 설정 성공',
          [ false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_CREATE_SUCCESS', {}, ],
        ],
        [
          '카테고리 구독 설정 실패',
          [ true, 'BAD_REQUEST', 'CATEGORY_SUBSCRIBE_CREATE_ERROR', null, ],
        ],
      ],
    },
  })
  async createCategorySubscribe(
    @Req() req: AuthRequest,
    @Param('ctgryNo', ParseIntPipe) ctgryNo: number
  ): Promise<ResponseDto<any>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return createResponse(false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_CREATE_SUCCESS', true);
  }

  /**
   * @description 다수 카테고리 일괄 구독
   * @param req 요청 객체
   * @param body 구독할 카테고리 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    summary: '➕ 다수 카테고리 일괄 구독',
    description: '여러 카테고리를 한 번에 구독합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '구독할 카테고리 목록 DTO', Object, ],
      responses: [
        [
          '다수 카테고리 구독 성공',
          [ false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', {}, ],
        ],
        [
          '다수 카테고리 구독 실패',
          [ true, 'BAD_REQUEST', 'CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_ERROR', null, ],
        ],
      ],
    },
  })
  async multipleCreateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() body: { ctgryNoList: number[] }
  ): Promise<ResponseDto<any>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return createResponse(false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', true);
  }

  /**
   * @description 다수 카테고리 구독 설정 일괄 변경
   * @param req 요청 객체
   * @param body 변경할 구독 설정
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    summary: '✏️ 다수 카테고리 구독 설정 일괄 변경',
    description: '여러 카테고리의 구독 설정을 한 번에 변경합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '구독 설정 변경 DTO', Object, ],
      responses: [
        [
          '다수 카테고리 구독 설정 변경 성공',
          [ false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', {}, ],
        ],
        [
          '다수 카테고리 구독 설정 변경 실패',
          [ true, 'BAD_REQUEST', 'CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_ERROR', null, ],
        ],
      ],
    },
  })
  async multipleUpdateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() body: { ctgryNoList: number[]; updateData: any }
  ): Promise<ResponseDto<any>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return createResponse(false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', true);
  }

  /**
   * @description 특정 카테고리 구독 해제
   * @param req 요청 객체
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'DELETE',
    summary: '➖ 카테고리 구독 해제',
    description: '특정 카테고리 구독을 해제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '카테고리 구독 해제 성공',
          [ false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_DELETE_SUCCESS', null, ],
        ],
        [
          '카테고리 구독 해제 실패',
          [ true, 'NOT_FOUND', 'CATEGORY_SUBSCRIBE_DELETE_ERROR', null, ],
        ],
      ],
    },
  })
  async deleteCategorySubscribe(
    @Req() req: AuthRequest,
    @Param('ctgryNo', ParseIntPipe) ctgryNo: number
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return createResponse(false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_DELETE_SUCCESS', null);
  }

  /**
   * @description 다수 카테고리 구독 일괄 해제
   * @param req 요청 객체
   * @param body 해제할 카테고리 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    summary: '➖ 다수 카테고리 구독 일괄 해제',
    description: '여러 카테고리 구독을 한 번에 해제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '구독 해제할 카테고리 목록 DTO', Object, ],
      responses: [
        [
          '다수 카테고리 구독 해제 성공',
          [ false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', {}, ],
        ],
        [
          '다수 카테고리 구독 해제 실패',
          [ true, 'BAD_REQUEST', 'CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_ERROR', null, ],
        ],
      ],
    },
  })
  async multipleDeleteCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() body: { ctgryNoList: number[] }
  ): Promise<ResponseDto<any>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return createResponse(false, 'SUCCESS', 'CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', true);
  }
}
