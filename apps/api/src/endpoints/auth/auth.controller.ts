import {
  Body,
  Controller,
  Req,
  Res
} from '@nestjs/common';
import {
  ApiTags
} from '@nestjs/swagger';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest } from '@/dto';
import { ChangePasswordDto, SignInDto } from '@/dto/auth.dto';
import { ResponseDto } from '@/dto/response.dto';
import { UserInfoDto } from '@/dto/user.dto';
import { createError, createResponse } from '@/utils';
import { createExampleUser } from '@/utils/createExampleUser';
import { clearCookie, setCookie } from '@/utils/setCookie';

import { AuthService } from './auth.service';
import { JwtPayload } from './jwt.strategy';

@ApiTags('auth')
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
    summary: '로그인',
    description: '사용자 인증을 처리하고 JWT 토큰을 발급합니다.',
    options: {
      throttle: [ 5, 60000, ],
      serialize: true,
      body: [ '로그인 DTO', SignInDto, ],
      responses: [
        [
          '로그인 성공',
          [ false, 'SUCCESS', 'SIGN_IN_SUCCESS', createExampleUser(), ],
        ],
        [
          '인증 실패',
          [ true, 'UNAUTHORIZED', 'INVALID_CREDENTIALS', null, ],
        ],
      ],
    },
  })
  async signIn(
    @Body() signInData: SignInDto,
    @Res({ passthrough: true, }) res: FastifyReply,
    @Req() req: FastifyRequest
  ): Promise<ResponseDto<UserInfoDto>> {
    const result = await this.authService.signIn(signInData);

    // 에러 응답인 경우 그대로 반환
    if ('error' in result && result.error) {
      return result;
    }

    // 성공 응답인 경우 쿠키 설정
    const { user, acsToken, reshToken, accessTokenExpiresAt, } = result as {
      user: UserInfoDto;
      acsToken: string;
      reshToken: string;
      accessTokenExpiresAt: number;
    };

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
        'SIGN_IN_SUCCESS',
        {
          ...user,
          acsToken: acsToken,
        }
      );
    }

    return createResponse(
      'SUCCESS',
      'SIGN_IN_SUCCESS',
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
    summary: '토큰 재발급',
    description: '리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.',
    options: {
      throttle: [ 5, 60000, ],
      serialize: true,
      roles: [ 'USER', 'ADMIN', ],
      responses: [
        [
          '토큰 재발급 성공',
          [ false, 'SUCCESS', 'TOKEN_REFRESH_SUCCESS', createExampleUser(), ],
        ],
        [
          '리프레시 토큰이 유효하지 않음',
          [ true, 'UNAUTHORIZED', 'INVALID_REFRESH_TOKEN', null, ],
        ],
      ],
    },
  })
  async refreshToken(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true, }) res: FastifyReply
  ): Promise<ResponseDto<UserInfoDto>> {
    const refreshToken = req.cookies[ 'refreshToken' ];

    if (!refreshToken) {
      return createError('UNAUTHORIZED', 'REFRESH_TOKEN_NOT_FOUND');
    }

    const result = await this.authService.refresh(refreshToken);

    // 에러 응답인 경우 그대로 반환
    if ('error' in result && result.error) {
      return result;
    }

    // 성공 응답인 경우 쿠키 설정
    const { user, acsToken, reshToken, accessTokenExpiresAt, } = result as {
      user: UserInfoDto;
      acsToken: string;
      reshToken: string;
      accessTokenExpiresAt: number;
    };

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
      'TOKEN_REFRESH_SUCCESS',
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
    summary: '로그아웃',
    description: '사용자 로그아웃을 처리하고 모든 인증 정보를 제거합니다.',
    options: {
      responses: [
        [
          '로그아웃 성공',
          [ false, 'SUCCESS', 'SIGN_OUT_SUCCESS', null, ],
        ],
        [
          '로그아웃 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'SIGN_OUT_ERROR', null, ],
        ],
      ],
    },
  })
  async signOut(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true, }) res: FastifyReply
  ): Promise<ResponseDto<null>> {
    // 쿠키에서 accessToken을 가져와서 서비스에 전달
    const accessToken = req.cookies['accessToken'];

    // 서비스에서 로그아웃 처리
    const result = await this.authService.signOut(accessToken);

    // 쿠키 정리
    clearCookie(res, 'accessToken');
    clearCookie(res, 'refreshToken');
    clearCookie(res, 'accessTokenExpiresAt');

    return result;
  }

  /**
   * @description 현재 세션 조회
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/session',
    method: 'GET',
    summary: '세션 조회',
    description: '현재 로그인된 사용자의 세션 정보를 조회합니다.',
    options: {
      serialize: true,
      roles: [ 'USER', 'ADMIN', ],
      authGuard: 'JWT-auth',
      responses: [
        [
          '세션 조회 성공',
          [ false, 'SUCCESS', 'SESSION_GET_SUCCESS', createExampleUser(), ],
        ],
        [
          '세션 조회 실패',
          [ true, 'UNAUTHORIZED', 'SESSION_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async getSession(@Req() req: AuthRequest): Promise<ResponseDto<UserInfoDto>> {
    const authUser = req.user;

    if (!authUser) {
      return createError('UNAUTHORIZED', 'UNAUTHORIZED');
    }

    return this.authService.session(authUser.userNo);
  }

  /**
   * @description 비밀번호 변경
   * @param req 요청 객체
   * @param changePasswordData 비밀번호 변경 정보
   */
  @Endpoint({
    endpoint: '/change-password',
    method: 'POST',
    summary: '비밀번호 변경',
    description: '현재 로그인된 사용자의 비밀번호를 변경합니다.',
    options: {
      serialize: true,
      roles: [ 'USER', 'ADMIN', ],
      authGuard: 'JWT-auth',
      body: [ '비밀번호 변경 DTO', ChangePasswordDto, ],
      responses: [
        [
          '비밀번호 변경 성공',
          [ false, 'SUCCESS', 'PASSWORD_CHANGE_SUCCESS', createExampleUser(), ],
        ],
        [
          '비밀번호 변경 실패',
          [ true, 'UNAUTHORIZED', 'PASSWORD_CHANGE_ERROR', null, ],
        ],
      ],
    },
  })
  async changePassword(
    @Req() req: FastifyRequest & { user: JwtPayload | null },
    @Body() changePasswordData: ChangePasswordDto
  ): Promise<ResponseDto<UserInfoDto>> {
    const authUser = req.user;

    if (!authUser) {
      return createError('UNAUTHORIZED', 'UNAUTHORIZED');
    }
    return this.authService.changePassword(authUser.userNo, changePasswordData);
  }
}
