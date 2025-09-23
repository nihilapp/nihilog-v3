import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import cloneDeep from 'lodash/cloneDeep';

import { MESSAGE_CODE } from '@/code/message.code';
import { RESPONSE_CODE } from '@/code/response.code';
import { ResponseDto } from '@/dto/response.dto';
import { UpdateUserDto, UserInfoDto } from '@/dto/user.dto';
import { createError, createResponse } from '@/utils';
import { createExampleUser } from '@/utils/createExampleUser';
import { AdminAuthGuard } from '@auth/admin-auth.guard';
import { JwtPayload } from '@auth/jwt.strategy';
import { UserRepository } from '@repositories/user.repository';

import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userRepository: UserRepository
  ) {}

  /**
   * @description 관리자 프로필 수정
   * @param req 요청 객체
   * @param updateProfileData 프로필 수정 정보
   */
  @ApiOperation({
    summary: '✏️ 프로필 정보 수정',
    description: '현재 로그인된 관리자의 프로필을 업데이트합니다.',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: '프로필 수정 DTO',
  })
  @ApiOkResponse({
    description: '프로필 수정 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.PROFILE_UPDATE_SUCCESS,
        data: createExampleUser(),
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '잘못된 요청 데이터',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.BAD_REQUEST,
        message: MESSAGE_CODE.INVALID_REQUEST,
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '사용자를 찾을 수 없음',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.NOT_FOUND,
        message: MESSAGE_CODE.USER_NOT_FOUND,
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '사용자명 중복',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.CONFLICT,
        message: MESSAGE_CODE.USER_NAME_EXISTS,
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '프로필 수정 실패',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: MESSAGE_CODE.PROFILE_UPDATE_ERROR,
        data: null,
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Put('profile')
  async updateProfile(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Body() updateProfileData: UpdateUserDto
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const authUser = req.user;

    if (!authUser) {
      return createError('UNAUTHORIZED', 'UNAUTHORIZED');
    }

    try {
      const { userNm, proflImg, userBiogp, } = updateProfileData;

      // 현재 사용자 정보 조회
      const currentUser = await this.userRepository.findUser({ userNo: authUser.userNo, });

      if (!currentUser) {
        return createError('NOT_FOUND', 'USER_NOT_FOUND');
      }

      // 사용자명 변경 시 중복 확인
      if (userNm) {
        const existingUser = await this.userRepository.findUser({ userNm, });

        if (existingUser && existingUser.userNo !== authUser.userNo) {
          return createError('CONFLICT', 'USER_NAME_EXISTS');
        }
      }

      // 프로필 업데이트
      const updatedUser = await this.userRepository.updateUser(authUser.userNo, {
        userNm,
        proflImg,
        userBiogp,
      });

      const userToReturn = cloneDeep(updatedUser);
      userToReturn.encptPswd = undefined;
      userToReturn.reshToken = undefined;

      return createResponse('SUCCESS', 'PROFILE_UPDATE_SUCCESS', userToReturn);
    }
    catch {
      return createError('INTERNAL_SERVER_ERROR', 'PROFILE_UPDATE_ERROR');
    }
  }
}
