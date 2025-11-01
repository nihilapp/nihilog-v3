import {
  Body,
  Controller,
  Req,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { AuthRequest, UpdateUserDto } from '@/dto';
import { CreateUserDto } from '@/dto/auth.dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import { ResponseDto } from '@/dto/response.dto';
import { SearchUserDto, DeleteMultipleUsersDto } from '@/dto/user.dto';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectUserInfoListItemType,
  SelectUserInfoType,
  AnalyzeUserStatItemType,
  ActiveUserAnalysisItemType,
  TopUsersByContributionItemType,
  TopUsersByPostCountItemType,
  TopUsersByCommentCountItemType,
  UserRoleDistributionItemType,
  UserStatusDistributionItemType,
  InactiveUsersListItemType,
  UserGrowthRateItemType,
  UserRetentionRateItemType
} from '@/endpoints/prisma/types/user.types';
import { createError, createResponse, removeSensitiveInfoFromListResponse, removeSensitiveInfo } from '@/utils';

import { AdminUserService } from './admin-users.service';

@Controller('admin/users')
export class AdminUserController {
  constructor(
    private readonly usersService: AdminUserService,
    private readonly configService: ConfigService
  ) { }

  // ========================================================
  // 사용자 통계 관련 엔드포인트
  // ========================================================

