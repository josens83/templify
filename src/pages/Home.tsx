import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  Users,
  Shield,
  Zap,
  Package,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { templates } from '../data/templates';
import { experts } from '../data/experts';
import TemplateCard from '../components/TemplateCard';
import { useApp } from '../contexts/AppContext';

const Home: React.FC = () => {
  const { recentlyViewed } = useApp();
  const featuredTemplates = templates.slice(0, 6);
  const topExperts = experts.slice(0, 4);

  // Get recently viewed templates in order
  const recentlyViewedTemplates = recentlyViewed
    .map((id) => templates.find((t) => t.id === id))
    .filter((t) => t !== undefined)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              프리미엄 템플릿으로
              <br />
              <span className="text-primary-600 dark:text-primary-400">
                빠르게 시작하세요
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              전문가가 만든 고품질 웹사이트 템플릿과 맞춤 제작 서비스를 한곳에서
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/templates"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg"
              >
                템플릿 둘러보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/experts"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-lg border-2 border-primary-600"
              >
                전문가 찾기
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {templates.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">템플릿</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {experts.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">전문가</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  15K+
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">다운로드</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            왜 Templify를 선택해야 할까요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">검증된 품질</h3>
              <p className="text-gray-600 dark:text-gray-400">
                모든 템플릿은 전문가 심사를 거쳐 엄선된 고품질 상품입니다
              </p>
            </div>
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                <Zap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">빠른 구현</h3>
              <p className="text-gray-600 dark:text-gray-400">
                즉시 다운로드하여 프로젝트에 바로 적용할 수 있습니다
              </p>
            </div>
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">전문가 지원</h3>
              <p className="text-gray-600 dark:text-gray-400">
                추가 커스터마이징이 필요하면 전문가에게 맡기세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewedTemplates.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  최근 본 템플릿
                </h2>
              </div>
              <Link
                to="/templates"
                className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                더 보기
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Templates */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              인기 템플릿
            </h2>
            <Link
              to="/templates"
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              전체보기
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Experts */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              추천 전문가
            </h2>
            <Link
              to="/experts"
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              전체보기
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topExperts.map((expert) => (
              <Link
                key={expert.id}
                to={`/experts/${expert.id}`}
                className="card text-center hover:shadow-xl transition-shadow"
              >
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-lg mb-1">{expert.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {expert.title}
                </p>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{expert.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ({expert.reviewCount})
                  </span>
                </div>
                <div className="text-primary-600 dark:text-primary-400 font-semibold">
                  ₩{expert.hourlyRate.toLocaleString()}/시간
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            프리미엄 템플릿을 구매하거나, 전문가에게 프로젝트를 의뢰하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/templates"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              <Package className="mr-2 h-5 w-5" />
              템플릿 구매하기
            </Link>
            <Link
              to="/experts"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium text-lg border-2 border-white"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              프로젝트 의뢰하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
