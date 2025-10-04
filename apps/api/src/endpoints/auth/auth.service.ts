import {
  Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import bcrypt from 'bcrypt';
import cloneDeep from 'lodash/cloneDeep';

import { ChangePasswordDto, CreateUserDto, SignInDto } from '@/dto/auth.dto';
import { type SignInResponseDto } from '@/dto/response.dto';
import { AdminUserService } from '@/endpoints/admin/users/admin-users.service';
import { UserRoleType } from '@/endpoints/prisma/schemas/user.schema';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { timeToString } from '@/utils/timeHelper';

// JWT Payload 타입 정의
interface JwtPayload {
  userNo: number;
  emlAddr: string;
  userNm: string;
  userRole: UserRoleType;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AdminUserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
    private readonly env: ConfigService
  ) { }

  /**
   * @description 현재 세션 조회
   * @param userNo 사용자 번호
   */
  async session(userNo: number): Promise<SelectUserInfoType | null> {
    const user = await this.userRepository.getUserByNo(userNo);

    if (!user) {
      return null;
    }

    const userToReturn = cloneDeep(user);
    userToReturn.encptPswd = null;
    userToReturn.reshToken = null;

    return userToReturn;
  }

  /**
   * @description 사용자 로그인
   * @param signInData 로그인 정보
   */
  async signIn(signInData: SignInDto): Promise<SignInResponseDto | null> {
    const { emlAddr, password, } = signInData;

    // 사용자 조회
    const user = await this.userRepository.getUserByEmail(emlAddr);

    if (!user) {
      return null;
    }

    // 비밀번호 검증
    const isPasswordMatching = await bcrypt.compare(password, user.encptPswd);

    if (!isPasswordMatching) {
      return null;
    }

    // JWT 페이로드 생성
    const payload: JwtPayload = {
      userNo: user.userNo,
      emlAddr: user.emlAddr,
      userNm: user.userNm,
      userRole: user.userRole,
    };

    // 토큰 생성
    const [ acsToken, reshToken, ] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.env.get('jwt.access.secret'),
        expiresIn: this.env.get('jwt.access.expiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.env.get('jwt.refresh.secret'),
        expiresIn: this.env.get('jwt.refresh.expiresIn'),
      }),
    ]);

    // 리프레시 토큰과 마지막 로그인 시간 업데이트
    await this.userRepository.updateUser(
      user.userNo,
      user.userNo,
      {
        reshToken,
        lastLgnDt: timeToString(),
      }
    );

    // AccessToken 만료시간 계산
    const accessTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000).getTime();

    // 응답용 사용자 데이터 준비
    const userToReturn = cloneDeep(user);
    userToReturn.encptPswd = null;
    userToReturn.reshToken = null;

    return {
      user: userToReturn,
      acsToken,
      reshToken,
      accessTokenExpiresAt,
    };
  }

  /**
   * @description 액세스 토큰 재발급
   * @param token 리프레시 토큰
   */
  async refresh(token: string): Promise<SignInResponseDto | null> {
    if (!token) {
      return null;
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.env.get('jwt.refresh.secret'),
      });

      const user = await this.usersService.getUserByNo(payload.userNo);

      if (!user || user.reshToken !== token) {
        return null;
      }

      const newPayload: JwtPayload = {
        userNo: user.userNo,
        emlAddr: user.emlAddr,
        userNm: user.userNm,
        userRole: user.userRole,
      };
      const [ newAcsToken, newReshToken, ] = await Promise.all([
        this.jwtService.signAsync(newPayload, {
          secret: this.env.get('jwt.access.secret'),
          expiresIn: this.env.get('jwt.access.expiresIn'),
        }),
        this.jwtService.signAsync(newPayload, {
          secret: this.env.get('jwt.refresh.secret'),
          expiresIn: this.env.get('jwt.refresh.expiresIn'),
        }),
      ]);

      await this.userRepository.updateUser(
        user.userNo,
        user.userNo,
        { reshToken: newReshToken, }
      );

      // AccessToken 만료시간 계산
      const accessTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000).getTime();

      const userToReturn = cloneDeep(user);
      userToReturn.encptPswd = null;
      userToReturn.reshToken = null;

      return {
        user: userToReturn,
        acsToken: newAcsToken,
        reshToken: newReshToken,
        accessTokenExpiresAt,
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 일반 사용자 회원가입
   * @param createUserData 회원가입 정보
   */
  async signUp(user: null, createUserData: CreateUserDto): Promise<SelectUserInfoType | null> {
    const { emlAddr, password, } = createUserData;

    // 이메일 중복 체크
    const existingUser = await this.userRepository.getUserByEmail(emlAddr);
    if (existingUser) {
      return null;
    }

    // 비밀번호 암호화
    const encptPswd = await bcrypt.hash(password, 10);

    // 사용자 생성
    return this.userRepository.createUser(
      null,
      createUserData,
      encptPswd
    );
  }

  /**
   * @description 비밀번호 변경
   * @param userNo 사용자 번호
   * @param changePasswordData 비밀번호 변경 정보
   */
  async changePassword(
    userNo: number,
    changePasswordData: ChangePasswordDto
  ): Promise<SelectUserInfoType | null> {
    const { currentPassword, newPassword, } = changePasswordData;

    const user = await this.userRepository.getUserByNo(userNo);

    if (!user) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(
      currentPassword,
      user.encptPswd
    );

    if (!isPasswordMatching) {
      return null;
    }

    const newEncptPswd = await bcrypt.hash(newPassword, 10);

    // 하나의 쿼리로 업데이트 + 조회
    const updatedUser = await this.userRepository.updateUser(
      userNo,
      userNo,
      { encptPswd: newEncptPswd, }
    );

    if (!updatedUser) {
      return null;
    }

    // 민감정보 제거
    const userToReturn = cloneDeep(updatedUser);
    userToReturn.encptPswd = null;
    userToReturn.reshToken = null;

    return userToReturn;
  }

  /**
   * @description 사용자 로그아웃
   * @param accessToken 액세스 토큰
   */
  async signOut(accessToken: string): Promise<boolean> {
    try {
      // JWT 토큰에서 사용자 정보 추출
      const decoded = await this.extractUserFromToken(accessToken);

      if (decoded?.userNo) {
        // 리프레시 토큰 삭제
        await this.userRepository.updateUser(
          decoded.userNo,
          decoded.userNo,
          { reshToken: null, }
        );
      }

      return true;
    }
    catch {
      // 로그아웃은 토큰이 유효하지 않아도 성공으로 처리
      return true;
    }
  }

  /**
   * @description JWT 토큰에서 사용자 정보 추출
   * @param token JWT 토큰
   */
  async extractUserFromToken(token: string): Promise<JwtPayload | null> {
    try {
      const payload = await this.jwtService
        .verifyAsync<JwtPayload>(token, {
          secret: this.env.get('jwt.access.secret'),
        });
      return payload;
    }
    catch {
      return null;
    }
  }
}
