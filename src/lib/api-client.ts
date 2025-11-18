/**
 * API Client
 * Axios 기반 중앙화된 API 클라이언트
 */

import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from '../config';
import { getErrorMessage, logError } from '../utils/errors';

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - 인증 토큰 자동 추가
apiClient.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem(config.storage.authToken);
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => {
    logError(error, 'API Request Interceptor');
    return Promise.reject(error);
  }
);

// Response Interceptor - 에러 처리 통일
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = getErrorMessage(error);

    // 401 Unauthorized - 토큰 만료 시 로그아웃
    if (error.response?.status === 401) {
      localStorage.removeItem(config.storage.authToken);
      localStorage.removeItem(config.storage.user);
      window.location.href = '/login';
    }

    logError(error, 'API Response Interceptor');
    return Promise.reject(new Error(errorMessage));
  }
);

/**
 * 타입 안전한 API 요청 래퍼
 */
class ApiClient {
  /**
   * GET 요청
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  }

  /**
   * POST 요청
   */
  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT 요청
   */
  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PATCH 요청
   */
  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE 요청
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  }

  /**
   * 파일 업로드
   */
  async upload<T = any>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return response.data;
  }
}

export const api = new ApiClient();
export default apiClient;
