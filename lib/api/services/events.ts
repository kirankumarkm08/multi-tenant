import { apiClient } from '../client';
import { EventEdition, CreateEventRequest, PaginatedResponse } from '../types';

export class EventsService {
  async getEvents(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
  }) {
    return apiClient.get<PaginatedResponse<EventEdition>>('/api/events', params);
  }

  async getEvent(id: string) {
    return apiClient.get<EventEdition>(`/api/events/${id}`);
  }

  async createEvent(data: CreateEventRequest) {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    return apiClient.upload<EventEdition>('/api/events', formData);
  }

  async updateEvent(id: string, data: Partial<CreateEventRequest>) {
    if (data.image instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, String(value));
        }
      });
      return apiClient.upload<EventEdition>(`/api/events/${id}`, formData);
    }

    return apiClient.put<EventEdition>(`/api/events/${id}`, data);
  }

  async deleteEvent(id: string) {
    return apiClient.delete(`/api/events/${id}`);
  }

  async duplicateEvent(id: string, data: { name: string; start_date: string; end_date: string }) {
    return apiClient.post<EventEdition>(`/api/events/${id}/duplicate`, data);
  }

  async publishEvent(id: string) {
    return apiClient.patch<EventEdition>(`/api/events/${id}/publish`);
  }

  async getEventAnalytics(id: string, params?: { period?: string }) {
    return apiClient.get(`/api/events/${id}/analytics`, params);
  }
}

export const eventsService = new EventsService();