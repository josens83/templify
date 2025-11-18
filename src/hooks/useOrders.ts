/**
 * useOrders Hook
 * React Query를 사용한 주문 데이터 관리
 */

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { orderService, type CreateOrderRequest } from '../services/order.service';

export const ORDER_QUERY_KEYS = {
  all: ['orders'] as const,
  lists: () => [...ORDER_QUERY_KEYS.all, 'list'] as const,
  list: (userId?: string) => [...ORDER_QUERY_KEYS.lists(), userId] as const,
  details: () => [...ORDER_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ORDER_QUERY_KEYS.details(), id] as const,
};

/**
 * 내 주문 목록 조회
 */
export function useMyOrders(
  options?: Omit<UseQueryOptions<{ orders: any[] }, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<{ orders: any[] }, Error>({
    queryKey: ORDER_QUERY_KEYS.lists(),
    queryFn: () => orderService.getMyOrders(),
    ...options,
  });
}

/**
 * 주문 상세 조회
 */
export function useOrder(
  id: string,
  options?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<any, Error>({
    queryKey: ORDER_QUERY_KEYS.detail(id),
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * 주문 생성 (Mutation)
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => orderService.createOrder(data),
    onSuccess: () => {
      // 주문 목록 무효화 및 재조회
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.lists() });
    },
  });
}
