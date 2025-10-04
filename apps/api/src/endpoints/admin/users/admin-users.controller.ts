import {
  Body,
  Controller,
  Req,
  UseGuards,
  Param
} from '@nestjs/common';
import {
  ApiTags
} from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { AuthRequest, UpdateUserDto } from '@/dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { ResponseDto } from '@/dto/response.dto';
import { SearchUserDto, DeleteMultipleUsersDto } from '@/dto/user.dto';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserInfoListItemType, SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { createError, createResponse, removeSensitiveInfoFromListResponse, removeSensitiveInfo } from '@/utils';
import { createExampleUser } from '@/utils/createExampleUser';

import { AdminUserService } from './admin-users.service';

@ApiTags('admin/users')
@Controller('admin/users')
@UseGuards(AdminAuthGuard)
export class AdminUserController {
  constructor(private readonly usersService: AdminUserService) { }

  /**
   * @description 사용자 목록 검색
   * @param req 요청 객체
   * @param body 검색 조건
   */
  @Endpoint({
    endpoint: '/search',
    method: 'POST',
    summary: '🔎 사용자 목록 검색',
    description: '부분 일치(ILIKE) 기반으로 사용자 목록을 검색합니다. delYn이 제공되지 않으면 기본값 N으로 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '검색 조건 DTO', SearchUserDto, ],
      responses: [
        [
          '사용자 목록 조회 성공',
          [
            false,
            'SUCCESS',
            'USER_LIST_SUCCESS',
            {
              list: [ createExampleUser('list'), ],
              totalCnt: 1,
            },
          ],
        ],
        [
          '잘못된 요청',
          [ true, 'BAD_REQUEST', 'INVALID_REQUEST', null, ],
        ],
        [
          '사용자 목록 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'USER_LIST_ERROR', null, ],
        ],
      ],
    },
  })
  async adminGetUserList(
    @Req() req: AuthRequest,
    @Body() body: SearchUserDto
  ): Promise<ResponseDto<ListType<SelectUserInfoListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserList(body);

    if (!result) {
      return createError('BAD_REQUEST', 'INVALID_REQUEST');
    }

    return removeSensitiveInfoFromListResponse(createResponse('SUCCESS', 'USER_LIST_SUCCESS', result));
  }

  /**
   * @description 사용자 번호로 조회
   * @param req 요청 객체
   * @param userNo 사용자 번호
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'GET',
    summary: '🔍 사용자 단건 조회 (번호)',
    description: '사용자 번호로 단건 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'userNo', '사용자 번호', 'number', true, ],
      ],
      responses: [
        [ '사용자 조회 성공',
          [ false, 'SUCCESS', 'USER_FETCH_SUCCESS', createExampleUser('detail'), ],
        ],
        [ '사용자를 찾을 수 없음',
          [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async adminGetUserByUserNo(
    @Req() req: AuthRequest,
    @Param('userNo') userNo: number
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByNo(userNo);

    if (!result) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    const userToReturn = removeSensitiveInfo(result);

    return createResponse('SUCCESS', 'USER_FETCH_SUCCESS', userToReturn);
  }

  /**
   * @description 사용자명으로 조회
   * @param req 요청 객체
   * @param name 사용자명
   */
  @Endpoint({
    endpoint: '/name/:name',
    method: 'GET',
    summary: '🔍 사용자 단건 조회 (이름)',
    description: '사용자명을 기준으로 단건 조회합니다(완전 일치).',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'name', '사용자명', 'string', true, ],
      ],
      responses: [
        [
          '사용자 조회 성공',
          [
            false,
            'SUCCESS',
            'USER_FETCH_SUCCESS',
            createExampleUser(),
          ],
        ],
        [
          '사용자를 찾을 수 없음',
          [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
        ],
      ],
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

    if (!result) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    const userToReturn = removeSensitiveInfo(result);

    return createResponse('SUCCESS', 'USER_FETCH_SUCCESS', userToReturn);
  }

  /**
   * @description 이메일로 사용자 조회
   * @param req 요청 객체
   * @param email 이메일 주소
   */
  @Endpoint({
    endpoint: '/email/:email',
    method: 'GET',
    summary: '🔍 사용자 단건 조회 (이메일)',
    description: '이메일 주소를 기준으로 단건 조회합니다(완전 일치).',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'email', '이메일 주소', 'string', true, ],
      ],
      responses: [
        [ '사용자 조회 성공',
          [ false, 'SUCCESS', 'USER_FETCH_SUCCESS', createExampleUser('detail'), ],
        ],
        [ '사용자를 찾을 수 없음',
          [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
        ],
      ],
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

    if (!result) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    const userToReturn = removeSensitiveInfo(result);

    return createResponse('SUCCESS', 'USER_FETCH_SUCCESS', userToReturn);
  }

  /**
   * @description 새 사용자 생성
   * @param req 요청 객체
   * @param createUserData 사용자 생성 정보
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    summary: '👤 새 사용자 생성',
    description: 'ADMIN 권한으로 새로운 사용자 계정을 생성합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '사용자 생성 DTO', CreateUserDto, ],
      responses: [
        [ '사용자 생성 성공',
          [ false, 'CREATED', 'USER_CREATE_SUCCESS', createExampleUser('detail'), ],
        ],
        [
          '권한 부족',
          [ true, 'PERMISSION_DENIED', 'PERMISSION_DENIED', null, ],
        ],
        [
          '이미 존재하는 이메일',
          [ true, 'CONFLICT', 'CONFLICT_EMAIL', null, ],
        ],
        [
          '사용자 생성 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'USER_CREATE_ERROR', null, ],
        ],
      ],
    },
  })
  async adminCreateUser(
    @Req() req: AuthRequest,
    @Body() createUserData: CreateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.createUser(req.user, createUserData);

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'USER_CREATE_ERROR');
    }

    const userToReturn = removeSensitiveInfo(result);

    return createResponse('CREATED', 'USER_CREATE_SUCCESS', userToReturn);
  }

  /**
   * @description 사용자 정보 수정
   * @param req 요청 객체
   * @param userNo 사용자 번호
   * @param updateUserData 사용자 수정 정보
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'PUT',
    summary: '✏️ 사용자 정보 수정',
    description: 'ADMIN 권한으로 특정 사용자의 정보를 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'userNo', '사용자 번호', 'number', true, ],
      ],
      body: [ '사용자 수정 DTO', UpdateUserDto, ],
      responses: [
        [
          '사용자 수정 성공',
          [
            false,
            'SUCCESS',
            'USER_UPDATE_SUCCESS',
            createExampleUser('detail'),
          ],
        ],
        [
          '사용자를 찾을 수 없음',
          [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
        ],
        [
          '사용자 수정 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR', null, ],
        ],
      ],
    },
  })
  async adminUpdateUser(
    @Req() req: AuthRequest,
    @Param('userNo') userNo: number,
    @Body() updateUserData: UpdateUserDto
  ): Promise<ResponseDto<SelectUserInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.updateUser(req.user.userNo, userNo, updateUserData);

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR');
    }

    const userToReturn = removeSensitiveInfo(result);

    return createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', userToReturn);
  }

  // TODO: 여기서부터 다시 진행할 것

  /**
   * @description 다수 사용자 일괄 수정
   * @param req 요청 객체
   * @param adminMultipleUpdateUser 사용자 수정 정보 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    summary: '✏️ 다수 사용자 일괄 수정',
    description: 'ADMIN 권한으로 다수 사용자 정보를 일괄 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '사용자 수정 DTO', UpdateUserDto, ],
      responses: [
        [
          '다수 사용자 수정 성공',
          [ false, 'SUCCESS', 'USER_UPDATE_SUCCESS', {
            successCnt: 1,
            failCnt: 0,
            failNoList: [],
          }, ],
        ],
        [
          '사용자 수정 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR', null, ],
        ],
      ],
    },
  })
  async adminMultipleUpdateUser(
    @Req() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.multipleUpdateUser(req.user.userNo, updateUserDto);

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR');
    }

    return createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', result);
  }

  /**
   * @description 사용자 삭제
   * @param req 요청 객체
   * @param userNo 사용자 번호
   */
  @Endpoint({
    endpoint: '/:userNo',
    method: 'DELETE',
    summary: '🗑️ 사용자 삭제',
    description: 'ADMIN 권한으로 특정 사용자를 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'userNo', '사용자 번호', 'number', true, ],
      ],
      responses: [
        [
          '사용자 삭제 성공',
          [ false, 'SUCCESS', 'USER_DELETE_SUCCESS', null, ],
        ],
        [
          '사용자를 찾을 수 없음',
          [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
        ],
        [
          '사용자 삭제 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR', null, ],
        ],
        [
          '권한 부족',
          [ true, 'PERMISSION_DENIED', 'PERMISSION_DENIED', null, ],
        ],
      ],
    },
  })
  async adminDeleteUser(
    @Req() req: AuthRequest,
    @Param('userNo') userNo: number
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.adminDeleteUser(
      req.user.userNo,
      userNo
    );

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR');
    }

    return createResponse('SUCCESS', 'USER_DELETE_SUCCESS', result);
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param req 요청 객체
   * @param body 삭제할 사용자 번호 목록
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    summary: '🗑️ 다수 사용자 일괄 삭제',
    description: 'ADMIN 권한으로 다수 사용자를 일괄 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '사용자 번호 목록', DeleteMultipleUsersDto, ],
      responses: [
        [
          '다수 사용자 삭제 성공',
          [ false, 'SUCCESS', 'USER_DELETE_SUCCESS', null, ],
        ],
        [
          '사용자 삭제 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR', null, ],
        ],
        [
          '권한 부족',
          [ true, 'PERMISSION_DENIED', 'PERMISSION_DENIED', null, ],
        ],
      ],
    },
  })
  async adminMultipleDeleteUser(
    @Req() req: AuthRequest,
    @Body() body: DeleteMultipleUsersDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.adminMultipleDeleteUser(req.user.userNo, body.userNoList);

    if (!result) {
      return createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR');
    }

    return createResponse('SUCCESS', 'USER_DELETE_SUCCESS', result);
  }
}
