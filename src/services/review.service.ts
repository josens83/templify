/**
 * Review Service
 * 리뷰 관련 API 호출
 */

import { api } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants';

export interface CreateReviewRequest {
  templateId: string;
  rating: number;
  comment: string;
}

export interface Review {
  id: string;
  templateId: string;
  userId: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export const reviewService = {
  /**
   * 템플릿의 리뷰 목록 조회
   */
  getTemplateReviews: async (templateId: string): Promise<{ reviews: Review[] }> => {
    return api.get<{ reviews: Review[] }>(
      API_ENDPOINTS.TEMPLATE_REVIEWS(templateId)
    );
  },

  /**
   * 리뷰 작성
   */
  createReview: async (data: CreateReviewRequest): Promise<{ review: Review }> => {
    return api.post<{ review: Review }>(API_ENDPOINTS.REVIEWS, data);
  },
};
