import { apiClient } from '../client';
import { BlogPost, CreateBlogPostRequest, PaginatedResponse } from '../types';

export class BlogService {
  async getPosts(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    tag?: string;
    event_edition_id?: string;
  }) {
    return apiClient.get<PaginatedResponse<BlogPost>>('/api/blog/posts', params);
  }

  async getPost(id: string) {
    return apiClient.get<BlogPost>(`/api/blog/posts/${id}`);
  }

  async getPostBySlug(slug: string) {
    return apiClient.get<BlogPost>('/api/blog/posts/by-slug', { slug });
  }

  async createPost(data: CreateBlogPostRequest) {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    return apiClient.upload<BlogPost>('/api/blog/posts', formData);
  }

  async updatePost(id: string, data: Partial<CreateBlogPostRequest>) {
    if (data.image instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined) {
          formData.append(key, String(value));
        }
      });
      return apiClient.upload<BlogPost>(`/api/blog/posts/${id}`, formData);
    }

    return apiClient.put<BlogPost>(`/api/blog/posts/${id}`, data);
  }

  async deletePost(id: string) {
    return apiClient.delete(`/api/blog/posts/${id}`);
  }

  async publishPost(id: string) {
    return apiClient.patch<BlogPost>(`/api/blog/posts/${id}/publish`);
  }

  async getTags() {
    return apiClient.get<string[]>('/api/blog/tags');
  }

  async getPostStats(id: string) {
    return apiClient.get(`/api/blog/posts/${id}/stats`);
  }
}

export const blogService = new BlogService();