/**
 * Order Service
 * 주문 관련 API 호출
 */

import { api } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants';

export interface OrderItem {
  templateId: string;
  price: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  total: number;
  paymentMethod: string;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
  paymentMethod: string;
  createdAt: string;
  items: Array<{
    id: string;
    price: number;
    template: any;
  }>;
}

export const orderService = {
  /**
   * 주문 생성
   */
  createOrder: async (data: CreateOrderRequest): Promise<{ order: Order }> => {
    return api.post<{ order: Order }>(API_ENDPOINTS.ORDERS, data);
  },

  /**
   * 내 주문 목록 조회
   */
  getMyOrders: async (): Promise<{ orders: Order[] }> => {
    return api.get<{ orders: Order[] }>(API_ENDPOINTS.MY_ORDERS);
  },

  /**
   * 특정 주문 상세 조회
   */
  getOrder: async (id: string): Promise<{ order: Order }> => {
    return api.get<{ order: Order }>(API_ENDPOINTS.ORDER_DETAIL(id));
  },
};
