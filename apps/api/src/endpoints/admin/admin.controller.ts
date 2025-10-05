import {
  Body,
  Controller,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { createError, createResponse, removeSensitiveInfo } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { AdminService } from './admin.service';

@ApiTags('admin')
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
    summary: '✏️ 프로필 정보 수정',
    description: '현재 로그인된 관리자의 프로필을 업데이트합니다.',
    options: {
      authGuard: 'JWT-auth',
      body: [ '프로필 수정 정보', UpdateUserDto, ],
      responses: [
        [
          '프로필 수정 성공',
          [ false, 'SUCCESS', 'PROFILE_UPDATE_SUCCESS', CreateExample.user('detail'), ],
        ],
        [
          '관리자를 찾을 수 없음 (Repository)',
          [ true, 'NOT_FOUND', 'ADMIN_NOT_FOUND', null, ],
        ],
        [
          '사용자명 중복 (Service)',
          [ true, 'CONFLICT', 'USER_NAME_EXISTS', null, ],
        ],
        [
          '프로필 업데이트 실패 (Repository)',
          [ true, 'INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR', null, ],
        ],
      ],
    },
  })
  async updateProfile(
    @Req() req: AuthRequest,
    @Body() updateProfileData: UpdateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const authUser = req.user;

    if (!authUser) {
      return createError('UNAUTHORIZED', 'UNAUTHORIZED');
    }

    const result = await this.adminService.updateProfile(authUser, updateProfileData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'PROFILE_UPDATE_ERROR'
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse('SUCCESS', 'PROFILE_UPDATE_SUCCESS', userToReturn);
  }
}
