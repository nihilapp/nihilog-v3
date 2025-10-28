import {
  Body,
  Controller,
  Req,
  Res
} from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import { ChangePasswordDto, SignInDto } from '@/dto/auth.dto';
import { ResponseDto } from '@/dto/response.dto';
import { UserInfoDto } from '@/dto/user.dto';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { createError, createResponse } from '@/utils';
import { clearCookie, setCookie } from '@/utils/setCookie';

import { AuthService } from './auth.service';
import { JwtPayload } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * @description 사용자 로그인
   * @param signInData 로그인 정보
   * @param res 응답 객체
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/signin',
    method: 'POST',
    options: {
      throttle: [
        5,
        60000,
      ],
      serialize: true,
    },
  })
  async signIn(
    @Body() signInData: SignInDto,
    @Res({ passthrough: true, }) res: FastifyReply,
    @Req() req: FastifyRequest
  ): Promise<ResponseDto<SelectUserInfoType>> {
    const result = await this.authService.signIn(signInData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'UNAUTHORIZED',
        result?.error?.message || MESSAGE.AUTH.INVALID_CREDENTIALS
      );
    }

    // 성공 응답인 경우 쿠키 설정
    const { user, acsToken, reshToken, accessTokenExpiresAt, } = result.data;

    setCookie(
      res,
      'accessToken',
      acsToken,
      60
    );
    setCookie(
      res,
      'refreshToken',
      reshToken,
      30 * 24 * 60
    );
    setCookie(
      res,
      'accessTokenExpiresAt',
      accessTokenExpiresAt.toString(),
      0,
      false
    );

    // Swagger에서 테스트를 위한 로그인 요청인 경우 토큰을 응답에 포함
    if (req.headers[ 'x-swagger-login' ] === 'true') {
      return createResponse(
        'SUCCESS',
        MESSAGE.AUTH.SIGN_IN_SUCCESS,
        {
          ...user,
          acsToken: acsToken,
        }
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.AUTH.SIGN_IN_SUCCESS,
      user
    );
  }

  /**
   * @description 액세스 토큰 재발급
   * @param req 요청 객체
   * @param res 응답 객체
   */
  @Endpoint({
    endpoint: '/refresh',
    method: 'POST',
    options: {
      throttle: [
        5,
        60000,
      ],
      serialize: true,
    },
  })
  async refreshToken(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true, }) res: FastifyReply
  ): Promise<ResponseDto<SelectUserInfoType>> {
    const refreshToken = req.cookies[ 'refreshToken' ];

    if (!refreshToken) {
      return createError(
        'UNAUTHORIZED',
        MESSAGE.AUTH.REFRESH_TOKEN_NOT_FOUND
      );
    }

    const result = await this.authService.refresh(refreshToken);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'UNAUTHORIZED',
        result?.error?.message || MESSAGE.AUTH.INVALID_REFRESH_TOKEN
      );
    }

    // 성공 응답인 경우 쿠키 설정
    const { user, acsToken, reshToken, accessTokenExpiresAt, } = result.data;

    setCookie(
      res,
      'accessToken',
      acsToken,
      60
    );

    setCookie(
      res,
      'refreshToken',
      reshToken,
      30 * 24 * 60
    );

    setCookie(
      res,
      'accessTokenExpiresAt',
      accessTokenExpiresAt.toString(),
      0,
      false
    );

    return createResponse(
      'SUCCESS',
      MESSAGE.AUTH.TOKEN_REFRESH_SUCCESS,
      user
    );
  }

  /**
   * @description 사용자 로그아웃
   * @param req 요청 객체
   * @param res 응답 객체
   */
  @Endpoint({
    endpoint: '/signout',
    method: 'POST',
  })
  async signOut(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true, }) res: FastifyReply
  ): Promise<ResponseDto<null>> {
    // 쿠키에서 accessToken을 가져와서 서비스에 전달
    const accessToken = req.cookies['accessToken'];

    // 서비스에서 로그아웃 처리
    const result = await this.authService.signOut(accessToken);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.AUTH.SIGN_OUT_ERROR
      );
    }

    // 쿠키 정리
    clearCookie(
      res,
      'accessToken'
    );
    clearCookie(
      res,
      'refreshToken'
    );
    clearCookie(
      res,
      'accessTokenExpiresAt'
    );

    return createResponse(
      'SUCCESS',
      MESSAGE.AUTH.SIGN_OUT_SUCCESS,
      null
    );
  }

  /**
   * @description 현재 세션 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/session',
    method: 'GET',
    options: {
      serialize: true,
      roles: [
        'USER',
        'ADMIN',
      ],
      authGuard: 'JWT-auth',
    },
  })
  async getSession(@Req() req: AuthRequest): Promise<ResponseDto<UserInfoDto>> {
    const authUser = req.user;

    if (!authUser) {
      return createError(
        'UNAUTHORIZED',
        MESSAGE.AUTH.UNAUTHORIZED
      );
    }

    const result = await this.authService.session(authUser.userNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'UNAUTHORIZED',
        result?.error?.message || MESSAGE.AUTH.SESSION_NOT_FOUND
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.AUTH.SESSION_GET_SUCCESS,
      result.data
    );
  }

  /**
   * @description 비밀번호 변경
   * @param req 요청 객체
   * @param changePasswordData 비밀번호 변경 정보
   */
  @Endpoint({
    endpoint: '/password',
    method: 'PUT',
    options: {
      serialize: true,
      roles: [
        'USER',
        'ADMIN',
      ],
      authGuard: 'JWT-auth',
    },
  })
  async changePassword(
    @Req() req: FastifyRequest & { user: JwtPayload | null },
    @Body() changePasswordData: ChangePasswordDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    const authUser = req.user;

    if (!authUser) {
      return createError(
        'UNAUTHORIZED',
        MESSAGE.AUTH.UNAUTHORIZED
      );
    }

    const result = await this.authService.changePassword(
      authUser.userNo,
      changePasswordData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'UNAUTHORIZED',
        result?.error?.message || MESSAGE.AUTH.PASSWORD_CHANGE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.AUTH.PASSWORD_CHANGE_SUCCESS,
      result.data
    );
  }
}
