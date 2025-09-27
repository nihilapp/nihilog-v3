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
import { UpdateUserDto, UserInfoDto } from '@/dto/user.dto';
import { createError } from '@/utils';
import { createExampleUser } from '@/utils/createExampleUser';
import { AdminAuthGuard } from '@auth/admin-auth.guard';

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
          [
            false,
            'SUCCESS',
            'PROFILE_UPDATE_SUCCESS',
            createExampleUser(),
          ],
        ],
        [
          '사용자를 찾을 수 없음',
          [
            true,
            'NOT_FOUND',
            'USER_NOT_FOUND',
            null,
          ],
        ],
        [
          '사용자명 중복',
          [
            true,
            'CONFLICT',
            'USER_NAME_EXISTS',
            null,
          ],
        ],
      ],
    },
  })
  async updateProfile(
    @Req() req: AuthRequest,
    @Body() updateProfileData: UpdateUserDto
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const authUser = req.user;

    if (!authUser) {
      return createError('UNAUTHORIZED', 'UNAUTHORIZED');
    }

    return this.adminService.updateProfile(authUser, updateProfileData);
  }
}
