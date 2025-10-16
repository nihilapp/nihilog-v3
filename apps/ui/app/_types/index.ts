// 공통 타입 export
export type {
  ListType,
  MultipleResultType,
  ResponseType,
  ErrorType,
  RepoResponseType
} from './common.types.js';

// 사용자 타입 export
export type {
  UserInfoType,
  SelectUserInfoType,
  SelectUserInfoListItemType,
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
} from './user.types';

// 포스트 타입 export
export type {
  PostInfoType,
  PostViewLogType,
  PostShareLogType,
  PostBookmarkType,
  SelectPostType,
  SelectPostListItemType,
  SelectPostViewLogType,
  SelectPostViewLogListItemType,
  SelectPostShareLogType,
  SelectPostShareLogListItemType,
  SelectPostBookmarkType,
  SelectPostBookmarkListItemType,
  ViewStatModeType,
  ViewStatItemType,
  SharePlatformStatItemType,
  AnalyzePostItemType,
  AverageViewStatItemType,
  AverageBookmarkStatItemType,
  TopPopularPostItemType,
  TopCommentPostItemType,
  PostStatusRatioItemType
} from './post.types.js';

// 카테고리 타입 export
export type {
  CategoryInfoType,
  SelectCategoryType,
  SelectCategoryListItemType,
  AnalyzeCategoryStatItemType,
  TopPopularCategoryItemType,
  TopCategoriesBySubscriberItemType,
  AverageBookmarkPerCategoryItemType,
  AverageViewPerCategoryItemType,
  CategoryHierarchyDistributionItemType,
  CategoryHierarchyPostDistributionItemType,
  CategoryHierarchySubscriberDistributionItemType,
  CategoryStatusDistributionItemType,
  CategoryCreatorStatItemType,
  UnusedCategoryItemType,
  CategorySubscriberGrowthRateItemType,
  CategoriesWithoutSubscribersItemType
} from './category.types.js';

// 태그 타입 export
export type {
  TagInfoType,
  PostTagMappingType,
  SelectPostTagMappingType,
  SelectTagInfoType,
  SelectTagInfoListItemType,
  SelectPostTagMappingListItemType,
  AnalyzeTagStatItemType,
  TopUsedTagItemType,
  TagUsageTrendItemType,
  UnusedTagItemType,
  TopTagsBySubscriberItemType,
  TagSubscriberGrowthRateItemType,
  TagWithoutSubscribersItemType,
  TagUsageEfficiencyItemType,
  TagAverageUsageFrequencyItemType,
  TagLifecycleItemType,
  TagStatusDistributionItemType,
  TagCreatorStatItemType,
  TagCleanupRecommendationItemType
} from './tag.types.js';

// 댓글 타입 export
export type {
  CommentInfoType,
  SelectCommentType,
  SelectCommentListItemType,
  AnalyzeCommentStatItemType,
  TopPostsByCommentItemType,
  TopUsersByCommentItemType,
  AverageCommentPerPostItemType,
  CommentStatusDistributionItemType,
  CommentApprovalRateItemType,
  CommentSpamRateItemType,
  CommentReplyRatioItemType,
  CommentAverageDepthItemType,
  PostsWithoutCommentsItemType
} from './comment.types.js';

// 구독 타입 export
export type {
  UserSubscribeInfoType,
  SelectUserSbcrInfoType,
  SelectUserSubscribeInfoListItemType,
  AnalyzeSubscribeStatItemType,
  SubscribeNotificationDistributionItemType,
  TotalActiveNotificationUsersItemType,
  TotalInactiveNotificationUsersItemType
} from './subscribe.types.js';

// 카테고리 구독 타입 export
export type {
  CategorySubscribeMappingType,
  SelectCategorySubscribeMappingType,
  SelectCategorySubscribeMappingListItemType
} from './category-subscribe.types.js';

// 태그 구독 타입 export
export type {
  TagSubscribeMappingType,
  SelectTagSubscribeMappingType,
  SelectTagSubscribeMappingListItemType
} from './tag-subscribe.types.js';
