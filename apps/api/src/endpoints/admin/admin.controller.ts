import {
  Body,
  Controller,
  Req,
  UseGuards
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
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
    method: 'PUT',
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
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.PROFILE.UPDATE_ERROR
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.PROFILE.UPDATE_SUCCESS,
      userToReturn
    );
  }
}
