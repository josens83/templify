/**
 * Template Service
 * 템플릿 관련 API 호출
 */

import { api } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants';
import type { Template } from '../types';

export interface TemplateFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TemplatesResponse {
  templates: Template[];
  pagination: PaginationInfo;
}

export interface CreateTemplateRequest {
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  demoUrl: string;
  tags: string[];
  features: string[];
  files: string[];
}

export const templateService = {
  /**
   * 템플릿 목록 조회 (필터링, 정렬, 페이지네이션)
   */
  getTemplates: async (filters?: TemplateFilters): Promise<TemplatesResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const url = `${API_ENDPOINTS.TEMPLATES}?${params.toString()}`;
    return api.get<TemplatesResponse>(url);
  },

  /**
   * 특정 템플릿 상세 조회
   */
  getTemplate: async (id: string): Promise<{ template: Template }> => {
    return api.get<{ template: Template }>(API_ENDPOINTS.TEMPLATE_DETAIL(id));
  },

  /**
   * 템플릿 생성 (판매자 전용)
   */
  createTemplate: async (data: CreateTemplateRequest): Promise<{ template: Template }> => {
    return api.post<{ template: Template }>(API_ENDPOINTS.TEMPLATES, data);
  },

  /**
   * 템플릿 수정 (판매자 전용)
   */
  updateTemplate: async (
    id: string,
    data: Partial<CreateTemplateRequest>
  ): Promise<{ template: Template }> => {
    return api.put<{ template: Template }>(API_ENDPOINTS.TEMPLATE_DETAIL(id), data);
  },

  /**
   * 템플릿 삭제 (판매자 전용)
   */
  deleteTemplate: async (id: string): Promise<{ message: string }> => {
    return api.delete<{ message: string }>(API_ENDPOINTS.TEMPLATE_DETAIL(id));
  },
};
