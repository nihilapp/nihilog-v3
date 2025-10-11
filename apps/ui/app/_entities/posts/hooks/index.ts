// Posts 엔티티의 React Query 훅들을 export합니다.

// Query 훅들
export { useGetPosts } from './use-get-posts';
export { useGetPostByNo } from './use-get-post-by-no';
export { useGetPostBySlug } from './use-get-post-by-slug';
export { useGetPostsByTag } from './use-get-posts-by-tag';
export { useGetPostsByCategory } from './use-get-posts-by-category';
export { useGetPostsByArchive } from './use-get-posts-by-archive';
export { useGetAdvancedPosts } from './use-get-advanced-posts';
export { useGetBookmarkedPosts } from './use-get-bookmarked-posts';

// Mutation 훅들
export { useCreateViewLog } from './use-create-view-log';
export { useCreateShareLog } from './use-create-share-log';
export { useCreateBookmark } from './use-create-bookmark';
export { useDeleteBookmark } from './use-delete-bookmark';
