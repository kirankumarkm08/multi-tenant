import { apiClient } from '../client';
import { TicketType, CreateTicketRequest, PaginatedResponse } from '../types';

export class TicketsService {
  async getTickets(eventId: string, params?: {
    page?: number;
    per_page?: number;
    status?: string;
  }) {
    return apiClient.get<PaginatedResponse<TicketType>>(`/api/events/${eventId}/tickets`, params);
  }

  async getTicket(eventId: string, ticketId: string) {
    return apiClient.get<TicketType>(`/api/events/${eventId}/tickets/${ticketId}`);
  }

  async createTicket(data: CreateTicketRequest) {
    return apiClient.post<TicketType>('/api/tickets', data);
  }

  async updateTicket(id: string, data: Partial<CreateTicketRequest>) {
    return apiClient.put<TicketType>(`/api/tickets/${id}`, data);
  }

  async deleteTicket(id: string) {
    return apiClient.delete(`/api/tickets/${id}`);
  }

  async duplicateTicket(id: string, data: { name: string }) {
    return apiClient.post<TicketType>(`/api/tickets/${id}/duplicate`, data);
  }

  async updateTicketStatus(id: string, status: 'active' | 'inactive' | 'sold-out') {
    return apiClient.patch<TicketType>(`/api/tickets/${id}/status`, { status });
  }

  async getTicketSales(id: string, params?: { period?: string }) {
    return apiClient.get(`/api/tickets/${id}/sales`, params);
  }
}

export const ticketsService = new TicketsService();