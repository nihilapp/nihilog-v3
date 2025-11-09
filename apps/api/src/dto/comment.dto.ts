import {
  createCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
  searchCommentSchema
} from '@nihilog/schemas';
import { createZodDto } from 'nestjs-zod';

export class CreateCommentDto extends createZodDto(createCommentSchema) { }

export class UpdateCommentDto extends createZodDto(updateCommentSchema) { }

export class DeleteCommentDto extends createZodDto(deleteCommentSchema) { }

export class SearchCommentDto extends createZodDto(searchCommentSchema) { }
