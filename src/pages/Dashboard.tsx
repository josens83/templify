import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Download,
  Package,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Award,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { templates } from '../data/templates';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState<'purchases' | 'stats' | 'badges'>(
    'purchases'
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 데모용 구매 내역 (실제로는 서버에서 가져옴)
  const purchasedTemplates = templates.slice(0, 3);
  const stats = {
    totalPurchases: 3,
    totalSpent: 267000,
    avgRating: 4.8,
    activeProjects: 2,
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="card mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user?.name}님, 환영합니다!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {user?.email}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Award className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">레벨 {user?.level}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">
                    {user?.points} 포인트
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  총 구매
                </p>
                <p className="text-2xl font-bold mt-1">
                  {stats.totalPurchases}개
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  총 지출
                </p>
                <p className="text-2xl font-bold mt-1">
                  ₩{stats.totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  평균 평점
                </p>
                <p className="text-2xl font-bold mt-1">{stats.avgRating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  진행 중인 프로젝트
                </p>
                <p className="text-2xl font-bold mt-1">
                  {stats.activeProjects}개
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('purchases')}
                className={`pb-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'purchases'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                구매 내역
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`pb-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'stats'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                통계
              </button>
              <button
                onClick={() => setActiveTab('badges')}
                className={`pb-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'badges'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                배지 & 업적
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'purchases' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">구매한 템플릿</h2>
              <div className="space-y-4">
                {purchasedTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          구매일: {template.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/templates/${template.id}`}
                        className="btn-secondary"
                      >
                        상세보기
                      </Link>
                      <button className="btn-primary flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>다운로드</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {purchasedTemplates.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    아직 구매한 템플릿이 없습니다
                  </p>
                  <Link to="/templates" className="btn-primary inline-block">
                    템플릿 둘러보기
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">활동 통계</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">월간 활동</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      75%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">프로젝트 완료율</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      90%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: '90%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">커뮤니티 기여도</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      60%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-primary-600" />
                    <span className="font-semibold">팔로워</span>
                  </div>
                  <p className="text-2xl font-bold">124</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">가입일</span>
                  </div>
                  <p className="text-2xl font-bold">2024.03</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">획득한 배지</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg text-center">
                  <div className="w-16 h-16 bg-yellow-400 dark:bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">첫 구매</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    첫 번째 템플릿 구매
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg text-center">
                  <div className="w-16 h-16 bg-blue-400 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">리뷰어</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    5개 리뷰 작성
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg text-center">
                  <div className="w-16 h-16 bg-purple-400 dark:bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">커뮤니티 히어로</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    10개 질문에 답변
                  </p>
                </div>

                <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center opacity-50">
                  <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="font-semibold mb-1">잠금</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    ???
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
