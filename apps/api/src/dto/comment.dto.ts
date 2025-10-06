import { createZodDto } from 'nestjs-zod';

import {
  createCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
  searchCommentSchema
} from '@/endpoints/prisma/schemas/comment.schema';

export class CreateCommentDto extends createZodDto(createCommentSchema) { }

export class UpdateCommentDto extends createZodDto(updateCommentSchema) { }

export class DeleteCommentDto extends createZodDto(deleteCommentSchema) { }

export class SearchCommentDto extends createZodDto(searchCommentSchema) { }
