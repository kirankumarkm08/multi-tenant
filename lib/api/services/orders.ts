import { apiClient } from '../client';
import { Order, PaginatedResponse } from '../types';

export class OrdersService {
  async getOrders(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    payment_method?: string;
    event_edition_id?: string;
    date_from?: string;
    date_to?: string;
  }) {
    return apiClient.get<PaginatedResponse<Order>>('/api/orders', params);
  }

  async getOrder(id: string) {
    return apiClient.get<Order>(`/api/orders/${id}`);
  }

  async updateOrderStatus(id: string, status: 'completed' | 'pending' | 'failed' | 'refunded') {
    return apiClient.patch<Order>(`/api/orders/${id}/status`, { status });
  }

  async refundOrder(id: string, data: {
    amount?: number;
    reason: string;
    notify_customer: boolean;
  }) {
    return apiClient.post<Order>(`/api/orders/${id}/refund`, data);
  }

  async resendConfirmation(id: string) {
    return apiClient.post(`/api/orders/${id}/resend-confirmation`);
  }

  async exportOrders(params?: {
    status?: string;
    payment_method?: string;
    event_edition_id?: string;
    date_from?: string;
    date_to?: string;
    format?: 'csv' | 'xlsx';
  }) {
    return apiClient.get('/api/orders/export', params);
  }

  async getOrderStats(eventId?: string) {
    return apiClient.get('/api/orders/stats', eventId ? { event_edition_id: eventId } : {});
  }

  async processPayment(orderId: string, data: {
    payment_method: 'credit-card' | 'web3';
    payment_details: Record<string, any>;
  }) {
    return apiClient.post<Order>(`/api/orders/${orderId}/process-payment`, data);
  }
}

export const ordersService = new OrdersService();