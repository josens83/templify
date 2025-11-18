/**
 * useReviews Hook
 * React Query를 사용한 리뷰 데이터 관리
 */

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { reviewService, type CreateReviewRequest } from '../services/review.service';

export const REVIEW_QUERY_KEYS = {
  all: ['reviews'] as const,
  lists: () => [...REVIEW_QUERY_KEYS.all, 'list'] as const,
  list: (templateId?: string) => [...REVIEW_QUERY_KEYS.lists(), templateId] as const,
};

/**
 * 템플릿 리뷰 목록 조회
 */
export function useTemplateReviews(
  templateId: string,
  options?: Omit<UseQueryOptions<{ reviews: any[] }, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<{ reviews: any[] }, Error>({
    queryKey: REVIEW_QUERY_KEYS.list(templateId),
    queryFn: () => reviewService.getTemplateReviews(templateId),
    enabled: !!templateId,
    ...options,
  });
}

/**
 * 리뷰 생성 (Mutation)
 */
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) => reviewService.createReview(data),
    onSuccess: (_, variables) => {
      // 해당 템플릿의 리뷰 목록 무효화 및 재조회
      queryClient.invalidateQueries({ queryKey: REVIEW_QUERY_KEYS.list(variables.templateId) });
    },
  });
}
