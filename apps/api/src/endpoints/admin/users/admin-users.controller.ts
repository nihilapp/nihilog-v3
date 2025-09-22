import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Get,
  Param
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
import { FastifyRequest } from 'fastify';

import { MESSAGE_CODE } from '@/code/message.code';
import { RESPONSE_CODE } from '@/code/response.code';
import { CreateUserDto } from '@/dto/auth.dto';
import { ListDto, ResponseDto } from '@/dto/response.dto';
import { UserInfoDto, SearchUserDto } from '@/dto/user.dto';
import { AdminAuthGuard } from '@auth/admin-auth.guard';
import { JwtPayload } from '@auth/jwt.strategy';
import { createError, createResponse } from '@/utils';
import { createExampleUser } from '@/utils/createExampleUser';
import { cloneDeep } from 'lodash';
import { UsersService } from './admin-users.service';

@ApiTags('admin/users')
@Controller('admin/users')
@UseGuards(AdminAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * @description 새 사용자 생성
   * @param req 요청 객체
   * @param createUserData 사용자 생성 정보
   */
  @ApiOperation({
    summary: '👤 새 사용자 생성',
    description: 'ADMIN 권한으로 새로운 사용자 계정을 생성합니다.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: '사용자 생성 DTO',
  })
  @ApiOkResponse({
    description: '사용자 생성 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.CREATED,
        message: MESSAGE_CODE.USER_CREATE_SUCCESS,
        data: createExampleUser(),
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '권한 부족',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.PERMISSION_DENIED,
        message: MESSAGE_CODE.PERMISSION_DENIED,
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '이미 존재하는 이메일',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.CONFLICT,
        message: MESSAGE_CODE.CONFLICT_EMAIL,
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '사용자 생성 실패',
    schema: {
      example: {
        error: true,
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: MESSAGE_CODE.USER_CREATE_ERROR,
        data: null,
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Post()
  async createUser(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Body() createUserData: CreateUserDto
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.createUser(createUserData);

    if (!result.success) {
      switch (result.errorType) {
      case 'CONFLICT':
        return createError(
          'CONFLICT',
          'CONFLICT_EMAIL'
        );
      default:
        return createError(
          'INTERNAL_SERVER_ERROR',
          'USER_CREATE_ERROR'
        );
      }
    }

    const userToReturn = cloneDeep(result.data);
    userToReturn.encptPswd = undefined;
    userToReturn.reshToken = undefined;

    return createResponse('CREATED', 'USER_CREATE_SUCCESS', userToReturn);
  }

  /**
   * @description 사용자 목록 검색
   * @param req 요청 객체
   * @param body 검색 조건
   */
  @ApiOperation({
    summary: '🔎 사용자 목록 검색',
    description: '부분 일치(ILIKE) 기반으로 사용자 목록을 검색합니다. delYn이 제공되지 않으면 기본값 N으로 조회합니다.',
  })
  @ApiBody({
    type: SearchUserDto,
    description: '검색 조건 DTO',
  })
  @ApiOkResponse({
    description: '사용자 목록 조회 성공',
    schema: {
      example: {
        error: false,
        code: RESPONSE_CODE.SUCCESS,
        message: MESSAGE_CODE.USER_LIST_SUCCESS,
        data: {
          list: [
            createExampleUser(),
          ],
          totalCnt: 1,
        },
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Post('search')
  async searchUsers(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Body() body: SearchUserDto
  ): Promise<ResponseDto<ListDto<UserInfoDto>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUsers(
      body.strtRow,
      body.endRow,
      body.srchType,
      body.srchKywd,
      body.delYn
    );

    return createResponse('SUCCESS', 'USER_LIST_SUCCESS', result);
  }

  /**
   * @description 사용자 번호로 조회
   * @param req 요청 객체
   * @param userNo 사용자 번호
   */
  @ApiOperation({
    summary: '🔍 사용자 단건 조회 (번호)',
    description: '사용자 번호로 단건 조회합니다.',
  })
  @ApiParam({ name: 'userNo', description: '사용자 번호', type: Number, })
  @ApiOkResponse({
    description: '사용자 조회 성공',
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
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Get(':userNo')
  async getUserByNo(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
    @Param('userNo') userNo: string
  ): Promise<ResponseDto<UserInfoDto>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.usersService.getUserByNo(Number(userNo));

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
  @ApiOperation({
    summary: '🔍 사용자 단건 조회 (이름)',
    description: '사용자명을 기준으로 단건 조회합니다(완전 일치).',
  })
  @ApiParam({ name: 'name', description: '사용자명', type: String, })
  @ApiOkResponse({
    description: '사용자 조회 성공',
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
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Get('name/:name')
  async getUserByNm(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
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
  @ApiOperation({
    summary: '🔍 사용자 단건 조회 (이메일)',
    description: '이메일 주소를 기준으로 단건 조회합니다(완전 일치).',
  })
  @ApiParam({ name: 'email', description: '이메일 주소', type: String, })
  @ApiOkResponse({
    description: '사용자 조회 성공',
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
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Get('email/:email')
  async getUserByEmail(
    @Req() req: FastifyRequest & { user: JwtPayload | null; errorResponse?: ResponseDto<null> },
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
}
