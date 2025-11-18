/**
 * User Service
 * 사용자 관련 API 호출
 */

import { api } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants';

export interface Wishlist {
  id: string;
  userId: string;
  templateId: string;
  createdAt: string;
  template: any;
}

export const userService = {
  /**
   * 찜하기 목록 조회
   */
  getWishlist: async (): Promise<{ wishlist: Wishlist[] }> => {
    return api.get<{ wishlist: Wishlist[] }>(API_ENDPOINTS.WISHLIST);
  },

  /**
   * 찜하기 추가
   */
  addToWishlist: async (templateId: string): Promise<{ wishlist: Wishlist }> => {
    return api.post<{ wishlist: Wishlist }>(
      API_ENDPOINTS.WISHLIST_ITEM(templateId)
    );
  },

  /**
   * 찜하기 제거
   */
  removeFromWishlist: async (templateId: string): Promise<{ message: string }> => {
    return api.delete<{ message: string }>(
      API_ENDPOINTS.WISHLIST_ITEM(templateId)
    );
  },
};
