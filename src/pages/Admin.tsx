import React, { useState, useEffect } from 'react';
import { getItem } from '../utils/storage';
import {
  BarChart3,
  Users,
  Package,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface Statistics {
  totalRevenue: number;
  totalUsers: number;
  totalTemplates: number;
  todayOrders: number;
  pendingTemplates: number;
  activeReports: number;
}

interface PendingTemplate {
  id: string;
  name: string;
  seller: string;
  category: string;
  price: number;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'seller' | 'admin';
  joinedAt: string;
  purchases: number;
  sales: number;
}

interface Report {
  id: string;
  type: 'template' | 'user' | 'review';
  targetId: string;
  targetName: string;
  reporter: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'users' | 'reports'>('overview');
  const [statistics, setStatistics] = useState<Statistics>({
    totalRevenue: 0,
    totalUsers: 0,
    totalTemplates: 0,
    todayOrders: 0,
    pendingTemplates: 0,
    activeReports: 0
  });
  const [pendingTemplates, setPendingTemplates] = useState<PendingTemplate[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // 통계 데이터 로드
    const orders = getItem<any[]>('orders') || [];
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);

    const today = new Date().toDateString();
    const todayOrders = orders.filter((order: any) =>
      new Date(order.date).toDateString() === today
    ).length;

    setStatistics({
      totalRevenue,
      totalUsers: 1247,
      totalTemplates: 89,
      todayOrders,
      pendingTemplates: 5,
      activeReports: 3
    });

    // 승인 대기 템플릿 목록
    setPendingTemplates([
      {
        id: '1',
        name: '미니멀 포트폴리오 템플릿',
        seller: 'DesignStudio',
        category: '포트폴리오',
        price: 35000,
        uploadedAt: '2025-11-17T10:30:00',
        status: 'pending'
      },
      {
        id: '2',
        name: 'E-커머스 대시보드 UI Kit',
        seller: 'UICreator',
        category: '대시보드',
        price: 45000,
        uploadedAt: '2025-11-17T09:15:00',
        status: 'pending'
      },
      {
        id: '3',
        name: '모던 블로그 레이아웃',
        seller: 'WebDesigner',
        category: '블로그',
        price: 25000,
        uploadedAt: '2025-11-16T16:45:00',
        status: 'pending'
      }
    ]);

    // 사용자 목록
    setUsers([
      {
        id: '1',
        name: '김철수',
        email: 'kim@example.com',
        role: 'seller',
        joinedAt: '2025-01-15',
        purchases: 12,
        sales: 45
      },
      {
        id: '2',
        name: '이영희',
        email: 'lee@example.com',
        role: 'user',
        joinedAt: '2025-03-20',
        purchases: 8,
        sales: 0
      },
      {
        id: '3',
        name: 'DesignStudio',
        email: 'design@example.com',
        role: 'seller',
        joinedAt: '2024-11-10',
        purchases: 5,
        sales: 128
      }
    ]);

    // 신고 목록
    setReports([
      {
        id: '1',
        type: 'template',
        targetId: 'T123',
        targetName: '의심스러운 템플릿',
        reporter: 'user@example.com',
        reason: '저작권 침해 의심',
        status: 'pending',
        createdAt: '2025-11-17T11:00:00'
      },
      {
        id: '2',
        type: 'review',
        targetId: 'R456',
        targetName: '부적절한 리뷰',
        reporter: 'seller@example.com',
        reason: '욕설 및 비방',
        status: 'pending',
        createdAt: '2025-11-16T15:30:00'
      }
    ]);
  }, []);

  const handleApproveTemplate = (id: string) => {
    setPendingTemplates(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'approved' } : t)
    );
    alert('템플릿이 승인되었습니다.');
  };

  const handleRejectTemplate = (id: string) => {
    setPendingTemplates(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'rejected' } : t)
    );
    alert('템플릿이 거부되었습니다.');
  };

  const handleResolveReport = (id: string) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r)
    );
    alert('신고가 처리되었습니다.');
  };

  const handleDismissReport = (id: string) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'dismissed' } : r)
    );
    alert('신고가 기각되었습니다.');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            관리자 대시보드
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Templify 전체 운영 현황 및 관리
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline-block mr-2" />
                개요
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'templates'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Package className="w-4 h-4 inline-block mr-2" />
                템플릿 관리 ({statistics.pendingTemplates})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'users'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Users className="w-4 h-4 inline-block mr-2" />
                사용자 관리
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'reports'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <AlertTriangle className="w-4 h-4 inline-block mr-2" />
                신고 관리 ({statistics.activeReports})
              </button>
            </nav>
          </div>
        </div>

        {/* 개요 탭 */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 매출</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₩{statistics.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12.5% 지난달 대비</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 사용자</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {statistics.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+8.2% 지난달 대비</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 템플릿</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {statistics.totalTemplates}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>승인 대기: {statistics.pendingTemplates}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">오늘 주문</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {statistics.todayOrders}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>오늘 기준</span>
                </div>
              </div>
            </div>

            {/* 최근 활동 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                최근 활동
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900 dark:text-white">새로운 템플릿 업로드</span>
                  </div>
                  <span className="text-sm text-gray-500">5분 전</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-900 dark:text-white">신규 사용자 가입</span>
                  </div>
                  <span className="text-sm text-gray-500">12분 전</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-900 dark:text-white">신고 접수</span>
                  </div>
                  <span className="text-sm text-gray-500">1시간 전</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 템플릿 관리 탭 */}
        {activeTab === 'templates' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                승인 대기 템플릿
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        템플릿명
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        판매자
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        카테고리
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        가격
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        업로드 일시
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        상태
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTemplates.map((template) => (
                      <tr
                        key={template.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {template.name}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          {template.seller}
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          {template.category}
                        </td>
                        <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">
                          ₩{template.price.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(template.uploadedAt)}
                        </td>
                        <td className="py-4 px-4">
                          {template.status === 'pending' && (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                              대기중
                            </span>
                          )}
                          {template.status === 'approved' && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                              승인됨
                            </span>
                          )}
                          {template.status === 'rejected' && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded">
                              거부됨
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {template.status === 'pending' && (
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleApproveTemplate(template.id)}
                                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                                title="승인"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleRejectTemplate(template.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                                title="거부"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 사용자 관리 탭 */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                사용자 목록
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        이름
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        이메일
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        역할
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        가입일
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        구매
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        판매
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          {user.email}
                        </td>
                        <td className="py-4 px-4">
                          {user.role === 'admin' && (
                            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded">
                              관리자
                            </span>
                          )}
                          {user.role === 'seller' && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded">
                              판매자
                            </span>
                          )}
                          {user.role === 'user' && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 rounded">
                              사용자
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">
                          {user.joinedAt}
                        </td>
                        <td className="py-4 px-4 text-gray-900 dark:text-white">
                          {user.purchases}
                        </td>
                        <td className="py-4 px-4 text-gray-900 dark:text-white">
                          {user.sales}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 신고 관리 탭 */}
        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                신고 목록
              </h3>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded">
                            {report.type === 'template' ? '템플릿' : report.type === 'user' ? '사용자' : '리뷰'}
                          </span>
                          {report.status === 'pending' && (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                              대기중
                            </span>
                          )}
                          {report.status === 'resolved' && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                              처리됨
                            </span>
                          )}
                          {report.status === 'dismissed' && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 rounded">
                              기각됨
                            </span>
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {report.targetName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {report.reason}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>신고자: {report.reporter}</span>
                          <span>•</span>
                          <span>{formatDate(report.createdAt)}</span>
                        </div>
                      </div>
                      {report.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleResolveReport(report.id)}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                          >
                            처리
                          </button>
                          <button
                            onClick={() => handleDismissReport(report.id)}
                            className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                          >
                            기각
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
