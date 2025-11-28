'use client';

import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { MdEdit, MdDelete, MdArrowBack } from 'react-icons/md';

import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { useAdminDeletePost } from '@/_hooks/admin/posts/use-admin-delete-post';
import { useAlert } from '@/_hooks/common/use-alert';
import { useGetPostByNo } from '@/_hooks/posts';
import { usePostActions } from '@/_stores/posts.store';

interface Props {
  postNo: number;
}

export function AdminPostDetail({ postNo, ...props }: Props) {
  const router = useRouter();
  const { response, loading, done, } = useGetPostByNo(postNo);
  const { triggerConfirm, } = useAlert();
  const { setEditMode, } = usePostActions();
  const deletePost = useAdminDeletePost(postNo);

  const onEdit = () => {
    setEditMode('update');

    router.push(`/admin/posts/editor?pstNo=${postNo}`);
  };

  const onDelete = () => {
    if (!response?.data) return;

    triggerConfirm(
      `포스트 "${response.data.pstTtl}"을(를) 삭제하시겠습니까?`,
      () => {
        deletePost.mutate();
      }
    );
  };

  const onBackToList = () => {
    router.push('/admin/dashboard/posts');
  };

  return (
    <Box.Panel
      panel={false}
      {...props}
    >
      {loading && (
        <Loading message='포스트를 불러오는 중...' />
      )}
      {done && response?.data && (
        <>
          <Box.Top title={response.data.pstTtl}>
            <Box.Action>
              <Button.Action
                icon={<MdArrowBack />}
                label='목록'
                onClick={onBackToList}
                className='hover:button-normal-black-900'
              />
              <Button.Action
                icon={<MdEdit />}
                label='수정'
                onClick={onEdit}
                className='hover:button-normal-black-900'
              />
              <Button.Action
                icon={<MdDelete />}
                label='삭제'
                onClick={onDelete}
                className='button-normal-red-500 hover:button-normal-red-600'
              />
            </Box.Action>
          </Box.Top>

          <Box.Content>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <h3 className='text-h6 font-bold'>기본 정보</h3>
                <div className='flex flex-col gap-2 p-4 bg-black-50 rounded-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-700 text-black-700 w-24 shrink-0'>제목:</span>
                    <span className='text-sm text-black-900'>{response.data.pstTtl}</span>
                  </div>
                  {response.data.category && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-700 text-black-700 w-24 shrink-0'>카테고리:</span>
                      <Input.TextItem
                        text={response.data.category.ctgryNm}
                        custom={{
                          item: 'w-auto',
                        }}
                      />
                    </div>
                  )}
                  {response.data.publDt && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-700 text-black-700 w-24 shrink-0'>발행일:</span>
                      <span className='text-sm text-black-900'>
                        {DateTime.fromISO(response.data.publDt).toFormat('yyyy년 MM월 dd일 HH:mm:ss')}
                      </span>
                    </div>
                  )}
                  {response.data.crtDt && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-700 text-black-700 w-24 shrink-0'>등록일:</span>
                      <span className='text-sm text-black-900'>
                        {DateTime.fromISO(response.data.crtDt).toFormat('yyyy년 MM월 dd일 HH:mm:ss')}
                      </span>
                    </div>
                  )}
                  {response.data.updtDt && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-700 text-black-700 w-24 shrink-0'>수정일:</span>
                      <span className='text-sm text-black-900'>
                        {DateTime.fromISO(response.data.updtDt).toFormat('yyyy년 MM월 dd일 HH:mm:ss')}
                      </span>
                    </div>
                  )}
                  {response.data.pstSmry && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-700 text-black-700 w-24 shrink-0'>요약:</span>
                      <span className='text-sm text-black-900'>{response.data.pstSmry}</span>
                    </div>
                  )}
                  {response.data.pstView !== undefined && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-700 text-black-700 w-24 shrink-0'>조회수:</span>
                      <span className='text-sm text-black-900'>{response.data.pstView}</span>
                    </div>
                  )}
                  {response.data.pstStts && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-700 text-black-700 w-24 shrink-0'>상태:</span>
                      <span className='text-sm text-black-900'>{response.data.pstStts}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Box.Content>
        </>
      )}
    </Box.Panel>
  );
}
