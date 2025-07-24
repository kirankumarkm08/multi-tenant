import { apiClient } from '../client';
import { Analytics } from '../types';

export class AnalyticsService {
  async getAnalytics(params?: {
    event_edition_id?: string;
    period?: 'day' | 'week' | 'month' | 'year';
    date_from?: string;
    date_to?: string;
  }) {
    return apiClient.get<Analytics>('/api/analytics', params);
  }

  async getRevenueAnalytics(params?: {
    event_edition_id?: string;
    period?: 'day' | 'week' | 'month' | 'year';
    date_from?: string;
    date_to?: string;
  }) {
    return apiClient.get('/api/analytics/revenue', params);
  }

  async getTicketAnalytics(params?: {
    event_edition_id?: string;
    period?: 'day' | 'week' | 'month' | 'year';
    date_from?: string;
    date_to?: string;
  }) {
    return apiClient.get('/api/analytics/tickets', params);
  }

  async getAttendeeAnalytics(params?: {
    event_edition_id?: string;
    period?: 'day' | 'week' | 'month' | 'year';
  }) {
    return apiClient.get('/api/analytics/attendees', params);
  }

  async getConversionAnalytics(params?: {
    event_edition_id?: string;
    period?: 'day' | 'week' | 'month' | 'year';
  }) {
    return apiClient.get('/api/analytics/conversion', params);
  }

  async exportAnalytics(params?: {
    event_edition_id?: string;
    type: 'revenue' | 'tickets' | 'attendees' | 'conversion';
    format?: 'csv' | 'xlsx' | 'pdf';
    date_from?: string;
    date_to?: string;
  }) {
    return apiClient.get('/api/analytics/export', params);
  }
}

export const analyticsService = new AnalyticsService();