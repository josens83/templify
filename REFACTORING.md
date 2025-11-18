# 🚀 Templify 프로덕션 리팩토링 문서

## 📋 개요
Templify 코드베이스를 프로덕션급 SaaS 수준으로 리팩토링했습니다.

---

## ✨ 주요 개선 사항

### 1. **아키텍처 개선**

#### **계층 분리 (Layered Architecture)**
```
src/
├── config/          # 환경 설정 (타입 안전)
├── constants/       # 전역 상수
├── utils/           # 유틸리티 함수
├── lib/             # 외부 라이브러리 래퍼
├── services/        # API 서비스 레이어
├── components/      # UI 컴포넌트
└── pages/           # 페이지 컴포넌트
```

#### **관심사 분리 (Separation of Concerns)**
- **Config**: 환경 변수 관리
- **Constants**: 상수 중앙화
- **Utils**: 재사용 가능한 유틸리티
- **Services**: API 호출 로직 분리
- **Components**: UI 로직만 담당

---

### 2. **API 호출 구조 정규화**

#### **Before (문제점)**
```typescript
// 각 컴포넌트에서 직접 fetch 호출
fetch('/api/templates')
  .then(res => res.json())
  .catch(err => console.error(err));

// 에러 처리 불일치
// 인증 토큰 수동 관리
// 타입 안전성 부족
```

#### **After (개선)**
```typescript
// 중앙화된 API 클라이언트
import { templateService } from '@/services';

const templates = await templateService.getTemplates({
  category: 'ecommerce',
  page: 1,
  limit: 12
});

// ✅ 자동 인증 토큰 추가
// ✅ 통일된 에러 처리
// ✅ TypeScript 타입 안전성
// ✅ Request/Response Interceptor
```

#### **API 서비스 레이어**
```typescript
// src/services/template.service.ts
export const templateService = {
  getTemplates: (filters?) => api.get<TemplatesResponse>('/templates', { params: filters }),
  getTemplate: (id) => api.get<Template>(`/templates/${id}`),
  createTemplate: (data) => api.post<Template>('/templates', data),
  updateTemplate: (id, data) => api.put<Template>(`/templates/${id}`, data),
  deleteTemplate: (id) => api.delete(`/templates/${id}`),
};
```

---

### 3. **에러 핸들링 통일**

#### **중앙화된 에러 처리**
```typescript
// src/utils/errors.ts
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    switch (status) {
      case 401: return ERROR_MESSAGES.UNAUTHORIZED;
      case 403: return ERROR_MESSAGES.FORBIDDEN;
      case 404: return ERROR_MESSAGES.NOT_FOUND;
      case 500: return ERROR_MESSAGES.SERVER_ERROR;
      default: return error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
    }
  }
  return '알 수 없는 오류가 발생했습니다.';
};
```

#### **자동 인증 에러 처리**
```typescript
// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러 시 자동 로그아웃
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

### 4. **타입 안전성 강화**

#### **환경 변수 타입 안전성**
```typescript
// src/config/index.ts
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  api: {
    baseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:5000/api'),
  },
} as const;
```

#### **API 응답 타입 정의**
```typescript
// 모든 API 호출에 제네릭 타입 적용
api.get<TemplatesResponse>('/templates')
api.post<AuthResponse>('/auth/login', data)
api.put<Template>(`/templates/${id}`, data)
```

---

### 5. **상수 관리 개선**

#### **Before**
```typescript
// 코드 전역에 하드코딩된 문자열
if (status === 'COMPLETED') { ... }
if (category === 'ecommerce') { ... }
```

#### **After**
```typescript
// src/constants/index.ts
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

// 사용
if (status === ORDER_STATUS.COMPLETED) { ... }
```

---

### 6. **유틸리티 함수 모듈화**

#### **포맷팅 유틸리티**
```typescript
// src/utils/format.ts
formatCurrency(49000) // "₩49,000"
formatCompactNumber(1500) // "1.5K"
formatRelativeTime('2025-01-01') // "5일 전"
formatDate('2025-01-18') // "2025-01-18"
```

#### **유효성 검사 유틸리티**
```typescript
// src/utils/validation.ts
isValidEmail('user@example.com') // true
isValidPassword('password123') // true
isValidRating(5) // true (1-5)
```

#### **Storage 유틸리티**
```typescript
// src/utils/storage.ts (타입 안전)
storage.setItem<User>('user', userData);
const user = storage.getItem<User>('user');
storage.removeItem('user');
```

---

### 7. **공통 컴포넌트 추출**

#### **LoadingSpinner**
```typescript
<LoadingSpinner size="md" text="로딩 중..." />
```

#### **EmptyState**
```typescript
<EmptyState
  icon={PackageIcon}
  title="템플릿이 없습니다"
  description="새로운 템플릿을 추가해보세요"
  action={{ label: "추가하기", onClick: handleAdd }}
