'use client';

import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

import { Badge } from '@/(common)/_components/ui/badge';
import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/(common)/_components/ui/table';
import { createPostSearchParams } from '@/_data';
import { useAdminCreatePost } from '@/_entities/admin/posts/hooks/use-admin-create-post';
import { useGetPostsForAdmin } from '@/_entities/posts/hooks/use-get-posts';
import type { SelectPostListItemType } from '@/_types';

export function PostsList() {
  // API에서 포스트 목록 가져오기
  const {
    response: postsData,
    isPending,
    mutate,
  } = useGetPostsForAdmin();

  // 새 포스트 생성 훅
  const {
    mutate: createPost,
    isPending: isCreating,
  } = useAdminCreatePost();

  const posts = postsData?.data?.list || [];

  // 초기 데이터 로드
  React.useEffect(() => {
    const adminParams = createPostSearchParams.admin();
    mutate(adminParams);
  }, [ mutate, ]);

  const handleCreateNewPost = async () => {
    try {
      // 빈 포스트 생성
      createPost({
        pstTtl: '',
        pstMtxt: '',
        pstStts: 'EMPTY',
      });
    }
    catch {
      toast.error('게시글 생성에 실패했습니다.');
    }
  };

  const handleDeletePost = async (_postNo: number) => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        // TODO: 실제 API 호출로 포스트 삭제
        // await deletePost(postNo);

        // 목록 새로고침
        const adminParams = createPostSearchParams.admin();
        mutate(adminParams);
        toast.success('게시글이 삭제되었습니다.');
      }
      catch {
        toast.error('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'FINISHED':
        return <Badge variant='default'>발행됨</Badge>;
      case 'WRITING':
        return <Badge variant='secondary'>작성중</Badge>;
      case 'EMPTY':
        return <Badge variant='outline'>초안</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <div className='space-y-6'>
      {/* 헤더 */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>게시글 관리</h1>
          <p className='text-muted-foreground'>
            블로그 게시글을 관리하고 새로운 글을 작성하세요.
          </p>
        </div>
        <Button
          onClick={handleCreateNewPost}
          disabled={isCreating}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          {isCreating
            ? '생성 중...'
            : '새 게시글'}
        </Button>
      </div>

      {/* 게시글 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>게시글 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {isPending
            ? (
              <div className='flex items-center justify-center py-8'>
                <div className='text-muted-foreground'>로딩 중...</div>
              </div>
            )
            : posts.length === 0
              ? (
                <div className='flex items-center justify-center py-8'>
                  <div className='text-muted-foreground'>게시글이 없습니다.</div>
                </div>
              )
              : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>제목</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>작성일</TableHead>
                      <TableHead>수정일</TableHead>
                      <TableHead className='text-right'>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post: SelectPostListItemType) => (
                      <TableRow key={post.postNo}>
                        <TableCell className='font-medium'>
                          {post.postTtl || '(제목 없음)'}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(post.postStts)}
                        </TableCell>
                        <TableCell>{formatDate(post.crtDt)}</TableCell>
                        <TableCell>{formatDate(post.updtDt)}</TableCell>
                        <TableCell className='text-right'>
                          <div className='flex items-center justify-end gap-2'>
                        <Button variant='ghost' size='sm' asChild>
                          <Link href={`/admin/dashboard/posts/${post.postCd}/edit`}>
                            <Edit className='h-4 w-4' />
                          </Link>
                        </Button>
                        <Button variant='ghost' size='sm' asChild>
                          <Link href={`/posts/${post.postCd}`} target='_blank'>
                            <Eye className='h-4 w-4' />
                          </Link>
                        </Button>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleDeletePost(post.postNo)}
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
        </CardContent>
      </Card>
    </div>
  );
}
