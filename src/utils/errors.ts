/**
 * Error Handling Utilities
 * 에러 처리 통일화
 */

import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from '../constants';
import { isDevelopment } from '../config';

export class AppError extends Error {
  statusCode?: number;
  code?: string;

  constructor(message: string, statusCode?: number, code?: string) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * API 에러를 사용자 친화적 메시지로 변환
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof AxiosError) {
    // 네트워크 에러
    if (!error.response) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }

    // 서버 응답 에러
    const status = error.response.status;
    const serverMessage = error.response.data?.error?.message;

    switch (status) {
      case 400:
        return serverMessage || ERROR_MESSAGES.VALIDATION_ERROR;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
      case 502:
      case 503:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return serverMessage || ERROR_MESSAGES.SERVER_ERROR;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * 에러 로깅 (프로덕션에서는 외부 서비스로 전송)
 */
export const logError = (error: unknown, context?: string) => {
  if (isDevelopment) {
    console.error(`[Error${context ? ` - ${context}` : ''}]:`, error);
  }

  // TODO: 프로덕션 환경에서는 Sentry 등으로 전송
  // if (isProduction) {
  //   Sentry.captureException(error);
  // }
};

/**
 * Async 함수 에러 래퍼
 */
export const handleAsyncError = async <T>(
  fn: () => Promise<T>,
  context?: string
): Promise<[T | null, Error | null]> => {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    logError(error, context);
    return [null, error as Error];
  }
};