/>
```

---

## 📁 새로운 디렉토리 구조

```
src/
├── config/
│   └── index.ts                    # 환경 설정
├── constants/
│   └── index.ts                    # 전역 상수
├── lib/
│   └── api-client.ts               # Axios 클라이언트
├── services/
│   ├── index.ts                    # 서비스 통합 export
│   ├── auth.service.ts             # 인증 API
│   ├── template.service.ts         # 템플릿 API
│   ├── order.service.ts            # 주문 API
│   ├── review.service.ts           # 리뷰 API
│   ├── user.service.ts             # 사용자 API
│   └── support.service.ts          # 지원 API
├── utils/
│   ├── errors.ts                   # 에러 처리
│   ├── format.ts                   # 포맷팅
│   ├── validation.ts               # 유효성 검사
│   └── storage.ts                  # localStorage 래퍼
├── components/
│   └── common/
│       ├── LoadingSpinner.tsx
│       └── EmptyState.tsx
└── ...
```

---

## 🎯 개선 효과

### **코드 품질**
- ✅ 중복 코드 제거
- ✅ 네이밍 통일
- ✅ 타입 안전성 향상
- ✅ 에러 처리 일관성

### **유지보수성**
- ✅ 관심사 분리
- ✅ 모듈화
- ✅ 재사용성 증가
- ✅ 테스트 용이성

### **개발 경험**
- ✅ IntelliSense 지원 강화
- ✅ 자동 완성
- ✅ 타입 체크
- ✅ 빠른 디버깅

### **확장성**
- ✅ 새로운 API 추가 용이
- ✅ 새로운 기능 추가 용이
- ✅ 팀 협업 개선

---

## 📊 Before & After 비교

### **API 호출 예제**

#### Before
```typescript
// 컴포넌트 내부에 로직 분산
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const fetchTemplates = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/templates', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    setTemplates(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

#### After
```typescript
// 깔끔하고 간결한 로직
const fetchTemplates = async () => {
  try {
    const { templates } = await templateService.getTemplates({ page: 1 });
    setTemplates(templates);
  } catch (error) {
    showToast('error', getErrorMessage(error));
  }
};
```

---

## 🚀 사용 방법

### **서비스 사용**
```typescript
import { services } from '@/services';

// 인증
const { user, token } = await services.auth.login({ email, password });

// 템플릿 조회
const { templates } = await services.template.getTemplates({ category: 'ecommerce' });

// 주문 생성
const { order } = await services.order.createOrder({ items, total, paymentMethod });
```

### **유틸리티 사용**
```typescript
import { formatCurrency, isValidEmail, storage } from '@/utils';

// 포맷팅
const price = formatCurrency(49000); // "₩49,000"

// 유효성 검사
if (!isValidEmail(email)) {
  showToast('error', '올바른 이메일을 입력하세요');
}

// Storage
storage.setItem('user', userData);
```

### **상수 사용**
```typescript
import { ORDER_STATUS, ORDER_STATUS_LABELS } from '@/constants';

if (order.status === ORDER_STATUS.COMPLETED) {
  console.log(ORDER_STATUS_LABELS[order.status]); // "완료"
}
```

---

## 🔄 마이그레이션 가이드

### 1. **기존 fetch 호출 → 서비스 레이어**
```typescript
// Before
fetch('/api/templates').then(res => res.json())

// After
import { templateService } from '@/services';
templateService.getTemplates()
```

### 2. **하드코딩 문자열 → 상수**
```typescript
// Before
if (status === 'COMPLETED') { ... }

// After
import { ORDER_STATUS } from '@/constants';
if (status === ORDER_STATUS.COMPLETED) { ... }
```

### 3. **localStorage 직접 사용 → Storage 유틸리티**
```typescript
// Before
localStorage.setItem('user', JSON.stringify(user));

// After
import { storage } from '@/utils';
storage.setItem('user', user);
```

---

## 📝 TODO

- [ ] 기존 컴포넌트에서 새로운 서비스 레이어 사용하도록 리팩토링
- [ ] AppContext를 여러 개로 분리 (AuthContext, CartContext 등)
- [ ] React Query 도입 검토 (캐싱, 리프레싱)
- [ ] Error Boundary 추가
- [ ] Toast 시스템 개선
- [ ] Unit Test 작성

---

## 🎓 베스트 프랙티스

1. **항상 서비스 레이어를 통해 API 호출**
2. **상수는 constants 파일에서 import**
3. **에러는 getErrorMessage로 통일**
4. **포맷팅은 utils 함수 사용**
5. **타입을 명시적으로 정의**

---

이 리팩토링을 통해 Templify는 엔터프라이즈급 코드베이스로 발전했습니다! 🎉
