import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Get,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam
} from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import cloneDeep from 'lodash/cloneDeep';

import { MESSAGE_CODE } from '@/code/message.code';
import { RESPONSE_CODE } from '@/code/response.code';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { AuthRequest, UpdateUserDto } from '@/dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { ListDto, ResponseDto } from '@/dto/response.dto';
import { UserInfoDto, SearchUserDto } from '@/dto/user.dto';
import { createError, createResponse } from '@/utils';
import { createExampleUser } from '@/utils/createExampleUser';
import { AdminAuthGuard } from '@auth/admin-auth.guard';
import { JwtPayload } from '@auth/jwt.strategy';

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
    endpoint: '',
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
              list: [ createExampleUser(), ],
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
  ): Promise<ResponseDto<ListDto<UserInfoDto>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return await this.usersService.getUserList(body);
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
          [ false, 'SUCCESS', 'USER_FETCH_SUCCESS', createExampleUser(), ],
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
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByNo(userNo);

    if (!result) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    const userToReturn = cloneDeep(result);
    userToReturn.encptPswd = undefined;
    userToReturn.reshToken = undefined;

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
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByNm(name);

    if (!result) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    const userToReturn = cloneDeep(result);
    userToReturn.encptPswd = undefined;
    userToReturn.reshToken = undefined;

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
          [ false, 'SUCCESS', 'USER_FETCH_SUCCESS', createExampleUser(), ],
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
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByEmail(email);

    if (!result) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    const userToReturn = cloneDeep(result);
    userToReturn.encptPswd = undefined;
    userToReturn.reshToken = undefined;

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
          [ false, 'CREATED', 'USER_CREATE_SUCCESS', createExampleUser(), ],
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
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return await this.usersService.createUser(createUserData);
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
            createExampleUser(),
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
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    return await this.usersService.updateUser(userNo, updateUserData);
  }

  // TODO: 여기서부터 다시 진행할 것

  /**
   * @description 다수 사용자 일괄 생성
   * @param req 요청 객체
   * @param createUserDataList 사용자 생성 정보 목록
   */
  @ApiOperation({
    summary: '👥 다수 사용자 일괄 생성',
    description: 'ADMIN 권한으로 다수 사용자 계정을 일괄 생성합니다.',
  })
  @ApiBody({
    type: [ CreateUserDto, ],
    description: '사용자 생성 DTO 배열',
  })
  @ApiOkResponse({
    description: '다수 사용자 생성 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.CREATED,
        message: MESSAGE_CODE.USER_CREATE_SUCCESS,
        data: [ createExampleUser(), ],
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Post('multiple')
  async multipleCreateUser(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Body() createUserDataList: CreateUserDto[]
  ): Promise<ResponseDto<UserInfoDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 다수 사용자 일괄 생성 로직 구현
    return createResponse('CREATED', 'USER_CREATE_SUCCESS', []);
  }

  /**
   * @description 다수 사용자 일괄 수정
   * @param req 요청 객체
   * @param updateUserDataList 사용자 수정 정보 목록
   */
  @ApiOperation({
    summary: '✏️ 다수 사용자 일괄 수정',
    description: 'ADMIN 권한으로 다수 사용자 정보를 일괄 수정합니다.',
  })
  @ApiBody({
    type: [ UpdateUserDto, ],
    description: '사용자 수정 DTO 배열',
  })
  @ApiOkResponse({
    description: '다수 사용자 수정 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.USER_UPDATE_SUCCESS,
        data: [ createExampleUser(), ],
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Put('multiple')
  async multipleUpdateUser(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Body() updateUserDataList: UpdateUserDto[]
  ): Promise<ResponseDto<UserInfoDto[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 다수 사용자 일괄 수정 로직 구현
    return createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', []);
  }

  /**
   * @description 사용자 삭제
   * @param req 요청 객체
   * @param userNo 사용자 번호
   */
  @ApiOperation({
    summary: '🗑️ 사용자 삭제',
    description: 'ADMIN 권한으로 특정 사용자를 삭제합니다.',
  })
  @ApiParam({ name: 'userNo', description: '사용자 번호', type: Number, })
  @ApiOkResponse({
    description: '사용자 삭제 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.USER_DELETE_SUCCESS,
        data: null,
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Delete(':userNo')
  async deleteUser(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Param('userNo') userNo: string
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 사용자 삭제 로직 구현
    return createResponse('SUCCESS', 'USER_DELETE_SUCCESS', null);
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param req 요청 객체
   * @param body 삭제할 사용자 번호 목록
   */
  @ApiOperation({
    summary: '🗑️ 다수 사용자 일괄 삭제',
    description: 'ADMIN 권한으로 다수 사용자를 일괄 삭제합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userNos: {
          type: 'array',
          items: { type: 'number', },
          description: '삭제할 사용자 번호 목록',
          example: [ 1, 2, 3, ],
        },
      },
    },
  })
  @ApiOkResponse({
    description: '다수 사용자 삭제 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.USER_DELETE_SUCCESS,
        data: null,
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Delete('multiple')
  async multipleDeleteUser(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Body() body: { userNos: number[] }
  ): Promise<ResponseDto<null>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    // TODO: 다수 사용자 일괄 삭제 로직 구현
    return createResponse('SUCCESS', 'USER_DELETE_SUCCESS', null);
  }
}
