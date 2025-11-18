/**
 * Support Service
 * 고객지원 관련 API 호출
 */

import { api } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants';

export interface CreateTicketRequest {
  subject: string;
  message: string;
  category: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  category: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string;
  replies?: TicketReply[];
}

export interface TicketReply {
  id: string;
  ticketId: string;
  message: string;
  isStaff: boolean;
  createdAt: string;
}

export interface NewsletterRequest {
  email: string;
}

export const supportService = {
  /**
   * 지원 티켓 생성
   */
  createTicket: async (data: CreateTicketRequest): Promise<{ ticket: SupportTicket }> => {
    return api.post<{ ticket: SupportTicket }>(API_ENDPOINTS.SUPPORT_TICKETS, data);
  },

  /**
   * 내 티켓 목록 조회
   */
  getMyTickets: async (): Promise<{ tickets: SupportTicket[] }> => {
    return api.get<{ tickets: SupportTicket[] }>(API_ENDPOINTS.SUPPORT_TICKETS);
  },

  /**
   * 뉴스레터 구독
   */
  subscribeNewsletter: async (data: NewsletterRequest): Promise<{ newsletter: any }> => {
    return api.post<{ newsletter: any }>(API_ENDPOINTS.NEWSLETTER, data);
  },
};
