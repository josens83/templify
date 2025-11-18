/**
 * Web Vitals 측정 및 리포팅
 * Core Web Vitals (LCP, FID, CLS) 및 기타 성능 지표 측정
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Web Vitals 콜백 함수
 */
function sendToAnalytics(metric: Metric) {
  // 개발 환경에서 콘솔에 출력
  if (import.meta.env.DEV) {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // 프로덕션 환경에서는 분석 서비스로 전송
  // TODO: Google Analytics, Sentry 등으로 전송
  // if (import.meta.env.PROD) {
  //   // Google Analytics 예시
  //   if (typeof window.gtag !== 'undefined') {
  //     window.gtag('event', metric.name, {
  //       value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //       event_label: metric.id,
  //       non_interaction: true,
  //     });
  //   }
  // }
}

/**
 * Web Vitals 측정 시작
 */
export function reportWebVitals() {
  // Cumulative Layout Shift (누적 레이아웃 이동)
  // 목표: < 0.1
  onCLS(sendToAnalytics);

  // Interaction to Next Paint (다음 페인트까지의 상호작용 시간)
  // 목표: < 200ms
  onINP(sendToAnalytics);

  // First Contentful Paint (첫 콘텐츠 렌더링 시간)
  // 목표: < 1.8s
  onFCP(sendToAnalytics);

  // Largest Contentful Paint (최대 콘텐츠 렌더링 시간)
  // 목표: < 2.5s
  onLCP(sendToAnalytics);

  // Time to First Byte (첫 바이트까지의 시간)
  // 목표: < 600ms
  onTTFB(sendToAnalytics);
}
