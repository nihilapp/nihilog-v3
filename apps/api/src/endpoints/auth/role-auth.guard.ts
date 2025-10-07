import {
  ExecutionContext,
  Injectable,
  SetMetadata
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { MESSAGE } from '@/code/messages';
import { ResponseDto } from '@/dto/response.dto';
import { UserRoleType } from '@/endpoints/prisma/schemas/user.schema';
import { createError } from '@/utils';

import { JwtPayload } from './jwt.strategy';

interface RequestWithUser {
  user?: JwtPayload;
  errorResponse?: ResponseDto<null>;
}

// 롤 메타데이터 키
export const ROLES_KEY = 'roles';

// 롤 데코레이터
export const Roles = (...roles: UserRoleType[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RoleAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    try {
      // JWT 인증 먼저 수행
      const jwtResult = await super.canActivate(context);

      if (!jwtResult) {
        request.errorResponse = createError('UNAUTHORIZED', MESSAGE.AUTH.UNAUTHORIZED);
        return true; // Guard를 통과시키되 에러 응답을 설정
      }

      const user = request.user;

      if (!user) {
        request.errorResponse = createError('UNAUTHORIZED', MESSAGE.AUTH.UNAUTHORIZED);
        return true;
      }

      // 메타데이터에서 필요한 롤들 가져오기
      const requiredRoles = this.reflector.getAllAndOverride<UserRoleType[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      // 롤이 지정되지 않은 경우 통과
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      // 사용자의 롤이 필요한 롤 중 하나라도 포함되어 있는지 확인
      const hasRequiredRole = requiredRoles.includes(user.userRole);

      if (!hasRequiredRole) {
        request.errorResponse = createError('FORBIDDEN', MESSAGE.AUTH.FORBIDDEN);
        return true; // Guard를 통과시키되 에러 응답을 설정
      }

      return true;
    }
    catch {
      request.errorResponse = createError('UNAUTHORIZED', MESSAGE.AUTH.UNAUTHORIZED);
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
