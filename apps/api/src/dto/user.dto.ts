import { Exclude } from 'class-transformer';
import { createZodDto } from 'nestjs-zod';

import {
  updateUserSchema,
  userInfoSchema,
  deleteMultipleUsersSchema,
  searchUserSchema
} from '@/endpoints/prisma/schemas/user.schema';

// 사용자 조회 DTO
export class UserInfoDto extends createZodDto(userInfoSchema.partial()) {
  @Exclude({ toPlainOnly: true, })
  declare encptPswd: string;

  @Exclude({ toPlainOnly: true, })
  declare reshToken?: string | null;
}

// 사용자 업데이트 DTO
export class UpdateUserDto extends createZodDto(updateUserSchema) {
  @Exclude({ toPlainOnly: true, })
  declare encptPswd?: string;

  @Exclude({ toPlainOnly: true, })
  declare reshToken?: string | null;
}

// 사용자 검색 DTO
export class SearchUserDto extends createZodDto(searchUserSchema) {}

// 다수 사용자 삭제 DTO
export class DeleteMultipleUsersDto extends createZodDto(deleteMultipleUsersSchema) {}
