import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
          <div className="relative">
            <div className="absolute inset-0 bg-primary-600 dark:bg-primary-400 opacity-10 blur-3xl"></div>
            <svg
              className="w-64 h-64 mx-auto relative"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                className="stroke-gray-300 dark:stroke-gray-700"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <path
                d="M80 85 L90 95 L80 105"
                className="stroke-gray-400 dark:stroke-gray-600"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M120 85 L110 95 L120 105"
                className="stroke-gray-400 dark:stroke-gray-600"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx="100"
                cy="130"
                r="25"
                className="stroke-gray-400 dark:stroke-gray-600"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br />
          주소를 다시 확인해주세요.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            이전 페이지
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <Home className="mr-2 h-5 w-5" />
            홈으로 가기
          </Link>
        </div>

        {/* Quick Links */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-center">
            <Search className="h-5 w-5 mr-2" />
            찾으시는 페이지가 있나요?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/templates"
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Package className="h-6 w-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="text-sm font-medium">템플릿</p>
            </Link>
            <Link
              to="/experts"
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Users className="h-6 w-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="text-sm font-medium">전문가</p>
            </Link>
            <Link
              to="/community"
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <MessageSquare className="h-6 w-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="text-sm font-medium">커뮤니티</p>
            </Link>
            <Link
              to="/pricing"
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="text-sm font-medium">가격</p>
            </Link>
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">도움이 필요하신가요?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            문제가 계속되면 고객 지원팀에 문의해주세요
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            문의하기
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Missing imports fix
import { Package, Users, MessageSquare, DollarSign, ArrowRight } from 'lucide-react';

export default NotFound;
