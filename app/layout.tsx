import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TenantProvider } from '@/lib/contexts/tenant-context';
import { AuthProvider } from '@/lib/contexts/auth-context';
import { ThemeProvider } from '@/lib/hooks/use-theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EventFlow SaaS - Multi-Tenant Event Management',
  description: 'Professional event management platform with multi-tenant support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <TenantProvider> */}
         
          
              {children}
            
        
        {/* </TenantProvider> */}
      </body>
    </html>
  );
}