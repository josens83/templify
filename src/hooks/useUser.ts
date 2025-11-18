/**
 * useUser Hook
 * React Query를 사용한 사용자 데이터 관리
 */

// import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
// import { userService } from '../services/user.service';

export const USER_QUERY_KEYS = {
  all: ['users'] as const,
  profile: () => [...USER_QUERY_KEYS.all, 'profile'] as const,
};

/**
 * TODO: 프로필 관련 hooks는 userService에 getMyProfile/updateProfile 메서드가 추가되면 구현
 */

// /**
//  * 내 프로필 조회
//  */
// export function useMyProfile(
//   options?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>
// ) {
//   return useQuery<any, Error>({
//     queryKey: USER_QUERY_KEYS.profile(),
//     queryFn: () => userService.getMyProfile(),
//     ...options,
//   });
// }

// /**
//  * 프로필 업데이트 (Mutation)
//  */
// export function useUpdateProfile() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: UpdateUserRequest) => userService.updateProfile(data),
//     onSuccess: () => {
//       // 프로필 정보 무효화 및 재조회
//       queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile() });
//     },
//   });
// }
