'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { tenantsService } from '@/lib/api/services/tenants';
import { Tenant } from '@/lib/api/types';
import { apiClient } from '@/lib/api/client';

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
  updateTenant: (updates: Partial<Tenant>) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const domain = typeof window !== 'undefined' ? window.location.hostname : 'demo.eventflow.com';
        
        // Set tenant domain for API client
        apiClient.setTenant(domain);
        
        // Fetch tenant data from API
        const response = await tenantsService.getTenantByDomain(domain);
        setTenant(response.data);
      } catch (error) {
        console.error('Failed to fetch tenant data:', error);
        // Fallback to mock data for development
        const mockTenant: Tenant = {
          id: '1',
          name: 'RareEvo Conference',
          domain: typeof window !== 'undefined' ? window.location.hostname : 'demo.eventflow.com',
          logo: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
          primary_color: '#3B82F6',
          secondary_color: '#10B981',
          font_family: 'Inter',
          plan: 'pro',
          settings: {
            modules_enabled: ['speakers', 'blog', 'tickets'],
            payment_methods: ['credit-card', 'web3'],
            features: {
              nft_enabled: true,
              multi_language: false,
              custom_domain: true
            }
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setTenant(mockTenant);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, []);

  const updateTenant = (updates: Partial<Tenant>) => {
    setTenant(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <TenantContext.Provider value={{ tenant, loading, updateTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}