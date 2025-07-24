'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import { useTenant } from '@/lib/contexts/tenant-context';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  // const { isAuthenticated, isAdmin } = useAuth();
  // const { tenant, loading } = useTenant();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && (!isAuthenticated || !isAdmin)) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, isAdmin, loading, router]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-pulse">Loading...</div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated || !isAdmin) {
  //   return null;
  // }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}