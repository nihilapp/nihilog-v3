import { z } from 'zod';

const responseSchema = <TData = any>(dataSchema: z.ZodType<TData> = z.any()) => (
  z.object({
    error: z.boolean(),
    code: z.string(),
    message: z.string(),
    data: dataSchema.nullable(),
    responseTime: z.string('응답일시는 올바른 날짜 형식이어야 합니다.')
      .pipe(z.iso.datetime('올바른 ISO 8601 날짜 형식이어야 합니다.'))
      .nullable()
      .optional(),
  })
);

const listResponseSchema = <TData = any>(dataSchema: z.ZodType<TData> = z.any()) => (
  responseSchema(z.object({
    list: z.array(dataSchema),
    totalCnt: z.number(),
  }))
);

const multipleResultSchema = z.object({
  successCnt: z.number()
    .positive('성공 개수는 양수여야 합니다.')
    .optional(),
  failCnt: z.number()
    .positive('실패 개수는 양수여야 합니다.')
    .optional(),
  failNoList: z.array(z.number()
    .positive('실패 번호는 양수여야 합니다.'))
    .optional(),
});

type ResponseType<TData = any> = z.infer<ReturnType<typeof responseSchema<TData>>>;
type ListResponseType<TData = any> = z.infer<ReturnType<typeof listResponseSchema<TData>>>;
type MultipleResultType = z.infer<typeof multipleResultSchema>;
type ListType<TData = any> = {
  list: TData[];
  totalCnt: number;
};

export {
  responseSchema,
  listResponseSchema,
  multipleResultSchema
};

export type {
  ResponseType,
  ListResponseType,
  ListType,
  MultipleResultType
};
