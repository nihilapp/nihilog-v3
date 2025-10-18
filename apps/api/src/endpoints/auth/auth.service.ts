import {
  Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import bcrypt from 'bcrypt';
import cloneDeep from 'lodash/cloneDeep';

import { MESSAGE } from '@/code/messages';
import { ChangePasswordDto, SignInDto } from '@/dto/auth.dto';
import { UserRoleType } from '@/endpoints/prisma/schemas/user.schema';
import type { RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

// JWT Payload 타입 정의
interface JwtPayload {
  userNo: number;
  emlAddr: string;
  userNm: string;
  userRole: UserRoleType;
}

interface SignInResponseType {
  user: SelectUserInfoType;
  acsToken: string;
  reshToken: string;
  accessTokenExpiresAt: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
    private readonly env: ConfigService
  ) { }

  /**
   * @description 현재 세션 조회
   * @param userNo 사용자 번호
   */
  async session(userNo: number): Promise<RepoResponseType<SelectUserInfoType> | null> {
    const result = await this.userRepository.getUserByNo(userNo);

    if (!result?.success) {
      return prismaResponse(
        false,
        null,
        'UNAUTHORIZED',
        MESSAGE.AUTH.NOT_FOUND
      );
    }

    const userToReturn = cloneDeep(result.data);
    userToReturn.encptPswd = null;
    userToReturn.reshToken = null;

    return prismaResponse(
      true,
      userToReturn
    );
  }

  /**
   * @description 사용자 로그인
   * @param signInData 로그인 정보
   */
  async signIn(signInData: SignInDto): Promise<RepoResponseType<SignInResponseType> | null> {
    const { emlAddr, password, } = signInData;

    // 사용자 조회
    const userResult = await this.userRepository.getUserByEmail(emlAddr);

    if (!userResult?.success || !userResult.data) {
      return prismaResponse(
        false,
        null,
        'UNAUTHORIZED',
        MESSAGE.AUTH.INVALID_CREDENTIALS
      );
    }

    const user = userResult.data;

    // 비밀번호 검증
    const isPasswordMatching = await bcrypt.compare(
      password,
      user.encptPswd
    );

    if (!isPasswordMatching) {
      return prismaResponse(
        false,
        null,
        'UNAUTHORIZED',
        MESSAGE.AUTH.INVALID_CREDENTIALS
      );
    }

    // JWT 페이로드 생성
    const payload: JwtPayload = {
      userNo: user.userNo,
      emlAddr: user.emlAddr,
      userNm: user.userNm,
      userRole: user.userRole,
    };

    // 토큰 생성
    const [
      acsToken,
      reshToken,
    ] = await Promise.all([
      this.jwtService.signAsync(
        payload,
        {
          secret: this.env.get('jwt.access.secret'),
          expiresIn: this.env.get('jwt.access.expiresIn'),
        }
      ),
      this.jwtService.signAsync(
        payload,
        {
          secret: this.env.get('jwt.refresh.secret'),
          expiresIn: this.env.get('jwt.refresh.expiresIn'),
        }
      ),
    ]);

    // 리프레시 토큰과 마지막 로그인 시간 업데이트
    const updateResult = await this.userRepository.updateUser(
      user.userNo,
      user.userNo,
      {
        reshToken,
        lastLgnDt: timeToString(),
      }
    );

    if (!updateResult?.success) {
      return prismaResponse(
        false,
        null,
        'INTERNAL_SERVER_ERROR',
        MESSAGE.AUTH.SIGN_IN_ERROR
      );
    }

    // AccessToken 만료시간 계산
    const accessTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000).getTime();

    // 응답용 사용자 데이터 준비
    const userToReturn = cloneDeep(user);
    userToReturn.encptPswd = null;
    userToReturn.reshToken = null;

    return prismaResponse(
      true,
      {
        user: userToReturn,
        acsToken,
        reshToken,
        accessTokenExpiresAt,
      }
    );
  }

  /**
   * @description 액세스 토큰 재발급
   * @param token 리프레시 토큰
   */
  async refresh(token: string): Promise<RepoResponseType<SignInResponseType> | null> {
    if (!token) {
      return prismaResponse(
        false,
        null,
        'UNAUTHORIZED',
        MESSAGE.AUTH.REFRESH_TOKEN_NOT_FOUND
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: this.env.get('jwt.refresh.secret'),
        }
      );

      const userResult = await this.userRepository.getUserByNo(payload.userNo);

      if (!userResult?.success || userResult.data.reshToken !== token) {
        return prismaResponse(
          false,
          null,
          'UNAUTHORIZED',
          MESSAGE.AUTH.INVALID_REFRESH_TOKEN
        );
      }

      const user = userResult.data;
      const newPayload: JwtPayload = {
        userNo: user.userNo,
        emlAddr: user.emlAddr,
        userNm: user.userNm,
        userRole: user.userRole,
      };
      const [
        newAcsToken,
        newReshToken,
      ] = await Promise.all([
        this.jwtService.signAsync(
          newPayload,
          {
            secret: this.env.get('jwt.access.secret'),
            expiresIn: this.env.get('jwt.access.expiresIn'),
          }
        ),
        this.jwtService.signAsync(
          newPayload,
          {
            secret: this.env.get('jwt.refresh.secret'),
            expiresIn: this.env.get('jwt.refresh.expiresIn'),
          }
        ),
      ]);

      const updateResult = await this.userRepository.updateUser(
        user.userNo,
        user.userNo,
        { reshToken: newReshToken, }
      );

      if (!updateResult?.success) {
        return prismaResponse(
          false,
          null,
          'INTERNAL_SERVER_ERROR',
          MESSAGE.AUTH.TOKEN_REFRESH_ERROR
        );
      }

      // AccessToken 만료시간 계산
      const accessTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000).getTime();

      const userToReturn = cloneDeep(user);
      userToReturn.encptPswd = null;
      userToReturn.reshToken = null;

      return prismaResponse(
        true,
        {
          user: userToReturn,
          acsToken: newAcsToken,
          reshToken: newReshToken,
          accessTokenExpiresAt,
        }
      );
    }
    catch {
      return prismaResponse(
        false,
        null,
        'UNAUTHORIZED',
        MESSAGE.AUTH.INVALID_REFRESH_TOKEN
      );
    }
  }

  /**
   * @description 비밀번호 변경
   * @param userNo 사용자 번호
   * @param changePasswordData 비밀번호 변경 정보
   */
  async changePassword(
    userNo: number,
    changePasswordData: ChangePasswordDto
  ): Promise<RepoResponseType<SelectUserInfoType> | null> {
    const { currentPassword, newPassword, } = changePasswordData;

    const userResult = await this.userRepository.getUserByNo(userNo);

    if (!userResult?.success) {
      return userResult;
    }

    const user = userResult.data;
    const isPasswordMatching = await bcrypt.compare(
      currentPassword,
      user.encptPswd
    );

    if (!isPasswordMatching) {
      return prismaResponse(
        false,
        null,
        'UNAUTHORIZED',
        MESSAGE.AUTH.INVALID_CREDENTIALS
      );
    }

    const newEncptPswd = await bcrypt.hash(
      newPassword,
      10
    );

    // 하나의 쿼리로 업데이트 + 조회
    const updatedUserResult = await this.userRepository.updateUser(
      userNo,
      userNo,
      { encptPswd: newEncptPswd, }
    );

    if (!updatedUserResult?.success) {
      return updatedUserResult;
    }

    // 민감정보 제거
    const userToReturn = cloneDeep(updatedUserResult.data);
    userToReturn.encptPswd = null;
    userToReturn.reshToken = null;

    return prismaResponse(
      true,
      userToReturn
    );
  }

  /**
   * @description 사용자 로그아웃
   * @param accessToken 액세스 토큰
   */
  async signOut(accessToken: string): Promise<RepoResponseType<boolean> | null> {
    try {
      // JWT 토큰에서 사용자 정보 추출
      const decoded = await this.extractUserFromToken(accessToken);

      if (decoded?.userNo) {
        // 리프레시 토큰 삭제
        const updateResult = await this.userRepository.updateUser(
          decoded.userNo,
          decoded.userNo,
          { reshToken: null, }
        );

        if (!updateResult?.success) {
          return prismaResponse(
            false,
            null,
            'INTERNAL_SERVER_ERROR',
            MESSAGE.AUTH.SIGN_OUT_ERROR
          );
        }
      }

      return prismaResponse(
        true,
        true
      );
    }
    catch {
      // 로그아웃은 토큰이 유효하지 않아도 성공으로 처리
      return prismaResponse(
        true,
        true
      );
    }
  }

  /**
   * @description JWT 토큰에서 사용자 정보 추출
   * @param token JWT 토큰
   */
  async extractUserFromToken(token: string): Promise<JwtPayload | null> {
    try {
      const payload = await this.jwtService
        .verifyAsync<JwtPayload>(
          token,
          {
            secret: this.env.get('jwt.access.secret'),
          }
        );
      return payload;
    }
    catch {
      return null;
    }
  }
}
