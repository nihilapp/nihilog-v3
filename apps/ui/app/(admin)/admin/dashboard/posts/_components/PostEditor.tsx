'use client';

import { Save, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/(common)/_components/ui/badge';
import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Input } from '@/(common)/_components/ui/input';
import { Label } from '@/(common)/_components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/(common)/_components/ui/select';
import { Textarea } from '@/(common)/_components/ui/textarea';
import { useGetPostBySlug } from '@/_entities/posts/hooks/use-get-post-by-slug';
import type { SelectPostType } from '@/_types';

interface PostEditorProps {
  postCd: string;
}

export function PostEditor({ postCd, }: PostEditorProps) {
  const router = useRouter();
  const [ isNewPost, ] = useState(postCd === 'new');

  // 포스트 데이터 가져오기 (새 포스트도 포함)
  const {
    response: postData,
    isPending: isLoadingPost,
  } = useGetPostBySlug(postCd);

  const [
    post, setPost,
  ] = useState<Partial<SelectPostType>>({
    postCd: postCd,
    postTtl: '',
    postCntn: '',
    postStts: 'EMPTY',
    crtDt: new Date().toISOString().split('T')[0],
    updtDt: new Date().toISOString().split('T')[0],
  });
  const [
    isLoading, setIsLoading,
  ] = useState(false);

  // API에서 가져온 데이터로 포스트 상태 업데이트
  useEffect(() => {
    if (postData?.data) {
      setPost(postData.data);
    }
  }, [ postData, ]);

  const handleSave = async (status: 'EMPTY' | 'WRITING' | 'FINISHED' = 'EMPTY') => {
    if (!post.postTtl?.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 포스트 저장
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 지연

      const updatedPost = {
        ...post,
        postStts: status,
        updtDt: new Date().toISOString().split('T')[0],
      };

      setPost(updatedPost);

      toast.success(
        status === 'FINISHED'
          ? '게시글이 발행되었습니다.'
          : '게시글이 저장되었습니다.'
      );

      // 새 포스트인 경우 목록으로 이동
      if (isNewPost) {
        router.push('/admin/dashboard/posts');
      }
    }
    catch (error) {
      toast.error('저장에 실패했습니다.');
    }
    finally {
      setIsLoading(false);
    }
  };

  const handlePublish = () => handleSave('FINISHED');

  const handlePreview = () => {
    // TODO: 미리보기 모달 또는 새 탭에서 미리보기
    toast.info('미리보기 기능은 준비 중입니다.');
  };

  // 로딩 중일 때 표시
  if (isLoadingPost) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-muted-foreground'>게시글을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/admin/dashboard/posts'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              목록으로
            </Link>
          </Button>
          <div>
            <h1 className='text-3xl font-bold'>
              {isNewPost
                ? '새 게시글 작성'
                : '게시글 편집'}
            </h1>
            <p className='text-muted-foreground'>
              {isNewPost
                ? '새로운 게시글을 작성하세요.'
                : '게시글을 편집하세요.'}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Badge variant={post.postStts === 'FINISHED'
            ? 'default'
            : 'secondary'}
          >
            {post.postStts === 'FINISHED'
              ? '발행됨'
              : post.postStts === 'WRITING'
                ? '작성중'
                : '초안'}
          </Badge>
          <Button variant='outline' onClick={handlePreview}>
            <Eye className='h-4 w-4 mr-2' />
            미리보기
          </Button>
          <Button
            variant='outline'
            onClick={() => handleSave('WRITING')}
            disabled={isLoading}
          >
            <Save className='h-4 w-4 mr-2' />
            {isLoading
              ? '저장 중...'
              : '임시저장'}
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isLoading}
          >
            <Save className='h-4 w-4 mr-2' />
            {isLoading
              ? '발행 중...'
              : '발행하기'}
          </Button>
        </div>
      </div>

      {/* 편집 폼 */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* 메인 편집 영역 */}
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>게시글 내용</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='title'>제목</Label>
                <Input
                  id='title'
                  value={post.postTtl || ''}
                  onChange={(e) => setPost((prev) => ({ ...prev, postTtl: e.target.value, }))}
                  placeholder='게시글 제목을 입력하세요'
                  className='text-lg'
                />
              </div>

              <div>
                <Label htmlFor='content'>내용</Label>
                <Textarea
                  id='content'
                  value={post.postCntn || ''}
                  onChange={(e) => setPost((prev) => ({ ...prev, postCntn: e.target.value, }))}
                  placeholder='게시글 내용을 입력하세요'
                  className='min-h-[400px] resize-none'
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>게시글 설정</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='status'>상태</Label>
                <Select
                  value={post.postStts}
                  onValueChange={(value: 'EMPTY' | 'WRITING' | 'FINISHED') =>
                    setPost((prev) => ({ ...prev, postStts: value, }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='EMPTY'>초안</SelectItem>
                    <SelectItem value='WRITING'>작성중</SelectItem>
                    <SelectItem value='FINISHED'>발행됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>작성일</Label>
                <Input value={post.crtDt || ''} disabled />
              </div>

              <div>
                <Label>수정일</Label>
                <Input value={post.updtDt || ''} disabled />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
