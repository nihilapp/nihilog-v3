import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

// 기존 스키마들 import
import {
  // 공통 스키마
  commonSchema,
  baseSearchSchema,
  analyzeStatSchema,

  // 사용자 관련 스키마
  userRoleSchema,
  passwordSchema,
  userInfoSchema,
  createUserSchema,
  updateUserSchema,
  signInSchema,
  forgotPasswordSchema,
  changePasswordSchema,
  resetPasswordSchema,
  withdrawSchema,
  searchUserSchema,
  partialUserInfoSchema,
  deleteMultipleUsersSchema,

  // 포스트 관련 스키마
  postSchema,
  updatePostSchema,
  deletePostSchema,
  searchPostSchema,
  postBookmarkSchema,
  createPostBookmarkSchema,
  deletePostBookmarkSchema,

  // 구독 관련 스키마
  userSubscribeSchema,
  createSubscribeSchema,
  updateSubscribeSchema,
  defaultSubscribeSchema,
  partialSubscribeSchema,

  // 카테고리 구독 관련 스키마
  categorySubscribeSchema,
  categorySubscribeItemListSchema,
  createCategorySubscribeSchema,
  updateCategorySubscribeSchema,
  deleteCategorySubscribeSchema,
  searchCategorySubscribeSchema,

  // 태그 구독 관련 스키마
  tagSubscribeSchema,
  tagSubscribeItemListSchema,
  createTagSubscribeSchema,
  updateTagSubscribeSchema,
  deleteTagSubscribeSchema,
  searchTagSubscribeSchema,

  // 로그 관련 스키마
  postViewLogSchema,
  postShareLogSchema,
  createPostShareLogSchema,

  // 태그 관련 스키마
  tagInfoSchema,
  createTagSchema,
  updateTagSchema,
  searchTagSchema,
  deleteTagSchema,
  pstTagMpngSchema,
  createPstTagMpngSchema,
  updatePstTagMpngSchema,
  searchPstTagMpngSchema,
  deletePstTagMpngSchema,

  // 카테고리 관련 스키마
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  searchCategorySchema,

  // 댓글 관련 스키마
  createCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
  searchCommentSchema
} from '@nihilog/schemas';

// 전역 OpenAPI 레지스트리 생성
export const openApiRegistry = new OpenAPIRegistry();

