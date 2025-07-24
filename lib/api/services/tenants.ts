import { apiClient } from '../client';
import { Tenant } from '../types';

export class TenantsService {
  async getTenantByDomain(domain: string) {
    return apiClient.get<Tenant>('/api/tenants/by-domain', { domain });
  }

  async updateTenant(id: string, data: Partial<{
    name: string;
    logo: File;
    primary_color: string;
    secondary_color: string;
    font_family: string;
    settings: Record<string, any>;
  }>) {
    if (data.logo instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined) {
          formData.append(key, String(value));
        }
      });
      return apiClient.upload<Tenant>(`/api/tenants/${id}`, formData);
    }

    return apiClient.put<Tenant>(`/api/tenants/${id}`, data);
  }

  async getTenantSettings(id: string) {
    return apiClient.get<Tenant['settings']>(`/api/tenants/${id}/settings`);
  }

  async updateTenantSettings(id: string, settings: Record<string, any>) {
    return apiClient.put<Tenant>(`/api/tenants/${id}/settings`, { settings });
  }

  async getTenantStats(id: string) {
    return apiClient.get(`/api/tenants/${id}/stats`);
  }
}

export const tenantsService = new TenantsService();