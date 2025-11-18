/**
 * useTemplates Hook
 * React Query를 사용한 템플릿 데이터 관리
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { templateService, type TemplateFilters, type TemplatesResponse } from '../services/template.service';

export const TEMPLATE_QUERY_KEYS = {
  all: ['templates'] as const,
  lists: () => [...TEMPLATE_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: TemplateFilters) => [...TEMPLATE_QUERY_KEYS.lists(), filters] as const,
  details: () => [...TEMPLATE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TEMPLATE_QUERY_KEYS.details(), id] as const,
};

/**
 * 템플릿 목록 조회
 */
export function useTemplates(
  filters?: TemplateFilters,
  options?: Omit<UseQueryOptions<TemplatesResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TemplatesResponse, Error>({
    queryKey: TEMPLATE_QUERY_KEYS.list(filters),
    queryFn: () => templateService.getTemplates(filters),
    ...options,
  });
}

/**
 * 템플릿 상세 조회
 */
export function useTemplate(
  id: string,
  options?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<any, Error>({
    queryKey: TEMPLATE_QUERY_KEYS.detail(id),
    queryFn: () => templateService.getTemplate(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    ...options,
  });
}
