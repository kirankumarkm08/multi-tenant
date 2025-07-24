import { apiClient } from '../client';
import { User } from '../types';

export class AuthService {
  async login(email: string, password: string, domain?: string) {
    const response = await apiClient.post<{
      user: User;
      token: string;
      expires_in: number;
    }>('/api/auth/login', {
      email,
      password,
      domain
    });

    if (response.data.token) {
      apiClient.setAuth(response.data.token);
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    domain?: string;
  }) {
    return apiClient.post<{
      user: User;
      token: string;
      expires_in: number;
    }>('/api/auth/register', data);
  }

  async logout() {
    try {
      await apiClient.post('/api/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      apiClient.setAuth('');
    }
  }

  async me() {
    return apiClient.get<User>('/api/auth/me');
  }

  async refreshToken() {
    const response = await apiClient.post<{
      token: string;
      expires_in: number;
    }>('/api/auth/refresh');

    if (response.data.token) {
      apiClient.setAuth(response.data.token);
      localStorage.setItem('auth_token', response.data.token);
    }

    return response;
  }

  async forgotPassword(email: string, domain?: string) {
    return apiClient.post('/api/auth/forgot-password', { email, domain });
  }

  async resetPassword(data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return apiClient.post('/api/auth/reset-password', data);
  }

  async verifyEmail(token: string) {
    return apiClient.post('/api/auth/verify-email', { token });
  }

  async resendVerification() {
    return apiClient.post('/api/auth/resend-verification');
  }

  initializeFromStorage() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      apiClient.setAuth(token);
    }
  }
}

export const authService = new AuthService();