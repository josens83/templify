/**
 * PageLoader
 * React.lazy로 로드되는 페이지의 로딩 Fallback
 */

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <LoadingSpinner size="lg" text="페이지 로딩 중..." />
    </div>
  );
};

export default PageLoader;
