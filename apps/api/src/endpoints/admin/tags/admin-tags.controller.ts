import { Body, Controller, Param, Req, UseGuards } from '@nestjs/common';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, CreateTagDto, DeleteTagDto, ResponseDto, UpdateTagDto } from '@/dto';
import type { CreatePstTagMpngDto, DeletePstTagMpngDto, SearchPstTagMpngDto } from '@/dto/tag.dto';
import { AdminTagsService } from '@/endpoints/admin/tags/admin-tags.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectPstTagMpngListItemType, SelectPstTagMpngType, SelectTagInfoType } from '@/endpoints/prisma/types/tag.types';
import { createError, createResponse } from '@/utils';

@Controller('admin/tags')
@UseGuards(AdminAuthGuard)
export class AdminTagsController {
  constructor(private readonly adminTagsService: AdminTagsService) { }

  /**
   * @description 태그 생성
   * @param userNo 사용자 번호
   * @param createData 태그 생성 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminCreateTag(
    @Req() req: AuthRequest,
    @Body() createData: CreateTagDto
  ): Promise<ResponseDto<SelectTagInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminCreateTag(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_CREATE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 다수 태그 생성
   * @param req 요청 객체
   * @param createData 다수 태그 생성 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleCreateTag(
    @Req() req: AuthRequest,
    @Body() createData: CreateTagDto[]
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleCreateTag(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_CREATE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그 수정
   * @param req 요청 객체
   * @param updateData 태그 수정 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminUpdateTag(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateTagDto
  ): Promise<ResponseDto<SelectTagInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminUpdateTag(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_UPDATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_UPDATE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 다수 태그 수정
   * @param req 요청 객체
   * @param updateData 다수 태그 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleUpdateTag(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateTagDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleUpdateTag(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_UPDATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_UPDATE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그 삭제
   * @param req 요청 객체
   * @param deleteData 태그 삭제 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'DELETE',
  })
  async adminDeleteTag(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteTagDto
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminDeleteTag(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_DELETE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 다수 태그 삭제
   * @param req 요청 객체
   * @param deleteData 다수 태그 삭제 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteTag(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteTagDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleDeleteTag(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_DELETE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그 매핑 조회
   * @param req 요청 객체
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '/mapping',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagMapping(
    @Req() req: AuthRequest,
    @Body() searchData: SearchPstTagMpngDto
  ): Promise<ResponseDto<ListType<SelectPstTagMpngListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagMapping(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_MAPPING_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_MAPPING_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그 번호로 매핑 조회
   * @param req 요청 객체
   * @param tagNo 태그 번호
   * @param pstNo 포스트 번호
   */
  @Endpoint({
    endpoint: '/mapping/:pstNo/:tagNo',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagMappingByTagNo(
    @Req() req: AuthRequest,
    @Param('pstNo') pstNo: number,
    @Param('tagNo') tagNo: number
  ): Promise<ResponseDto<SelectPstTagMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagMappingByTagNo(tagNo, pstNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_MAPPING_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_MAPPING_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그 매핑 추가
   * @param req 요청 객체
   * @param createData 태그 매핑 추가 데이터
   */
  @Endpoint({
    endpoint: '/mapping',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminAddTagMapping(
    @Req() req: AuthRequest,
    @Body() createData: CreatePstTagMpngDto
  ): Promise<ResponseDto<SelectPstTagMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminAddTagMapping(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_MAPPING_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_MAPPING_CREATE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 다수 태그 매핑 추가
   * @param req 요청 객체
   * @param createData 다수 태그 매핑 추가 데이터
   */
  @Endpoint({
    endpoint: '/mapping/multiple',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleAddTagMapping(
    @Req() req: AuthRequest,
    @Body() createData: CreatePstTagMpngDto[]
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleAddTagMapping(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_MAPPING_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_MAPPING_CREATE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그 매핑 삭제
   * @param req 요청 객체
   * @param deleteData 태그 매핑 삭제 데이터
   */
  @Endpoint({
    endpoint: '/mapping',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminDeleteTagMapping(
    @Req() req: AuthRequest,
    @Body() deleteData: DeletePstTagMpngDto
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminDeleteTagMapping(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_MAPPING_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_MAPPING_DELETE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 다수 태그 매핑 삭제
   * @param req 요청 객체
   * @param deleteData 다수 태그 매핑 삭제 데이터
   */
  @Endpoint({
    endpoint: '/mapping/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteTagMapping(
    @Req() req: AuthRequest,
    @Body() deleteData: DeletePstTagMpngDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleDeleteTagMapping(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_TAG_MAPPING_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_TAG_MAPPING_DELETE_SUCCESS',
      result.data
    );
  }
}
