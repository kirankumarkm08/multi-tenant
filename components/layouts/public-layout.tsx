'use client';

import { ReactNode } from 'react';
import { useTenant } from '@/lib/contexts/tenant-context';
import { Header } from '@/components/public/header';
import { Footer } from '@/components/public/footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  // const { tenant, loading } = useTenant();

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-pulse">
  //         <div className="w-32 h-8 bg-gray-300 rounded mb-4"></div>
  //         <div className="w-48 h-4 bg-gray-200 rounded"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}