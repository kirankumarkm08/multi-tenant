import { apiClient } from '../client';
import { Attendee, PaginatedResponse } from '../types';

export class AttendeesService {
  async getAttendees(eventId: string, params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    ticket_type?: string;
  }) {
    return apiClient.get<PaginatedResponse<Attendee>>(`/api/events/${eventId}/attendees`, params);
  }

  async getAttendee(eventId: string, attendeeId: string) {
    return apiClient.get<Attendee>(`/api/events/${eventId}/attendees/${attendeeId}`);
  }

  async checkInAttendee(id: string) {
    return apiClient.patch<Attendee>(`/api/attendees/${id}/check-in`);
  }

  async bulkCheckIn(attendeeIds: string[]) {
    return apiClient.post('/api/attendees/bulk-check-in', { attendee_ids: attendeeIds });
  }

  async sendEmail(attendeeIds: string[], data: {
    subject: string;
    message: string;
    template?: string;
  }) {
    return apiClient.post('/api/attendees/send-email', {
      attendee_ids: attendeeIds,
      ...data
    });
  }

  async exportAttendees(eventId: string, format: 'csv' | 'xlsx' = 'csv') {
    return apiClient.get(`/api/events/${eventId}/attendees/export`, { format });
  }

  async getQRCode(attendeeId: string) {
    return apiClient.get<{ qr_code_url: string }>(`/api/attendees/${attendeeId}/qr-code`);
  }

  async validateQRCode(qrCode: string) {
    return apiClient.post<Attendee>('/api/attendees/validate-qr', { qr_code: qrCode });
  }

  async getAttendeeStats(eventId: string) {
    return apiClient.get(`/api/events/${eventId}/attendees/stats`);
  }
}

export const attendeesService = new AttendeesService();