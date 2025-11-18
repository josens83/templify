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
  Flame,
  Sparkles,
} from 'lucide-react';
import { templates } from '../data/templates';
import { experts } from '../data/experts';
import TemplateCard from '../components/TemplateCard';
import { useCart } from '../contexts';

const Home: React.FC = () => {
  const { recentlyViewed } = useCart();
  const featuredTemplates = templates.slice(0, 6);
  const topExperts = experts.slice(0, 4);

  // Get trending templates (based on recent views/downloads)
  const trendingTemplates = [...templates]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 4);

  // Get bestseller templates (based on rating and downloads)
  const bestsellerTemplates = [...templates]
    .sort((a, b) => {
      const scoreA = (a.rating * 20) + (a.downloads / 100);
      const scoreB = (b.rating * 20) + (b.downloads / 100);
      return scoreB - scoreA;
    })
    .slice(0, 4);

  // Get new templates (simulate by reversing order)
  const newTemplates = [...templates].reverse().slice(0, 4);

  // Get recently viewed templates in order
  const recentlyViewedTemplates = recentlyViewed
    .map((id) => templates.find((t) => t.id === id))
    .filter((t) => t !== undefined)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section - Linear/Vercel Style */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-gray-950">
        {/* Animated gradient orbs background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-tr from-indigo-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Grid pattern overlay (subtle) */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/50 dark:bg-primary-900/30 border border-primary-200/50 dark:border-primary-800/50 mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                1000+ 개발자가 선택한 플랫폼
              </span>
            </div>

            {/* Main heading with gradient text */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              프리미엄 템플릿으로
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 dark:from-primary-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                빠르게 시작하세요
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              전문가가 만든 고품질 웹사이트 템플릿과 맞춤 제작 서비스를 한곳에서
            </p>

            {/* CTA Buttons with enhanced hover effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link
                to="/templates"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                템플릿 둘러보기
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/experts"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                전문가 찾기
                <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Stats with glass morphism cards */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="glass-card text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary-600 to-purple-600 text-transparent bg-clip-text mb-2">
                  {templates.length}+
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">템플릿</div>
              </div>
              <div className="glass-card text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-indigo-600 to-pink-600 text-transparent bg-clip-text mb-2">
                  {experts.length}+
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">전문가</div>
              </div>
              <div className="glass-card text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-orange-600 to-red-600 text-transparent bg-clip-text mb-2">
                  15K+
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">다운로드</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Box Style (Apple/Linear Inspired) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden relative">
        {/* Background gradient orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              왜 Templify를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              최고의 템플릿 마켓플레이스에서 당신의 프로젝트를 시작하세요
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {/* Large feature card - spans 4 columns on desktop */}
            <div className="md:col-span-4 bento-item bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-pink-500/10 dark:from-primary-500/20 dark:via-purple-500/20 dark:to-pink-500/20 min-h-[300px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-500/20 dark:bg-primary-500/30 rounded-2xl mb-6">
                  <Shield className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  검증된 품질
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  모든 템플릿은 전문가 심사를 거쳐 엄선된 고품질 상품입니다.
                  코드 품질, 디자인 완성도, 성능 최적화까지 꼼꼼하게 검증합니다.
                </p>
              </div>
              <div className="mt-6 flex gap-2">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  전문가 검수
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  높은 품질
                </span>
              </div>
            </div>

            {/* Vertical card - spans 2 columns */}
            <div className="md:col-span-2 bento-item bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 min-h-[300px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500/20 dark:bg-orange-500/30 rounded-2xl mb-6">
                  <Zap className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  빠른 구현
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  즉시 다운로드하여 프로젝트에 바로 적용할 수 있습니다
                </p>
              </div>
            </div>

            {/* Small card - spans 2 columns */}
            <div className="md:col-span-2 bento-item bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-xl mb-4">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                전문가 지원
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                추가 커스터마이징이 필요하면 전문가에게 맡기세요
              </p>
            </div>

            {/* Small card with stats */}
            <div className="md:col-span-2 bento-item bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 dark:bg-green-500/30 rounded-xl mb-4">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                평생 업데이트
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                한 번 구매로 모든 업데이트를 무료로 받으세요
              </p>
            </div>

            {/* Wide card - spans 2 columns */}
            <div className="md:col-span-2 bento-item bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-500/20 dark:bg-violet-500/30 rounded-xl mb-4">
                <Clock className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                30일 환불 보장
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                만족하지 못하셨다면 전액 환불해드립니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Templates */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Flame className="h-8 w-8 text-orange-500" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  지금 뜨는 템플릿 🔥
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  가장 많은 다운로드를 받고 있는 인기 템플릿
                </p>
              </div>
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
            {trendingTemplates.map((template, index) => (
              <div key={template.id} className="relative">
                <div className="absolute -top-2 -left-2 z-10 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>
                <TemplateCard template={template} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestseller Templates */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  이번 주 베스트셀러 ⭐
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  높은 평점과 판매량을 자랑하는 최고의 템플릿
                </p>
              </div>
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
            {bestsellerTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* New Templates */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-purple-500" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  방금 등록된 신규 템플릿 ✨
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  따끈따끈한 신규 템플릿을 가장 먼저 만나보세요
                </p>
              </div>
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
            {newTemplates.map((template) => (
              <div key={template.id} className="relative">
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                  NEW
                </div>
                <TemplateCard template={template} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewedTemplates.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
