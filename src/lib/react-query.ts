/**
 * React Query 설정
 * 서버 상태 관리를 위한 Query Client 설정
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분간 캐시 유지
      staleTime: 1000 * 60 * 5,
      // 캐시 데이터 10분간 유지
      gcTime: 1000 * 60 * 10,
      // 백그라운드에서 자동 재검증
      refetchOnWindowFocus: false,
      // 네트워크 재연결 시 자동 재검증
      refetchOnReconnect: true,
      // 실패 시 재시도 횟수
      retry: 1,
      // 재시도 지연 시간
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // 실패 시 재시도 안 함
      retry: false,
    },
  },
});
