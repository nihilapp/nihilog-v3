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
import {
  CategorySubscribeDto,
  CreateCategorySubscribeDto,
  MultipleCreateCategorySubscribeDto,
  MultipleDeleteCategorySubscribeDto,
  MultipleUpdateCategorySubscribeDto,
  SearchCategorySubscribeDto,
  UpdateCategorySubscribeDto
} from '@/dto/category-subscribe.dto';
import { ResponseDto } from '@/dto/response.dto';
import { AdminCategorySubscribeService } from '@/endpoints/admin/category-subscribe/admin-category-subscribe.service';
import { createResponse } from '@/utils';
import { AdminAuthGuard } from '@auth/admin-auth.guard';

@ApiTags('admin/category-subscribe')
@Controller('admin/subscribes/categories')
@UseGuards(AdminAuthGuard)
export class AdminCategorySubscribeController {
  constructor(private readonly categorySubscribeService: AdminCategorySubscribeService) {}

  /**
   * @description 카테고리 구독 전체 목록 조회
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    summary: '📋 카테고리 구독 목록 조회',
    description: '전체 카테고리 구독 목록을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '카테고리 구독 검색 정보', SearchCategorySubscribeDto, ],
      responses: [
        [
          '카테고리 구독 목록 조회 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_CATEGORY_SUBSCRIBE_LIST_SUCCESS',
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
  async adminGetCategorySubscribeList(
    @Req() req: AuthRequest,
    @Body() searchData: SearchCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.categorySubscribeService.adminGetCategorySubscribeList(searchData);

    return createResponse(
      'SUCCESS',
      'ADMIN_CATEGORY_SUBSCRIBE_LIST_SUCCESS',
      result
    );
  }

  /**
   * @description 카테고리별 구독자 조회
   */
  @Get('/:ctgryNo')
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'GET',
    summary: '📋 카테고리별 구독자 조회',
    description: '특정 카테고리의 구독자 목록을 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'ctgryNo', '카테고리 번호', 'number', true, ],
      ],
      responses: [
        [
          '카테고리별 구독자 조회 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_CATEGORY_SUBSCRIBE_BY_CATEGORY_SUCCESS',
            [],
          ],
        ],
        [
          '카테고리를 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'CATEGORY_NOT_FOUND',
            null,
          ],
        ],
      ],
    },
  })
  async adminGetCategorySubscribeByCtgryNo(
    @Req() req: AuthRequest,
    @Param('ctgryNo') ctgryNo: number,
    @Body() searchData: SearchCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    const result = await this.categorySubscribeService.adminGetCategorySubscribeByCtgryNo(ctgryNo, searchData);

    return createResponse(
      'SUCCESS',
      'ADMIN_CATEGORY_SUBSCRIBE_BY_CATEGORY_SUCCESS',
      result
    );
  }

  /**
   * @description 카테고리 구독 생성
   */
  @Post('')
  @Endpoint({
    endpoint: '',
    method: 'POST',
    summary: '✏️ 카테고리 구독 생성',
    description: '새로운 카테고리 구독을 생성합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '카테고리 구독 생성 정보', CreateCategorySubscribeDto, ],
      responses: [
        [
          '카테고리 구독 생성 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_CATEGORY_SUBSCRIBE_CREATE_SUCCESS',
            null,
          ],
        ],
        [
          '이미 구독 중인 카테고리',
          [
            true,
            'CONFLICT',
            'CATEGORY_SUBSCRIBE_ALREADY_EXISTS',
            null,
          ],
        ],
      ],
    },
  })
  async adminCreateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() createData: CreateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.categorySubscribeService.adminCreateCategorySubscribe(req.user.userNo, createData);
  }

  /**
   * @description 다수 카테고리 구독 생성
   */
  @Post('/multiple')
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    summary: '✏️ 다수 카테고리 구독 생성',
    description: '다수 카테고리 구독을 일괄 생성합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '다수 카테고리 구독 생성 정보', MultipleCreateCategorySubscribeDto, ],
      responses: [
        [
          '다수 카테고리 구독 생성 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS',
            [],
          ],
        ],
      ],
    },
  })
  async adminMultipleCreateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() createData: MultipleCreateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.categorySubscribeService.adminMultipleCreateCategorySubscribe(req.user.userNo, createData);
  }

  /**
   * @description 카테고리 구독 수정
   */
  @Put('/:ctgrySbcrNo')
  @Endpoint({
    endpoint: '/:ctgrySbcrNo',
    method: 'PUT',
    summary: '🔄 카테고리 구독 수정',
    description: '카테고리 구독 정보를 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'ctgrySbcrNo', '카테고리 구독 번호', 'number', true, ],
      ],
      body: [ '카테고리 구독 수정 정보', UpdateCategorySubscribeDto, ],
      responses: [
        [
          '카테고리 구독 수정 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_CATEGORY_SUBSCRIBE_UPDATE_SUCCESS',
            null,
          ],
        ],
        [
          '카테고리 구독을 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'CATEGORY_SUBSCRIBE_NOT_FOUND',
            null,
          ],
        ],
      ],
    },
  })
  async adminUpdateCategorySubscribe(
    @Req() req: AuthRequest,
    @Param('ctgrySbcrNo') ctgrySbcrNo: number,
    @Body() updateData: UpdateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.categorySubscribeService.adminUpdateCategorySubscribe(req.user.userNo, ctgrySbcrNo, updateData);
  }

  /**
   * @description 다수 카테고리 구독 수정
   */
  @Put('/multiple')
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    summary: '🔄 다수 카테고리 구독 수정',
    description: '다수 카테고리 구독을 일괄 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '다수 카테고리 구독 수정 정보', MultipleUpdateCategorySubscribeDto, ],
      responses: [
        [
          '다수 카테고리 구독 수정 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS',
            [],
          ],
        ],
      ],
    },
  })
  async adminMultipleUpdateCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() updateData: MultipleUpdateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.categorySubscribeService.adminMultipleUpdateCategorySubscribe(req.user.userNo, updateData);
  }

  /**
   * @description 카테고리 구독 삭제
   */
  @Delete('/:ctgrySbcrNo')
  @Endpoint({
    endpoint: '/:ctgrySbcrNo',
    method: 'DELETE',
    summary: '🗑️ 카테고리 구독 삭제',
    description: '카테고리 구독을 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'ctgrySbcrNo', '카테고리 구독 번호', 'number', true, ],
      ],
      responses: [
        [
          '카테고리 구독 삭제 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_CATEGORY_SUBSCRIBE_DELETE_SUCCESS',
            null,
          ],
        ],
        [
          '카테고리 구독을 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'CATEGORY_SUBSCRIBE_NOT_FOUND',
            null,
          ],
        ],
      ],
    },
  })
  async adminDeleteCategorySubscribe(
    @Req() req: AuthRequest,
    @Param('ctgrySbcrNo') ctgrySbcrNo: number,
    @Body() updateData: UpdateCategorySubscribeDto
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.categorySubscribeService.adminDeleteCategorySubscribe(req.user.userNo, ctgrySbcrNo, updateData);
  }

  /**
   * @description 다수 카테고리 구독 삭제
   */
  @Delete('/multiple')
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    summary: '🗑️ 다수 카테고리 구독 삭제',
    description: '다수 카테고리 구독을 일괄 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '다수 카테고리 구독 삭제 정보', MultipleDeleteCategorySubscribeDto, ],
      responses: [
        [
          '다수 카테고리 구독 삭제 성공',
          [
            false,
            'SUCCESS',
            'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS',
            null,
          ],
        ],
      ],
    },
  })
  async adminMultipleDeleteCategorySubscribe(
    @Req() req: AuthRequest,
    @Body() deleteData: MultipleDeleteCategorySubscribeDto
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 구현 필요
    return await this.categorySubscribeService.adminMultipleDeleteCategorySubscribe(req.user.userNo, deleteData);
  }
}
