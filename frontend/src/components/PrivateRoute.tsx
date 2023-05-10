'use client';
import { ROUTES } from '@/constants/Routes';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const checkIsPrivateRoute = (path: string) => {
  const appPrivateRoutes = Object.values(ROUTES.private);
  return appPrivateRoutes.includes(path);
};

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { signed, loading } = useAuth();
  const { push } = useRouter();
  const path = usePathname();
  const isPrivateRoute = checkIsPrivateRoute(path);
  const isToShowPage =
    (!loading && !signed && !isPrivateRoute) || (!loading && signed && isPrivateRoute);

  useEffect(() => {
    if (!signed && isPrivateRoute) push(ROUTES.public.login);
    if (signed && !isPrivateRoute) push(ROUTES.private.home);
  }, [signed, push, isPrivateRoute]);

  return (
    <>
      {loading && <p className="text-white">loading...</p>}
      {isToShowPage && children}
      {!isToShowPage && null}
    </>
  );
};