  /**
   * @description 사용자 분석 통계 (9개 지표 통합)
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/overview',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getAnalyzeUserData(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<AnalyzeUserStatItemType[]>> {
    const result = await this.usersService.getAnalyzeUserData(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.ANALYZE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.ANALYZE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 활성 사용자 분석
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/active-users',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getActiveUserAnalysis(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<ActiveUserAnalysisItemType[]>> {
    const result = await this.usersService.getActiveUserAnalysis(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.ACTIVE_USER_ANALYSIS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.ACTIVE_USER_ANALYSIS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 사용자별 기여도 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/top-contribution',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getTopUsersByContribution(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<TopUsersByContributionItemType[]>> {
    const result = await this.usersService.getTopUsersByContribution(
      analyzeStatData.limit || 10,
      analyzeStatData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.TOP_CONTRIBUTION_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.TOP_CONTRIBUTION_SUCCESS,
      result.data
    );
  }

  /**
   * @description 사용자별 포스트 작성 수 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/top-post-count',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getTopUsersByPostCount(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<TopUsersByPostCountItemType[]>> {
    const result = await this.usersService.getTopUsersByPostCount(
      analyzeStatData.limit || 10,
      analyzeStatData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.TOP_POST_COUNT_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.TOP_POST_COUNT_SUCCESS,
      result.data
    );
  }

  /**
   * @description 사용자별 댓글 작성 수 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/top-comment-count',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getTopUsersByCommentCount(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<TopUsersByCommentCountItemType[]>> {
    const result = await this.usersService.getTopUsersByCommentCount(
      analyzeStatData.limit || 10,
      analyzeStatData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.TOP_COMMENT_COUNT_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.TOP_COMMENT_COUNT_SUCCESS,
      result.data
    );
  }

  /**
   * @description 역할별 사용자 분포
   */
  @Endpoint({
    endpoint: '/analyze/role-distribution',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getUserRoleDistribution(): Promise<ResponseDto<UserRoleDistributionItemType[]>> {
    const result = await this.usersService.getUserRoleDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.ROLE_DISTRIBUTION_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.ROLE_DISTRIBUTION_SUCCESS,
      result.data
    );
  }

  /**
   * @description 상태별 사용자 분포
   */
  @Endpoint({
    endpoint: '/analyze/status-distribution',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getUserStatusDistribution(): Promise<ResponseDto<UserStatusDistributionItemType[]>> {
    const result = await this.usersService.getUserStatusDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.STATUS_DISTRIBUTION_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.STATUS_DISTRIBUTION_SUCCESS,
      result.data
    );
  }

  /**
   * @description 비활성 사용자 목록
   * @param daysThreshold 비활성 기준 일수
   */
  @Endpoint({
    endpoint: '/analyze/inactive-users',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getInactiveUsersList(@Query('daysThreshold') daysThreshold?: number): Promise<ResponseDto<InactiveUsersListItemType[]>> {
    // daysThreshold가 제공된 경우 Service에서 검증하므로 기본값만 설정
    const result = await this.usersService.getInactiveUsersList(daysThreshold || 30);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.INACTIVE_USERS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.INACTIVE_USERS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 사용자 성장률
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/growth-rate',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getUserGrowthRate(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<UserGrowthRateItemType[]>> {
    const result = await this.usersService.getUserGrowthRate(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.GROWTH_RATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.GROWTH_RATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 사용자 유지율
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/retention-rate',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async getUserRetentionRate(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<UserRetentionRateItemType[]>> {
    const result = await this.usersService.getUserRetentionRate(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.STATISTICS.RETENTION_RATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.STATISTICS.RETENTION_RATE_SUCCESS,
      result.data
    );
  }

  // ========================================================
  // 기존 관리자 사용자 관련 엔드포인트
  // ========================================================

  /**
   * @description 사용자 목록 검색
   * @param req 요청 객체
   * @param searchData 검색 조건
   */
  @Endpoint({
    endpoint: '',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserList(
    @Req() req: AuthRequest,
    @Query() searchData: SearchUserDto
  ): Promise<ResponseDto<ListType<SelectUserInfoListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.USER.LIST_ERROR
      );
    }

    return removeSensitiveInfoFromListResponse(createResponse(
      'SUCCESS',
      MESSAGE.USER.USER.LIST_SUCCESS,
      result.data
    ));
  }

  /**
   * @description 사용자 번호로 조회
   * @param req 요청 객체
   * @param userNo 사용자 번호
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserByUserNo(
    @Req() req: AuthRequest,
    @Param(
      'userNo',
      ParseIntPipe
    ) userNo: number
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByNo(userNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || MESSAGE.USER.USER.NOT_FOUND
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.USER.FETCH_SUCCESS,
      userToReturn
    );
  }

  /**
   * @description 사용자명으로 조회
   * @param req 요청 객체
   * @param name 사용자명
   */
  @Endpoint({
    endpoint: '/name/:name',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserByUserNm(
    @Req() req: AuthRequest,
    @Param('name') name: string
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByNm(name);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || MESSAGE.USER.USER.NOT_FOUND
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.USER.FETCH_SUCCESS,
      userToReturn
    );
  }

  /**
   * @description 이메일로 사용자 조회
   * @param req 요청 객체
   * @param email 이메일 주소
   */
  @Endpoint({
    endpoint: '/email/:email',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUserByEmlAddr(
    @Req() req: AuthRequest,
    @Param('email') email: string
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByEmail(email);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || MESSAGE.USER.USER.NOT_FOUND
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.USER.FETCH_SUCCESS,
      userToReturn
    );
  }

  /**
   * @description 새 사용자 생성 (기존 어드민이 새 어드민 추가)
   * @param req 요청 객체
   * @param createUserData 사용자 생성 정보
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminCreateUser(
    @Req() req: AuthRequest,
    @Body() createUserData: CreateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    if (!req.user) {
      return createError(
        'UNAUTHORIZED',
        MESSAGE.COMMON.UNAUTHORIZED
      );
    }

    const result = await this.usersService.createUser(
      req.user,
      createUserData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.USER.CREATE_ERROR
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse(
      'CREATED',
      MESSAGE.USER.USER.CREATE_SUCCESS,
      userToReturn
    );
  }

  /**
   * @description 최초 어드민 생성 (개발 환경에서만 또는 마스터 키로)
   * @param createUserData 사용자 생성 정보
   */
  @Endpoint({
    endpoint: '/admin',
    method: 'POST',
    options: {
      // 개발 환경에서만 인증 없이 접근 가능
    },
  })
  async adminCreateAdmin(@Body() createUserData: CreateUserDto): Promise<ResponseDto<SelectUserInfoType>> {
    // 환경 변수 조작 방지를 위해 ConfigService 사용
    const environment = this.configService.get<string>('app.environment');
    const masterKey = this.configService.get<string>('app.masterKey');

    // 개발 환경이 아니면 접근 거부 (또는 마스터 키 검증)
    if (environment !== 'development') {
      // 마스터 키 검증 옵션 (선택적)
      if (masterKey && createUserData.masterKey) {
        if (createUserData.masterKey !== masterKey) {
          return createError(
            'FORBIDDEN',
            MESSAGE.COMMON.INVALID_MASTER_KEY
          );
        }
        // 마스터 키가 일치하면 계속 진행
      }
      else {
        return createError(
          'FORBIDDEN',
          MESSAGE.COMMON.DEVELOPMENT_ONLY
        );
      }
    }

    // 최초 어드민 생성 (req.user 없이)
    const result = await this.usersService.createUser(
      null,
      createUserData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.USER.CREATE_ERROR
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    return createResponse(
      'CREATED',
      MESSAGE.USER.USER.CREATE_SUCCESS,
      userToReturn
    );
  }

  /**
   * @description 사용자 정보 수정
   * @param req 요청 객체
   * @param userNo 사용자 번호
   * @param updateUserData 사용자 수정 정보
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'PATCH',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminUpdateUser(
    @Req() req: AuthRequest,
    @Param(
      'userNo',
      ParseIntPipe
    ) userNo: number,
    @Body() updateUserData: UpdateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    if (!req.user) {
      return createError(
        'UNAUTHORIZED',
        MESSAGE.COMMON.UNAUTHORIZED
      );
    }

    const result = await this.usersService.updateUser(
      req.user.userNo,
      userNo,
      updateUserData
    );

    if (!result?.success) {
      // 업데이트된 필드에 따라 적절한 기본 에러 메시지 선택
      const defaultErrorMessage = updateUserData.proflImg !== undefined && updateUserData.proflImg !== null
        ? MESSAGE.USER.USER.IMAGE_CHANGE_ERROR
        : MESSAGE.USER.USER.UPDATE_ERROR;

      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || defaultErrorMessage
      );
    }

    const userToReturn = removeSensitiveInfo(result.data);

    // 업데이트된 필드에 따라 적절한 메시지 선택
    const successMessage = updateUserData.proflImg !== undefined && updateUserData.proflImg !== null
      ? MESSAGE.USER.USER.IMAGE_CHANGE_SUCCESS
      : MESSAGE.USER.USER.UPDATE_SUCCESS;

    return createResponse(
      'SUCCESS',
      successMessage,
      userToReturn
    );
  }

  // TODO: 여기서부터 다시 진행할 것

  /**
   * @description 다수 사용자 일괄 수정
   * @param req 요청 객체
   * @param adminMultipleUpdateUser 사용자 수정 정보 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PATCH',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleUpdateUser(
    @Req() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    if (!req.user) {
      return createError(
        'UNAUTHORIZED',
        MESSAGE.COMMON.UNAUTHORIZED
      );
    }

    const result = await this.usersService.multipleUpdateUser(
      req.user.userNo,
      updateUserDto
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.USER.UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.USER.UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 사용자 삭제
   * @param req 요청 객체
   * @param userNo 사용자 번호
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminDeleteUser(
    @Req() req: AuthRequest,
    @Param(
      'userNo',
      ParseIntPipe
    ) userNo: number
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    if (!req.user) {
      return createError(
        'UNAUTHORIZED',
        MESSAGE.COMMON.UNAUTHORIZED
      );
    }

    const result = await this.usersService.adminDeleteUser(
      req.user.userNo,
      userNo
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.USER.DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.USER.DELETE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param req 요청 객체
   * @param body 삭제할 사용자 번호 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteUser(
    @Req() req: AuthRequest,
    @Body() body: DeleteMultipleUsersDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    if (!req.user) {
      return createError(
        'UNAUTHORIZED',
        MESSAGE.COMMON.UNAUTHORIZED
      );
    }

    const result = await this.usersService.adminMultipleDeleteUser(
      req.user.userNo,
      body.userNoList
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.USER.USER.DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.USER.USER.DELETE_SUCCESS,
      result.data
    );
  }
}
