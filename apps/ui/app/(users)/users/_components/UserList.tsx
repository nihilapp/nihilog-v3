'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PaginationState } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { DataTable } from '@/(common)/_components/ui/data-table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import { useGetUsers } from '@/_entities/users/hooks';
import { searchUserSchema, type SearchUserType } from '@/_schemas/user.schema';

import { columns } from './columns';

export function UserList() {
  const [
    { pageIndex, pageSize, }, setPagination,
  ] = useState<PaginationState>({ pageIndex: 0, pageSize: 10, });
  const [
    currentSearch, setCurrentSearch,
  ] = useState<{ srchType: string; srchKywd: string }>({
    srchType: 'userNm',
    srchKywd: '',
  });

  // 검색 폼
  const searchForm = useForm<SearchUserType>({
    resolver: zodResolver(searchUserSchema),
    defaultValues: {
      strtRow: 0,
      endRow: 10,
      srchType: 'userNm',
      srchKywd: '',
    },
  });

  // 현재 검색 조건으로 사용자 목록 조회
  const searchParams: SearchUserType = {
    ...currentSearch,
    strtRow: pageIndex * pageSize,
    endRow: (pageIndex + 1) * pageSize,
    srchType: currentSearch.srchType as 'userNm' | 'emlAddr',
  };

  const {
    users,
    loading,
    error,
  } = useGetUsers(searchParams);

  // 검색 실행 함수
  const handleSearch = useCallback((formData: SearchUserType) => {
    const newSearch = {
      srchType: formData.srchType || 'userNm',
      srchKywd: formData.srchKywd || '',
    };
    setCurrentSearch(newSearch);
    setPagination({ pageIndex: 0, pageSize, }); // 페이지를 첫 페이지로 리셋
  }, [ pageSize, ]);

  // API 응답에서 list와 totalCnt 추출
  const userList = users?.data?.list || [];
  const total = users?.data?.totalCnt || 0;

  const pageCount = total
    ? Math.ceil(total / pageSize)
    : 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !users) {
    return <div>Error fetching users.</div>;
  }

  return (
    <div className='space-y-4'>
      {/* 검색 폼 */}
      <div className='p-4 border rounded-lg bg-card'>
        <h3 className='text-lg font-semibold mb-4'>사용자 검색</h3>
        <Form {...searchForm}>
          <form
            onSubmit={searchForm.handleSubmit(handleSearch)}
            className='flex gap-4 items-end'
          >
            <div className='flex-1'>
              <FormInput
                form={searchForm}
                name='srchKywd'
                label='검색어'
                placeholder='검색할 내용을 입력하세요'
                type='text'
              />
            </div>
            <div className='w-32'>
              <FormField
                control={searchForm.control}
                name='srchType'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>검색 타입</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || 'userNm'}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='검색 타입' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='userNm'>사용자명</SelectItem>
                        <SelectItem value='emlAddr'>이메일</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <SubmitButton
                isPending={loading}
                disabled={!searchForm.formState.isValid}
              >
                검색
              </SubmitButton>
            </div>
          </form>
        </Form>
      </div>

      {/* 사용자 목록 테이블 */}
      <DataTable
        columns={columns}
        data={userList}
        filterKey='emlAddr'
        pageCount={pageCount}
        pagination={{ pageIndex, pageSize, }}
        onPaginationChange={setPagination}
      />
    </div>
  );
}
