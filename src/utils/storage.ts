/**
 * Storage Utilities
 * localStorage 래퍼 - 타입 안전성과 에러 처리
 */

import { logError } from './errors';

/**
 * localStorage에 데이터 저장
 */
export const setItem = <T>(key: string, value: T): boolean => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    logError(error, `Storage.setItem - ${key}`);
    return false;
  }
};

/**
 * localStorage에서 데이터 가져오기
 */
export const getItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return defaultValue || null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    logError(error, `Storage.getItem - ${key}`);
    return defaultValue || null;
  }
};

/**
 * localStorage에서 데이터 제거
 */
export const removeItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    logError(error, `Storage.removeItem - ${key}`);
    return false;
  }
};

/**
 * localStorage 전체 초기화
 */
export const clear = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    logError(error, 'Storage.clear');
    return false;
  }
};

/**
 * 여러 키-값 쌍을 한 번에 저장
 */
export const setMultiple = (items: Record<string, any>): boolean => {
  try {
    Object.entries(items).forEach(([key, value]) => {
      setItem(key, value);
    });
    return true;
  } catch (error) {
    logError(error, 'Storage.setMultiple');
    return false;
  }
};

/**
 * 여러 키의 값을 한 번에 가져오기
 */
export const getMultiple = <T extends Record<string, any>>(
  keys: string[]
): Partial<T> => {
  const result: Partial<T> = {};
  keys.forEach((key) => {
    const value = getItem(key);
    if (value !== null) {
      (result as any)[key] = value;
    }
  });
  return result;
};

/**
 * 키가 존재하는지 확인
 */
export const hasKey = (key: string): boolean => {
  return localStorage.getItem(key) !== null;
};

/**
 * 저장소 크기 확인 (대략적)
 */
export const getStorageSize = (): number => {
  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

// 타입 안전한 Storage 객체
export const storage = {
  setItem,
  getItem,
  removeItem,
  clear,
  setMultiple,
  getMultiple,
  hasKey,
  getStorageSize,
} as const;
