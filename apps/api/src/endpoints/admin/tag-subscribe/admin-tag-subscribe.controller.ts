import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import {
  TagSubscribeDto,
  CreateTagSubscribeDto,
  MultipleCreateTagSubscribeDto,
  MultipleDeleteTagSubscribeDto,
  MultipleUpdateTagSubscribeDto,
  SearchTagSubscribeDto,
  UpdateTagSubscribeDto
} from '@/dto/tag-subscribe.dto';
import { AdminTagSubscribeService } from '@/endpoints/admin/tag-subscribe/admin-tag-subscribe.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import { createResponse } from '@/utils';

@ApiTags('admin/tag-subscribe')
@Controller('admin/subscribes/tags')
@UseGuards(AdminAuthGuard)
export class AdminTagSubscribeController {
  constructor(private readonly tagSubscribeService: AdminTagSubscribeService) {}

  /**
   * @description 태그 구독 전체 목록 조회
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    summary: '📋 태그 구독 목록 조회',
    description: '전체 태그 구독 목록을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '태그 구독 검색 정보', SearchTagSubscribeDto, ],
      responses: [
        [
          '태그 구독 목록 조회 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_TAG_SUBSCRIBE_LIST_SUCCESS',
            [],
          ],
        ],
        [
          '관리자 권한 없음',
          [
            true,
            'FORBIDDEN',
            'ADMIN_UNAUTHORIZED',
            null,
          ],
        ],
      ],
    },
  })
  async adminGetTagSubscribeList(
    @Req() req: AuthRequest,
    @Body() searchData: SearchTagSubscribeDto
  ): Promise<ResponseDto<TagSubscribeDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.adminGetTagSubscribeList(searchData);

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_SUBSCRIBE_LIST_SUCCESS',
      result
    );
  }

  /**
   * @description 태그별 구독자 조회
   */
  @Get('/:tagNo')
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'GET',
    summary: '📋 태그별 구독자 조회',
    description: '특정 태그의 구독자 목록을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'tagNo', '태그 번호', 'number', true, ],
      ],
      responses: [
        [
          '태그별 구독자 조회 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_TAG_SUBSCRIBE_BY_TAG_SUCCESS',
            [],
          ],
        ],
        [
          '태그를 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'TAG_NOT_FOUND',
            null,
          ],
        ],
      ],
    },
  })
  async adminGetTagSubscribeByTagNo(
    @Req() req: AuthRequest,
    @Param('tagNo') tagNo: number,
    @Body() searchData: SearchTagSubscribeDto
  ): Promise<ResponseDto<TagSubscribeDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.tagSubscribeService.adminGetTagSubscribeByTagNo(tagNo, searchData);

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_SUBSCRIBE_BY_TAG_SUCCESS',
      result
    );
  }

  /**
   * @description 태그 구독 생성
   */
  @Post('')
  @Endpoint({
    endpoint: '',
    method: 'POST',
    summary: '✏️ 태그 구독 생성',
    description: '새로운 태그 구독을 생성합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '태그 구독 생성 정보', CreateTagSubscribeDto, ],
      responses: [
        [
          '태그 구독 생성 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_TAG_SUBSCRIBE_CREATE_SUCCESS',
            null,
          ],
        ],
        [
          '이미 구독 중인 태그',
          [
            true,
            'CONFLICT',
            'TAG_SUBSCRIBE_ALREADY_EXISTS',
            null,
          ],
        ],
      ],
    },
  })
  async adminCreateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() createData: CreateTagSubscribeDto
  ): Promise<ResponseDto<TagSubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.tagSubscribeService.adminCreateTagSubscribe(req.user.userNo, createData);
  }

  /**
   * @description 다수 태그 구독 생성
   */
  @Post('/multiple')
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    summary: '✏️ 다수 태그 구독 생성',
    description: '다수 태그 구독을 일괄 생성합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '다수 태그 구독 생성 정보', MultipleCreateTagSubscribeDto, ],
      responses: [
        [
          '다수 태그 구독 생성 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS',
            [],
          ],
        ],
      ],
    },
  })
  async adminMultipleCreateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() createData: MultipleCreateTagSubscribeDto
  ): Promise<ResponseDto<TagSubscribeDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.tagSubscribeService.adminMultipleCreateTagSubscribe(req.user.userNo, createData);
  }

  /**
   * @description 태그 구독 수정
   */
  @Put('/:tagSbcrNo')
  @Endpoint({
    endpoint: '/:tagSbcrNo',
    method: 'PUT',
    summary: '🔄 태그 구독 수정',
    description: '태그 구독 정보를 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'tagSbcrNo', '태그 구독 번호', 'number', true, ],
      ],
      body: [ '태그 구독 수정 정보', UpdateTagSubscribeDto, ],
      responses: [
        [
          '태그 구독 수정 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_TAG_SUBSCRIBE_UPDATE_SUCCESS',
            null,
          ],
        ],
        [
          '태그 구독을 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'TAG_SUBSCRIBE_NOT_FOUND',
            null,
          ],
        ],
      ],
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

    // TODO: 구현 필요
    return await this.tagSubscribeService.adminUpdateTagSubscribe(req.user.userNo, tagSbcrNo, updateData);
  }

  /**
   * @description 다수 태그 구독 수정
   */
  @Put('/multiple')
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    summary: '🔄 다수 태그 구독 수정',
    description: '다수 태그 구독을 일괄 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '다수 태그 구독 수정 정보', MultipleUpdateTagSubscribeDto, ],
      responses: [
        [
          '다수 태그 구독 수정 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS',
            [],
          ],
        ],
      ],
    },
  })
  async adminMultipleUpdateTagSubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: MultipleUpdateTagSubscribeDto
  ): Promise<ResponseDto<TagSubscribeDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.tagSubscribeService.adminMultipleUpdateTagSubscribe(req.user.userNo, updateData);
  }

  /**
   * @description 태그 구독 삭제
   */
  @Delete('/:tagSbcrNo')
  @Endpoint({
    endpoint: '/:tagSbcrNo',
    method: 'DELETE',
    summary: '🗑️ 태그 구독 삭제',
    description: '태그 구독을 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'tagSbcrNo', '태그 구독 번호', 'number', true, ],
      ],
      responses: [
        [
          '태그 구독 삭제 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_TAG_SUBSCRIBE_DELETE_SUCCESS',
            null,
          ],
        ],
        [
          '태그 구독을 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'TAG_SUBSCRIBE_NOT_FOUND',
            null,
          ],
        ],
      ],
    },
  })
  async adminDeleteTagSubscribe(
    @Req() req: AuthRequest,
    @Param('tagSbcrNo') tagSbcrNo: number,
    @Body() updateData: UpdateTagSubscribeDto
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.tagSubscribeService.adminDeleteTagSubscribe(req.user.userNo, tagSbcrNo, updateData);
  }

  /**
   * @description 다수 태그 구독 삭제
   */
  @Delete('/multiple')
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    summary: '🗑️ 다수 태그 구독 삭제',
    description: '다수 태그 구독을 일괄 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '다수 태그 구독 삭제 정보', MultipleDeleteTagSubscribeDto, ],
      responses: [
        [
          '다수 태그 구독 삭제 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS',
            null,
          ],
        ],
      ],
    },
  })
  async adminMultipleDeleteTagSubscribe(
    @Req() req: AuthRequest,
    @Body() deleteData: MultipleDeleteTagSubscribeDto
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.tagSubscribeService.adminMultipleDeleteTagSubscribe(req.user.userNo, deleteData);
  }
}
