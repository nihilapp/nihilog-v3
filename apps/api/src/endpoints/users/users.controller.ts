import {
  Controller,
  Delete,
  Get,
  Put,
  UseGuards,
  Body,
  Req,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOkResponse,
  ApiBody
} from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';

import { MESSAGE_CODE } from '@/code/message.code';
import { RESPONSE_CODE } from '@/code/response.code';
import { ResponseDto } from '@/dto/response.dto';
import { UserSubscriptionDto, UpdateSubscriptionDto } from '@/dto/subscription.dto';
import { UserInfoDto, UpdateUserDto } from '@/dto/user.dto';
import { JwtAuthGuard } from '@/endpoints/auth/jwt-auth.guard';
import { createError, createResponse } from '@/utils';
import { createExampleSubscription } from '@/utils/createExampleSubscription';
import { createExampleUser } from '@/utils/createExampleUser';
import { JwtPayload } from '@auth/jwt.strategy';
import type { UserService } from '@users/users.service';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiCookieAuth('accessToken')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get('profile')
  @ApiOperation({
    summary: '👤 내 프로필 조회',
    description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: '프로필 조회 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.USER_FETCH_SUCCESS,
        data: createExampleUser(),
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
  @HttpCode(HttpStatus.OK)
  async getProfile(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> }
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.getProfile(req.user);
  }

  @Put('profile')
  @ApiOperation({
    summary: '✏️ 내 프로필 수정',
    description: '현재 로그인한 사용자의 프로필 정보를 수정합니다.',
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
        message: MESSAGE_CODE.USER_UPDATE_SUCCESS,
        data: createExampleUser(),
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
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Body() updateData: UpdateUserDto
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.updateProfile(req.user, updateData);
  }

  @Delete('profile')
  @ApiOperation({
    summary: '🗑️ 회원 탈퇴',
    description: '현재 로그인한 사용자의 계정을 삭제(소프트 삭제)합니다.',
  })
  @ApiOkResponse({
    description: '회원 탈퇴 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.USER_DELETE_SUCCESS,
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
  @HttpCode(HttpStatus.OK)
  async deleteProfile(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> }
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.deleteProfile(req.user);
  }

  @Get('subscription')
  @ApiOperation({
    summary: '📧 이메일 구독 설정 조회',
    description: '현재 로그인한 사용자의 이메일 알림 및 구독 설정을 조회합니다.',
  })
  @ApiOkResponse({
    description: '구독 설정 조회 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.SUBSCRIPTION_FETCH_SUCCESS,
        data: createExampleSubscription(),
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '구독 설정을 찾을 수 없음',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.NOT_FOUND,
        message: MESSAGE_CODE.SUBSCRIPTION_NOT_FOUND,
        data: null,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async getSubscription(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> }
  ): Promise<ResponseDto<UserSubscriptionDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.getSubscription(req.user);
  }

  @Put('subscription')
  @ApiOperation({
    summary: '⚙️ 이메일 구독 설정 변경',
    description: '현재 로그인한 사용자의 이메일 알림 및 구독 설정을 변경합니다.',
  })
  @ApiBody({
    type: UpdateSubscriptionDto,
    description: '구독 설정 수정 DTO',
  })
  @ApiOkResponse({
    description: '구독 설정 변경 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.SUBSCRIPTION_UPDATE_SUCCESS,
        data: createExampleSubscription(),
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '구독 설정을 찾을 수 없음',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.NOT_FOUND,
        message: MESSAGE_CODE.SUBSCRIPTION_NOT_FOUND,
        data: null,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async updateSubscription(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Body() updateData: UpdateSubscriptionDto
  ): Promise<ResponseDto<UserSubscriptionDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return this.userService.updateSubscription(req.user, updateData);
  }
}
