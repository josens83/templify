/**
 * Services Index
 * 모든 API 서비스를 중앙에서 export
 */

export * from './auth.service';
export * from './template.service';
export * from './order.service';
export * from './review.service';
export * from './user.service';
export * from './support.service';

// 통합 서비스 객체
import { authService } from './auth.service';
import { templateService } from './template.service';
import { orderService } from './order.service';
import { reviewService } from './review.service';
import { userService } from './user.service';
import { supportService } from './support.service';

export const services = {
  auth: authService,
  template: templateService,
  order: orderService,
  review: reviewService,
  user: userService,
  support: supportService,
} as const;
