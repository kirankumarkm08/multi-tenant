import { apiClient } from '../client';
import { Speaker, CreateSpeakerRequest, PaginatedResponse } from '../types';

export class SpeakersService {
  async getSpeakers(eventId: string, params?: {
    page?: number;
    per_page?: number;
    search?: string;
    featured?: boolean;
  }) {
    return apiClient.get<PaginatedResponse<Speaker>>(`/api/events/${eventId}/speakers`, params);
  }

  async getSpeaker(eventId: string, speakerId: string) {
    return apiClient.get<Speaker>(`/api/events/${eventId}/speakers/${speakerId}`);
  }

  async createSpeaker(data: CreateSpeakerRequest) {
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

    return apiClient.upload<Speaker>('/api/speakers', formData);
  }

  async updateSpeaker(id: string, data: Partial<CreateSpeakerRequest>) {
    if (data.image instanceof File) {
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
      return apiClient.upload<Speaker>(`/api/speakers/${id}`, formData);
    }

    return apiClient.put<Speaker>(`/api/speakers/${id}`, data);
  }

  async deleteSpeaker(id: string) {
    return apiClient.delete(`/api/speakers/${id}`);
  }

  async updateSpeakerFeatured(id: string, featured: boolean) {
    return apiClient.patch<Speaker>(`/api/speakers/${id}/featured`, { featured });
  }

  async bulkImportSpeakers(eventId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('event_edition_id', eventId);

    return apiClient.upload(`/api/speakers/bulk-import`, formData);
  }
}

export const speakersService = new SpeakersService();