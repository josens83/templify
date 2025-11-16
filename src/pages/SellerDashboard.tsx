import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Star,
  Upload,
  MessageSquare,
  Eye,
  Download,
  Edit,
  BarChart3,
} from 'lucide-react';
import { templates } from '../data/templates';

interface Sale {
  id: string;
  templateId: string;
  templateName: string;
  buyer: string;
  amount: number;
  date: string;
  commission: number;
}

interface TemplateStats {
  id: string;
  name: string;
  views: number;
  sales: number;
  revenue: number;
  rating: number;
  image: string;
}

const SellerDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock data - 실제로는 API에서 가져올 데이터
  const stats = {
    totalRevenue: 12450000,
    totalSales: 142,
    monthlySales: 23,
    averageRating: 4.7,
    monthlyGrowth: 15.3,
  };

  const recentSales: Sale[] = [
    {
      id: 's1',
      templateId: 't1',
      templateName: 'ModernShop Pro',
      buyer: '김철수',
      amount: 89000,
      date: '2024-01-15',
      commission: 8900,
    },
    {
      id: 's2',
      templateId: 't3',
      templateName: 'StartupHub',
      buyer: '이영희',
      amount: 59000,
      date: '2024-01-14',
      commission: 5900,
    },
    {
      id: 's3',
      templateId: 't2',
      templateName: 'BlogMaster',
      buyer: '박민수',
      amount: 49000,
      date: '2024-01-14',
      commission: 4900,
    },
    {
      id: 's4',
      templateId: 't5',
      templateName: 'PortfolioX',
      buyer: '정유진',
      amount: 79000,
      date: '2024-01-13',
      commission: 7900,
    },
    {
      id: 's5',
      templateId: 't1',
      templateName: 'ModernShop Pro',
      buyer: '최동훈',
      amount: 89000,
      date: '2024-01-12',
      commission: 8900,
    },
  ];

  const myTemplates: TemplateStats[] = templates.slice(0, 5).map((template) => ({
    id: template.id,
    name: template.name,
    views: Math.floor(Math.random() * 5000) + 500,
    sales: Math.floor(Math.random() * 50) + 10,
    revenue: template.price * (Math.floor(Math.random() * 50) + 10),
    rating: template.rating,
    image: template.image,
  }));

  const monthlyData = [
    { month: '7월', revenue: 1200000 },
    { month: '8월', revenue: 1450000 },
    { month: '9월', revenue: 1680000 },
    { month: '10월', revenue: 1920000 },
    { month: '11월', revenue: 2150000 },
    { month: '12월', revenue: 2450000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              판매자 대시보드
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              템플릿 판매 현황과 수익을 관리하세요
            </p>
          </div>
          <Link
            to="/upload-template"
            className="btn-primary flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            새 템플릿 업로드
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">총 수익</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  ₩{stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              {stats.monthlyGrowth}% 이번 달
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">총 판매</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalSales}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              이번 달 {stats.monthlySales}건
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">평균 평점</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.averageRating}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
              모든 템플릿 평균
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">활성 템플릿</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {myTemplates.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              판매 중인 템플릿
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              수익 추이
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  timeRange === 'week'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                주간
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  timeRange === 'month'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                월간
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  timeRange === 'year'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                연간
              </button>
            </div>
          </div>

          <div className="flex items-end gap-4 h-64">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-48">
                  <div
                    className="w-full bg-primary-600 dark:bg-primary-500 rounded-t-lg transition-all hover:bg-primary-700"
                    style={{
                      height: `${(data.revenue / maxRevenue) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Sales */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                최근 판매
              </h2>
              <Link
                to="/sales"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                전체 보기
              </Link>
            </div>

            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {sale.templateName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      구매자: {sale.buyer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(sale.date).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ₩{sale.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      수수료: ₩{sale.commission.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Templates */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                내 템플릿 현황
              </h2>
              <Link
                to="/my-templates"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                전체 관리
              </Link>
            </div>

            <div className="space-y-4">
              {myTemplates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {template.name}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {template.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {template.sales}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        {template.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ₩{template.revenue.toLocaleString()}
                    </p>
                    <Link
                      to={`/edit-template/${template.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline mt-2"
                    >
                      <Edit className="w-4 h-4" />
                      수정
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link
            to="/upload-template"
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <Upload className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  새 템플릿 업로드
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  템플릿을 등록하고 판매를 시작하세요
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/messages"
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  메시지 확인
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  구매자 문의에 답변하세요
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/settings"
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  상세 통계
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  자세한 판매 분석을 확인하세요
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
