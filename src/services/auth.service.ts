/**
 * Auth Service
 * 인증 관련 API 호출
 */

import { api } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants';
import type { User } from '../types';
import { removeItem } from '../utils/storage';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: 'BUYER' | 'SELLER';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  /**
   * 회원가입
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER, data);
  },

  /**
   * 로그인
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, data);
  },

  /**
   * 현재 사용자 정보 조회
   */
  getCurrentUser: async (): Promise<{ user: User }> => {
    return api.get<{ user: User }>(API_ENDPOINTS.AUTH_ME);
  },

  /**
   * 로그아웃 (클라이언트 사이드)
   */
  logout: (): void => {
    // localStorage에서 토큰 및 사용자 정보 제거
    removeItem('templify_auth_token');
    removeItem('templify_user');
  },
};
