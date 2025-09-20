'use client';

import { NotShow } from '@/(common)/_components';
import { Card, CardContent, CardHeader } from '@/(common)/_components/ui/card';
import { useAuthCardHeader } from '@/_entities/auth/auth.store';
import { useGetSession } from '@/_entities/auth/hooks';

import { AppLogo } from './AppLogo';

interface Props {
  children: React.ReactNode;
}

export function AuthCard({ children, }: Props) {
  const { session, loading, } = useGetSession();

  const authCardHeader = useAuthCardHeader();

  return (
    !loading && session
      ? (
        <NotShow>
          {children}
        </NotShow>
      )
      : (
        <Card className='flex dvh-90 flex-col !py-0 !pb-6 w-[600px]'>
          <CardHeader className='px-6 pt-6'>
            <AppLogo />
            {authCardHeader.title && (
              <>
                <div className='mt-6 text-left space-y-2'>
                  <h2 className='text-h4 font-bold text-foreground leading-tight'>
                    {authCardHeader.title}
                  </h2>
                  {authCardHeader.description && (
                    <p className='text-md text-muted-foreground leading-relaxed'>
                      {authCardHeader.description}
                    </p>
                  )}
                </div>
                <div className='mt-6 border-t border-border' />
              </>
            )}
          </CardHeader>

          <CardContent className='flex-1 overflow-y-auto flex flex-col px-6'>
            {children}
          </CardContent>
        </Card>
      )
  );
}
