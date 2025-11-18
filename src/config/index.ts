/**
 * Environment Configuration
 * 환경 변수를 타입 안전하게 관리
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  // API Configuration
  api: {
    baseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:5000/api'),
    timeout: 30000,
  },

  // App Configuration
  app: {
    name: 'Templify',
    version: '1.0.0',
    env: getEnvVar('VITE_APP_ENV', 'development'),
  },

  // Feature Flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableNewsletter: true,
    enableSocialShare: true,
  },

  // Storage Keys
  storage: {
    authToken: 'templify_auth_token',
    user: 'templify_user',
    cart: 'templify_cart',
    wishlist: 'templify_wishlist',
    recentlyViewed: 'templify_recently_viewed',
  },
} as const;

// Type-safe environment check
export const isDevelopment = config.app.env === 'development';
export const isProduction = config.app.env === 'production';
