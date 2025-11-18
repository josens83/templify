/**
 * Application Constants
 * 애플리케이션 전역 상수 관리
 */

// 템플릿 카테고리
export const TEMPLATE_CATEGORIES = {
  ECOMMERCE: 'ecommerce',
  PORTFOLIO: 'portfolio',
  SAAS: 'saas',
  BLOG: 'blog',
  ADMIN: 'admin',
  LANDING: 'landing',
} as const;

export const TEMPLATE_CATEGORY_LABELS: Record<string, string> = {
  [TEMPLATE_CATEGORIES.ECOMMERCE]: '쇼핑몰',
  [TEMPLATE_CATEGORIES.PORTFOLIO]: '포트폴리오',
  [TEMPLATE_CATEGORIES.SAAS]: 'SaaS 랜딩',
  [TEMPLATE_CATEGORIES.BLOG]: '블로그',
  [TEMPLATE_CATEGORIES.ADMIN]: '관리자 대시보드',
  [TEMPLATE_CATEGORIES.LANDING]: '랜딩 페이지',
};

// 사용자 역할
export const USER_ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
} as const;

// 주문 상태
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  [ORDER_STATUS.PENDING]: '대기중',
  [ORDER_STATUS.COMPLETED]: '완료',
  [ORDER_STATUS.CANCELLED]: '취소됨',
  [ORDER_STATUS.REFUNDED]: '환불됨',
};

// 티켓 상태
export const TICKET_STATUS = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
} as const;

export const TICKET_STATUS_LABELS: Record<string, string> = {
  [TICKET_STATUS.OPEN]: '열림',
  [TICKET_STATUS.IN_PROGRESS]: '처리중',
  [TICKET_STATUS.RESOLVED]: '해결됨',
  [TICKET_STATUS.CLOSED]: '닫힘',
};

// 우선순위
export const PRIORITY_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export const PRIORITY_LABELS: Record<string, string> = {
  [PRIORITY_LEVELS.LOW]: '낮음',
  [PRIORITY_LEVELS.MEDIUM]: '보통',
  [PRIORITY_LEVELS.HIGH]: '높음',
  [PRIORITY_LEVELS.URGENT]: '긴급',
};

// 멤버십 등급
export const MEMBERSHIP_TIERS = {
  BASIC: 'BASIC',
  PREMIUM: 'PREMIUM',
  VIP: 'VIP',
} as const;

export const MEMBERSHIP_TIER_LABELS: Record<string, string> = {
  [MEMBERSHIP_TIERS.BASIC]: '베이직',
  [MEMBERSHIP_TIERS.PREMIUM]: '프리미엄',
  [MEMBERSHIP_TIERS.VIP]: 'VIP',
};

// 페이지네이션 기본값
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  ITEMS_PER_PAGE_OPTIONS: [12, 24, 48],
} as const;

// 정렬 옵션
export const SORT_OPTIONS = {
  NEWEST: 'createdAt:desc',
  OLDEST: 'createdAt:asc',
  PRICE_LOW: 'price:asc',
  PRICE_HIGH: 'price:desc',
  POPULAR: 'downloads:desc',
  RATING: 'rating:desc',
} as const;

export const SORT_LABELS: Record<string, string> = {
  [SORT_OPTIONS.NEWEST]: '최신순',
  [SORT_OPTIONS.OLDEST]: '오래된순',
  [SORT_OPTIONS.PRICE_LOW]: '낮은 가격순',
  [SORT_OPTIONS.PRICE_HIGH]: '높은 가격순',
  [SORT_OPTIONS.POPULAR]: '인기순',
  [SORT_OPTIONS.RATING]: '평점순',
};

// Toast 메시지 타입
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;

// 정규식 패턴
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNAUTHORIZED: '로그인이 필요한 서비스입니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청하신 리소스를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
} as const;

// API 엔드포인트
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_ME: '/auth/me',

  // Templates
  TEMPLATES: '/templates',
  TEMPLATE_DETAIL: (id: string) => `/templates/${id}`,

  // Orders
  ORDERS: '/orders',
  MY_ORDERS: '/orders/my-orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,

  // Reviews
  TEMPLATE_REVIEWS: (templateId: string) => `/reviews/template/${templateId}`,
  REVIEWS: '/reviews',

  // Users
  WISHLIST: '/users/wishlist',
  WISHLIST_ITEM: (templateId: string) => `/users/wishlist/${templateId}`,

  // Support
  SUPPORT_TICKETS: '/support/tickets',
  NEWSLETTER: '/support/newsletter',
} as const;
