import {
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userRoleSchema } from '@nihilog/schemas';

import { MESSAGE } from '@nihilog/code';
import { ResponseDto } from '@/dto/response.dto';
import { createError } from '@/utils';

import { JwtPayload } from './jwt.strategy';

interface RequestWithUser {
  user?: JwtPayload;
  errorResponse?: ResponseDto<null>;
}

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    try {
      const result = await super.canActivate(context);

      if (!result) {
        // JWT 검증 실패 (토큰 없음, 무효, 만료 등)
        request.errorResponse = createError(
          'UNAUTHORIZED',
          MESSAGE.AUTH.INVALID_TOKEN
        );
        return true; // Guard를 통과시키되 에러 응답을 설정
      }

      const user = request.user;

      if (!user) {
        // 사용자 정보 없음
        request.errorResponse = createError(
          'UNAUTHORIZED',
          MESSAGE.AUTH.UNAUTHORIZED
        );
        return true;
      }

      if (user.userRole !== userRoleSchema.enum.ADMIN) {
        // 관리자 권한 없음
        request.errorResponse = createError(
          'FORBIDDEN',
          MESSAGE.AUTH.ADMIN_ONLY
        );
        return true; // Guard를 통과시키되 에러 응답을 설정
      }

      return true;
    }
    catch {
      request.errorResponse = createError(
        'UNAUTHORIZED',
        MESSAGE.AUTH.INVALID_TOKEN
      );
      return true; // Guard를 통과시키되 에러 응답을 설정
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest<TUser = JwtPayload>(err: unknown, user: TUser, info: unknown): TUser {
    // 에러를 던지지 않고 user만 반환
    // canActivate에서 에러 처리를 담당
    return user;
  }
}