// 모든 기존 스키마 등록 함수
export const registerAllSchemas = () => {
  // 공통 스키마 등록
  openApiRegistry.register(
    'CommonSchema',
    commonSchema
  );
  openApiRegistry.register(
    'BaseSearch',
    baseSearchSchema
  );
  openApiRegistry.register(
    'AnalyzeStat',
    analyzeStatSchema
  );

  // 사용자 관련 스키마 등록
  openApiRegistry.register(
    'UserRole',
    userRoleSchema
  );
  openApiRegistry.register(
    'Password',
    passwordSchema
  );
  openApiRegistry.register(
    'UserInfo',
    userInfoSchema
  );
  openApiRegistry.register(
    'CreateUser',
    createUserSchema
  );
  openApiRegistry.register(
    'UpdateUser',
    updateUserSchema
  );
  openApiRegistry.register(
    'SignIn',
    signInSchema
  );
  openApiRegistry.register(
    'ForgotPassword',
    forgotPasswordSchema
  );
  openApiRegistry.register(
    'ChangePassword',
    changePasswordSchema
  );
  openApiRegistry.register(
    'ResetPassword',
    resetPasswordSchema
  );
  openApiRegistry.register(
    'Withdraw',
    withdrawSchema
  );
  openApiRegistry.register(
    'SearchUser',
    searchUserSchema
  );
  openApiRegistry.register(
    'PartialUserInfo',
    partialUserInfoSchema
  );
  openApiRegistry.register(
    'DeleteMultipleUsers',
    deleteMultipleUsersSchema
  );

  // 포스트 관련 스키마 등록
  openApiRegistry.register(
    'Post',
    postSchema
  );
  openApiRegistry.register(
    'UpdatePost',
    updatePostSchema
  );
  openApiRegistry.register(
    'DeletePost',
    deletePostSchema
  );
  openApiRegistry.register(
    'SearchPost',
    searchPostSchema
  );
  openApiRegistry.register(
    'PostBookmark',
    postBookmarkSchema
  );
  openApiRegistry.register(
    'CreatePostBookmark',
    createPostBookmarkSchema
  );
  openApiRegistry.register(
    'DeletePostBookmark',
    deletePostBookmarkSchema
  );

  // 구독 관련 스키마 등록
  openApiRegistry.register(
    'UserSubscribe',
    userSubscribeSchema
  );
  openApiRegistry.register(
    'CreateSubscribe',
    createSubscribeSchema
  );
  openApiRegistry.register(
    'UpdateSubscribe',
    updateSubscribeSchema
  );
  openApiRegistry.register(
    'DefaultSubscribe',
    defaultSubscribeSchema
  );
  openApiRegistry.register(
    'PartialSubscribe',
    partialSubscribeSchema
  );

  // 카테고리 구독 관련 스키마 등록
  openApiRegistry.register(
    'CategorySubscribe',
    categorySubscribeSchema
  );
  openApiRegistry.register(
    'CategorySubscribeItemList',
    categorySubscribeItemListSchema
  );
  openApiRegistry.register(
    'CreateCategorySubscribe',
    createCategorySubscribeSchema
  );
  openApiRegistry.register(
    'UpdateCategorySubscribe',
    updateCategorySubscribeSchema
  );
  openApiRegistry.register(
    'DeleteCategorySubscribe',
    deleteCategorySubscribeSchema
  );
  openApiRegistry.register(
    'SearchCategorySubscribe',
    searchCategorySubscribeSchema
  );

  // 태그 구독 관련 스키마 등록
  openApiRegistry.register(
    'TagSubscribe',
    tagSubscribeSchema
  );
  openApiRegistry.register(
    'TagSubscribeItemList',
    tagSubscribeItemListSchema
  );
  openApiRegistry.register(
    'CreateTagSubscribe',
    createTagSubscribeSchema
  );
  openApiRegistry.register(
    'UpdateTagSubscribe',
    updateTagSubscribeSchema
  );
  openApiRegistry.register(
    'DeleteTagSubscribe',
    deleteTagSubscribeSchema
  );
  openApiRegistry.register(
    'SearchTagSubscribe',
    searchTagSubscribeSchema
  );

  // 로그 관련 스키마 등록
  openApiRegistry.register(
    'PostViewLog',
    postViewLogSchema
  );
  openApiRegistry.register(
    'PostShareLog',
    postShareLogSchema
  );
  openApiRegistry.register(
    'CreatePostShareLog',
    createPostShareLogSchema
  );

  // 태그 관련 스키마 등록
  openApiRegistry.register(
    'TagInfo',
    tagInfoSchema
  );
  openApiRegistry.register(
    'CreateTag',
    createTagSchema
  );
  openApiRegistry.register(
    'UpdateTag',
    updateTagSchema
  );
  openApiRegistry.register(
    'SearchTag',
    searchTagSchema
  );
  openApiRegistry.register(
    'DeleteTag',
    deleteTagSchema
  );
  openApiRegistry.register(
    'PstTagMpng',
    pstTagMpngSchema
  );
  openApiRegistry.register(
    'CreatePstTagMpng',
    createPstTagMpngSchema
  );
  openApiRegistry.register(
    'UpdatePstTagMpng',
    updatePstTagMpngSchema
  );
  openApiRegistry.register(
    'SearchPstTagMpng',
    searchPstTagMpngSchema
  );
  openApiRegistry.register(
    'DeletePstTagMpng',
    deletePstTagMpngSchema
  );

  // 카테고리 관련 스키마 등록
  openApiRegistry.register(
    'CreateCategory',
    createCategorySchema
  );
  openApiRegistry.register(
    'UpdateCategory',
    updateCategorySchema
  );
  openApiRegistry.register(
    'DeleteCategory',
    deleteCategorySchema
  );
  openApiRegistry.register(
    'SearchCategory',
    searchCategorySchema
  );

  // 댓글 관련 스키마 등록
  openApiRegistry.register(
    'CreateComment',
    createCommentSchema
  );
  openApiRegistry.register(
    'UpdateComment',
    updateCommentSchema
  );
  openApiRegistry.register(
    'DeleteComment',
    deleteCommentSchema
  );
  openApiRegistry.register(
    'SearchComment',
    searchCommentSchema
  );
};
