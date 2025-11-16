import type { Review } from '../types';

export const reviews: Review[] = [
  {
    id: 'r1',
    authorName: '김철수',
    authorAvatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    comment: '정말 훌륭한 템플릿입니다! 문서화도 잘 되어있고 커스터마이징이 쉬워요. 프로젝트에 바로 적용했습니다.',
    date: '2025-11-10',
    helpful: 24,
  },
  {
    id: 'r2',
    authorName: '이영희',
    authorAvatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4,
    comment: '전반적으로 만족스럽습니다. 코드 품질이 좋고 반응형도 완벽해요. 다만 IE 지원이 없어서 별 하나 뺐습니다.',
    date: '2025-11-08',
    helpful: 18,
  },
  {
    id: 'r3',
    authorName: '박민수',
    authorAvatar: 'https://i.pravatar.cc/150?img=34',
    rating: 5,
    comment: '가격 대비 최고의 템플릿입니다. 디자인도 세련되고 성능도 훌륭합니다. 강력 추천!',
    date: '2025-11-05',
    helpful: 31,
  },
  {
    id: 'r4',
    authorName: '정수진',
    authorAvatar: 'https://i.pravatar.cc/150?img=35',
    rating: 5,
    comment: '개발 시간을 엄청나게 절약했어요. 컴포넌트가 모듈화되어 있어서 재사용하기 좋습니다.',
    date: '2025-11-03',
    helpful: 15,
  },
  {
    id: 'r5',
    authorName: '최동욱',
    authorAvatar: 'https://i.pravatar.cc/150?img=36',
    rating: 4,
    comment: '좋은 템플릿이에요. 하지만 한글 폰트 최적화가 더 필요할 것 같습니다.',
    date: '2025-11-01',
    helpful: 9,
  },
];

export const getReviewsByTemplateId = (_templateId: string): Review[] => {
  // 모든 템플릿에 동일한 리뷰 반환 (데모용)
  return reviews;
};

export const getReviewsByExpertId = (_expertId: string): Review[] => {
  // 모든 전문가에 동일한 리뷰 반환 (데모용)
  return reviews;
};
