import {
  Body,
  Controller,
  Req,
  UseGuards
} from '@nestjs/common';

import { MESSAGE } from '@nihilog/code';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { SelectUserInfoType } from '@nihilog/schemas';
import { createError, createResponse, removeSensitiveInfo } from '@/utils';

import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * @description 관리자 프로필 수정
   * @param req 요청 객체
   * @param updateProfileData 프로필 수정 정보
   */
  @Endpoint({
    endpoint: 'profile',
    method: 'PATCH',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminUpdateProfile(
    @Req() req: AuthRequest,
    @Body() updateProfileData: UpdateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const authUser = req.user;

    if (!authUser) {
      return createError(
        'UNAUTHORIZED',
        'UNAUTHORIZED'
      );
    }

    const result = await this.adminService.updateProfile(
      authUser,
      updateProfileData
    );

    if (!result?.success) {
      // 업데이트된 필드에 따라 적절한 기본 에러 메시지 선택
      const defaultErrorMessage = updateProfileData.proflImg !== undefined && updateProfileData.proflImg !== null
        ? MESSAGE.USER.USER.IMAGE_CHANGE_ERROR
        : MESSAGE.USER.USER.UPDATE_ERROR;

      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || defaultErrorMessage
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    // 업데이트된 필드에 따라 적절한 메시지 선택
    const successMessage = updateProfileData.proflImg !== undefined && updateProfileData.proflImg !== null
      ? MESSAGE.USER.USER.IMAGE_CHANGE_SUCCESS
      : MESSAGE.USER.USER.UPDATE_SUCCESS;

    return createResponse(
      'SUCCESS',
      successMessage,
      userToReturn
    );
  }
}
