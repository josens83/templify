/**
 * Validation Utilities
 * 입력값 검증 유틸리티
 */

import { REGEX_PATTERNS } from '../constants';

/**
 * 이메일 유효성 검사
 */
export const isValidEmail = (email: string): boolean => {
  return REGEX_PATTERNS.EMAIL.test(email);
};

/**
 * 비밀번호 유효성 검사 (최소 8자, 영문+숫자 조합)
 */
export const isValidPassword = (password: string): boolean => {
  return REGEX_PATTERNS.PASSWORD.test(password);
};

/**
 * 전화번호 유효성 검사
 */
export const isValidPhone = (phone: string): boolean => {
  return REGEX_PATTERNS.PHONE.test(phone);
};

/**
 * 빈 문자열 검사
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return !value || value.trim().length === 0;
};

/**
 * 숫자 범위 검사
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * URL 유효성 검사
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 파일 확장자 검사
 */
export const hasValidExtension = (
  filename: string,
  allowedExtensions: string[]
): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedExtensions.includes(extension) : false;
};

/**
 * 파일 크기 검사 (bytes)
 */
export const isValidFileSize = (size: number, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return size <= maxSizeInBytes;
};

/**
 * 평점 유효성 검사 (1-5)
 */
export const isValidRating = (rating: number): boolean => {
  return isInRange(rating, 1, 5) && Number.isInteger(rating);
};
