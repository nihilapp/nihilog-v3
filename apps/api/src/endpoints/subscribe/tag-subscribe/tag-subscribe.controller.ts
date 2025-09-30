import { Body, Controller, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { CreateTagSubscribeDto, UpdateTagSubscribeDto, type AuthRequest } from '@/dto';
import { JwtAuthGuard } from '@/endpoints/auth/jwt-auth.guard';
import type { TagSubscribeService } from '@/endpoints/subscribe/tag-subscribe/tag-subscribe.service';
import { createResponse } from '@/utils';

@ApiTags('tag-subscribe')
@Controller('users/subscribes/tags')
@UseGuards(JwtAuthGuard)
export class TagSubscribeController {
  constructor(private readonly tagSubscribeService: TagSubscribeService) {}

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '',
    method: 'GET',
    summary: '📋 태그 구독 목록 조회',
    description: '사용자가 구독한 태그 목록을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '태그 구독 목록 조회 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_LIST_SUCCESS', [], ],
        ],
      ],
    },
  })
  async getTagSubscribeList(@Req() req: AuthRequest) {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.getTagSubscribeList(req.user.userNo);

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_LIST_SUCCESS', result);
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param req 요청 객체
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'GET',
    summary: '📋 태그 구독 상태 조회',
    description: '특정 태그의 구독 상태를 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      params: [ [ 'tagNo', '태그 번호', 'number', true, ], ],
      responses: [
        [
          '태그 구독 상태 조회 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_LIST_SUCCESS', null, ],
        ],
      ],
    },
  })
  async getTagSubscribeByTagNo(
    @Req() req: AuthRequest,
    @Param('tagNo') tagNo: number
  ) {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.getTagSubscribeByTagNo(req.user.userNo, tagNo);

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_LIST_SUCCESS', result);
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
      params: [ [ 'tagNo', '태그 번호', 'number', true, ], ],
      responses: [
        [
          '태그 구독 설정 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_CREATE_SUCCESS', null, ],
        ],
      ],
    },
  })
  async createTagSubscribe(
    @Req() req: AuthRequest,
    @Param('tagNo') tagNo: number
  ) {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.createTagSubscribe(req.user.userNo, tagNo);

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_CREATE_SUCCESS', result);
  }

  /**
   * @description 다수 태그 구독 설정
   * @param req 요청 객체
   * @param body 구독할 태그 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    summary: '➕ 다수 태그 구독 설정',
    description: '다수 태그를 일괄 구독합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '다수 태그 구독 정보', CreateTagSubscribeDto, ],
      responses: [
        [
          '다수 태그 구독 설정 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', [], ],
        ],
      ],
    },
  })
  async multipleCreateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() body: CreateTagSubscribeDto
  ) {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.multipleCreateTagSubscribe(req.user.userNo, body);

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', result);
  }

  /**
   * @description 다수 태그 구독 설정 변경
   * @param req 요청 객체
   * @param body 변경할 태그 구독 설정
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    summary: '🔄 다수 태그 구독 설정 변경',
    description: '다수 태그 구독 설정을 일괄 변경합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '다수 태그 구독 변경 정보', UpdateTagSubscribeDto, ],
      responses: [
        [
          '다수 태그 구독 설정 변경 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', [], ],
        ],
      ],
    },
  })
  async multipleUpdateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() body: UpdateTagSubscribeDto
  ) {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.multipleUpdateTagSubscribe(req.user.userNo, body);

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', result);
  }

  /**
   * @description 특정 태그 구독 해제
   * @param req 요청 객체
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'DELETE',
    summary: '➖ 태그 구독 해제',
    description: '특정 태그 구독을 해제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      params: [ [ 'tagNo', '태그 번호', 'number', true, ], ],
      responses: [
        [
          '태그 구독 해제 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_DELETE_SUCCESS', null, ],
        ],
      ],
    },
  })
  async deleteTagSubscribe(
    @Req() req: AuthRequest,
    @Param('tagNo') tagNo: number
  ) {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.deleteTagSubscribe(req.user.userNo, tagNo);

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_DELETE_SUCCESS', result);
  }

  /**
   * @description 다수 태그 구독 해제
   * @param req 요청 객체
   * @param body 해제할 태그 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    summary: '➖ 다수 태그 구독 해제',
    description: '다수 태그 구독을 일괄 해제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'USER', 'ADMIN', ],
      body: [ '다수 태그 구독 해제 정보', UpdateTagSubscribeDto, ],
      responses: [
        [
          '다수 태그 구독 해제 성공',
          [ false, 'SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', null, ],
        ],
      ],
    },
  })
  async multipleDeleteTagSubscribe(
    @Req() req: AuthRequest,
    @Body() body: UpdateTagSubscribeDto
  ) {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.multipleDeleteTagSubscribe(req.user.userNo, body);

    return createResponse('SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', result);
  }
}
