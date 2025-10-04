import { Inject, Injectable } from '@nestjs/common';

import { CreateAdminDto } from '@/dto/admin.dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { UpdateUserDto, type SearchUserDto } from '@/dto/user.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectUserInfoListItemType,
  SelectUserInfoType
} from '@/endpoints/prisma/types/user.types';
import { pageHelper } from '@/utils/pageHelper';
import { timeToString } from '@/utils/timeHelper';
import { PrismaClient, type UserRole } from '~prisma/client';

@Injectable()
export class UserRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  /**
   * @description 사용자 번호로 조회
   * @param userNo 사용자 번호
   * @param delYn 삭제 여부
   */
  async getUserByNo(
    userNo: number,
    delYn: 'Y' | 'N' = 'N'
  ): Promise<SelectUserInfoType | null> {
    try {
      const user = await this.prisma.userInfo.findFirst({
        where: {
          userNo,
          delYn,
        },
      });

      return user;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 계정 생성
   * @param userNo 현재 사용자 번호
   * @param signUpData 회원가입 정보
   * @param hashedPassword 해시된 비밀번호
   */
  async createUser(
    userNo: number | null,
    signUpData: CreateUserDto | CreateAdminDto,
    hashedPassword: string
  ): Promise<SelectUserInfoType | null> {
    const currentTime = timeToString();

    try {
      const newUser = await this.prisma.userInfo.create({
        data: {
          ...signUpData,
          encptPswd: hashedPassword,
          crtNo: userNo ?? null,
          crtDt: currentTime,
          updtNo: userNo ?? null,
          updtDt: currentTime,
        },
      });

      return newUser;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 정보 업데이트
   * @param userNo 현재 사용자 번호
   * @param targetUserNo 대상 사용자 번호
   * @param updateData 업데이트 데이터
   */
  async updateUser(
    userNo: number,
    targetUserNo: number,
    updateData: UpdateUserDto
  ): Promise<SelectUserInfoType | null> {
    try {
      const updateUser = await this.prisma.userInfo.update({
        where: {
          userNo: targetUserNo,
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return updateUser;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 소프트 삭제
   * @param userNo 현재 사용자 번호
   * @param targetUserNo 대상 사용자 번호
   */
  async deleteUser(
    userNo: number,
    targetUserNo: number
  ): Promise<boolean> {
    const currentTime = timeToString();

    try {
      const result = await this.prisma.userInfo.update({
        where: {
          userNo: targetUserNo,
        },
        data: {
          useYn: 'N',
          delYn: 'Y',
          delDt: currentTime,
          delNo: userNo,
          updtDt: currentTime,
          updtNo: userNo,
        },
      });

      if (result) {
        return true;
      }

      return false;
    }
    catch {
      return false;
    }
  }

  /**
   * @description 사용자 목록 조회
   * @param searchData 검색 조건
   */
  async getUserList(searchData: SearchUserDto): Promise<ListType<SelectUserInfoListItemType>> {
    const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

    const where = {
      delYn,
      ...(srchKywd && (srchType === 'userNm') && {
        userNm: {
          contains: srchKywd,
        },
      }),
      ...(srchKywd && (srchType === 'emlAddr') && {
        emlAddr: {
          contains: srchKywd,
        },
      }),
      ...(srchKywd && (srchType === 'userRole') && {
        userRole: srchKywd as UserRole,
      }),
    };

    const skip = pageHelper(page, strtRow, endRow).offset;
    const take = pageHelper(page, strtRow, endRow).limit;

    try {
      const [ totalCnt, list, ] = await this.prisma.$transaction([
        this.prisma.userInfo.count({ where, orderBy: { userNo: 'desc', }, }),
        this.prisma.userInfo.findMany({
          where,
          skip,
          take,
          orderBy: {
            userNo: 'desc',
          },
        }),
      ]);

      return {
        list: list.map((user, index) => ({
          ...user,
          totalCnt,
          rowNo: skip + index + 1,
        })),
        totalCnt,
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 이메일로 사용자 조회
   * @param emlAddr 이메일 주소
   * @param delYn 삭제 여부
   */
  async getUserByEmail(
    emlAddr: string,
    delYn: 'Y' | 'N' = 'N'
  ): Promise<SelectUserInfoType | null> {
    try {
      const user = await this.prisma.userInfo.findFirst({
        where: {
          emlAddr,
          delYn,
        },
      });

      return user;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자명으로 사용자 조회
   * @param userNm 사용자명
   * @param delYn 삭제 여부
   */
  async getUserByName(
    userNm: string,
    delYn: 'Y' | 'N' = 'N'
  ): Promise<SelectUserInfoType | null> {
    try {
      const user = await this.prisma.userInfo.findFirst({
        where: {
          userNm,
          delYn,
        },
      });

      return user;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 관리자가 다수 사용자 일괄 수정
   * @param userNo 현재 사용자 번호
   * @param updateUserDto 사용자 수정 정보 목록
   */
  async adminMultipleUpdateUser(
    userNo: number,
    updateUserDto: UpdateUserDto
  ): Promise<MultipleResultType | null> {
    const { userNoList, ...restData } = updateUserDto;

    if (!userNoList || userNoList.length === 0) {
      return null;
    }

    try {
      const result = await this.prisma.userInfo.updateManyAndReturn({
        where: {
          userNo: {
            in: userNoList,
          },
        },
        data: {
          ...restData,
          updtNo: userNo,
          updtDt: timeToString(),
          ...(restData.delYn && {
            delYn: restData.delYn,
            delNo: userNo,
            delDt: timeToString(),
          }),
        },
        select: {
          userNo: true,
        },
      });

      const failNoList = userNoList
        .filter((item) => !result.some((resultItem) => resultItem.userNo === item));

      return {
        successCnt: result.length,
        failCnt: userNoList.length - result.length,
        failNoList,
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param userNo 현재 사용자 번호
   * @param userNoList 사용자 번호 목록
   */
  async adminMultipleDeleteUser(
    userNo: number,
    userNoList: number[]
  ): Promise<MultipleResultType | null> {
    if (!userNoList || userNoList.length === 0) {
      return null;
    }

    try {
      const result = await this.prisma.userInfo.updateManyAndReturn({
        where: {
          userNo: {
            in: userNoList,
          },
        },
        data: {
          useYn: 'N',
          delYn: 'Y',
          delDt: timeToString(),
          delNo: userNo,
          updtDt: timeToString(),
          updtNo: userNo,
        },
        select: {
          userNo: true,
        },
      });

      const failNoList = userNoList
        .filter((item) => !result.some((resultItem) => resultItem.userNo === item));

      return {
        successCnt: result.length,
        failCnt: userNoList.length - result.length,
        failNoList,
      };
    }
    catch {
      return null;
    }
  }
}
