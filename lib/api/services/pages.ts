import { apiClient } from '../client';
import { Page, CreatePageRequest, UpdatePageComponentsRequest, PageComponent, PaginatedResponse } from '../types';

export class PagesService {
  async getPages(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    event_edition_id?: string;
  }) {
    return apiClient.get<PaginatedResponse<Page>>('/api/pages', params);
  }

  async getPage(id: string) {
    return apiClient.get<Page>(`/api/pages/${id}`);
  }

  async getPageBySlug(slug: string, eventEditionId?: string) {
    return apiClient.get<Page>('/api/pages/by-slug', { 
      slug, 
      event_edition_id: eventEditionId 
    });
  }

  async createPage(data: CreatePageRequest) {
    return apiClient.post<Page>('/api/pages', data);
  }

  async updatePage(id: string, data: Partial<CreatePageRequest>) {
    return apiClient.put<Page>(`/api/pages/${id}`, data);
  }

  async updatePageComponents(id: string, data: UpdatePageComponentsRequest) {
    return apiClient.put<Page>(`/api/pages/${id}/components`, data);
  }

  async deletePage(id: string) {
    return apiClient.delete(`/api/pages/${id}`);
  }

  async duplicatePage(id: string, data: { name: string; slug: string }) {
    return apiClient.post<Page>(`/api/pages/${id}/duplicate`, data);
  }

  async publishPage(id: string) {
    return apiClient.patch<Page>(`/api/pages/${id}/publish`);
  }

  async previewPage(id: string) {
    return apiClient.get<{ preview_url: string }>(`/api/pages/${id}/preview`);
  }

  async getPageTemplates() {
    return apiClient.get<{ name: string; description: string; components: PageComponent[] }[]>('/api/pages/templates');
  }

  async createFromTemplate(templateName: string, data: CreatePageRequest) {
    return apiClient.post<Page>('/api/pages/from-template', {
      template: templateName,
      ...data
    });
  }
}

export const pagesService = new PagesService();