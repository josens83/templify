import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Download,
  ShoppingCart,
  ExternalLink,
  Calendar,
  CheckCircle,
  User,
  ThumbsUp,
  Heart,
  Edit,
  FileText,
  XCircle,
} from 'lucide-react';
import { templates } from '../data/templates';
import { getReviewsByTemplateId } from '../data/reviews';
import { useApp } from '../contexts/AppContext';
import ReviewModal from '../components/ReviewModal';
import SocialShare from '../components/SocialShare';

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, addToRecentlyViewed, showToast, isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState<'features' | 'license' | 'reviews'>('features');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  const template = templates.find((t) => t.id === id);
  const reviews = template ? getReviewsByTemplateId(template.id) : [];
  const isWishlisted = template ? isInWishlist(template.id) : false;

  // Add to recently viewed when template is loaded
  useEffect(() => {
    if (template) {
      addToRecentlyViewed(template.id);
    }
  }, [template, addToRecentlyViewed]);

  // Check if user has purchased this template
  useEffect(() => {
    if (!template) return;

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const purchased = orders.some((order: any) =>
      order.items.some((item: any) => item.template.id === template.id)
    );
    setHasPurchased(purchased);
  }, [template]);

  if (!template) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            템플릿을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            요청하신 템플릿이 존재하지 않습니다.
          </p>
          <Link to="/templates" className="btn-primary">
            템플릿 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(template);
    showToast('success', '장바구니에 추가되었습니다!');
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (!template) return;
    if (isWishlisted) {
      removeFromWishlist(template.id);
      showToast('info', '찜하기에서 제거되었습니다.');
    } else {
      addToWishlist(template.id);
      showToast('success', '찜하기에 추가되었습니다!');
    }
  };

  const handleReviewSubmit = (review: any) => {
    // In a real application, this would be sent to the backend
    // For now, we'll just show a success message
    showToast('success', '리뷰가 등록되었습니다. 감사합니다!');
    console.log('Review submitted:', review);
    // Ideally, refresh reviews list here
  };

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      showToast('error', '로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!hasPurchased) {
      showToast('error', '구매한 템플릿만 리뷰를 작성할 수 있습니다.');
      return;
    }

    setReviewModalOpen(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                홈
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to="/templates"
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                템플릿
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              {template.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Template Image */}
            <div className="card mb-6">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Template Info */}
            <div className="card mb-6">
              <h1 className="text-3xl font-bold mb-4">{template.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                {template.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{template.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({template.reviewCount} 리뷰)
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Download className="h-5 w-5" />
                  <span>{template.downloads.toLocaleString()} 다운로드</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <User className="h-5 w-5" />
                  <span>제작: {template.author}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5" />
                  <span>업데이트: {template.lastUpdated}</span>
                </div>
              </div>

              {/* Social Share */}
              <div className="mb-6">
                <SocialShare
                  url={`${window.location.origin}/templates/${template.id}`}
                  title={template.name}
                  description={template.description}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`pb-4 font-medium border-b-2 transition-colors ${
                      activeTab === 'features'
                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    주요 기능
                  </button>
                  <button
                    onClick={() => setActiveTab('license')}
                    className={`pb-4 font-medium border-b-2 transition-colors ${
                      activeTab === 'license'
                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    라이선스 정보
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-4 font-medium border-b-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    리뷰 ({template.reviewCount})
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'features' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">포함된 기능</h2>
                  <ul className="space-y-3">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'license' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-start gap-3">
                      <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                      <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                          상업용 라이선스 (Commercial License)
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                          이 템플릿을 구매하시면 개인 및 상업적 프로젝트에 자유롭게 사용하실 수 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 허용 사항 */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      허용 사항
                    </h3>
                    <ul className="space-y-3 ml-7">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">상업적 이용</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            클라이언트 프로젝트, 스타트업, 기업 사이트 등 상업적 목적으로 사용 가능합니다.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">무제한 프로젝트</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            구매 후 여러 프로젝트에 횟수 제한 없이 사용할 수 있습니다.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">수정 및 커스터마이징</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            템플릿의 모든 요소를 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">최종 제품에 포함</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            SaaS, 웹 애플리케이션 등 최종 제품의 일부로 통합 가능합니다.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">평생 업데이트</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            향후 제공되는 모든 업데이트를 무료로 받을 수 있습니다.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* 제한 사항 */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      제한 사항
                    </h3>
                    <ul className="space-y-3 ml-7">
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">재판매 금지</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            템플릿 자체를 그대로 또는 수정하여 재판매할 수 없습니다.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">재배포 금지</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            템플릿 파일을 무료 또는 유료로 배포할 수 없습니다.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">템플릿 마켓플레이스 등록 금지</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            다른 템플릿 마켓플레이스나 테마 스토어에 업로드할 수 없습니다.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">라이선스 이전 불가</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            구매한 라이선스를 제3자에게 양도하거나 공유할 수 없습니다.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* 추가 정보 */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      추가 정보
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      <p>
                        <span className="font-medium text-gray-900 dark:text-white">저작권:</span>{' '}
                        모든 저작권은 템플릿 제작자에게 있으며, 구매자는 사용권을 획득합니다.
                      </p>
                      <p>
                        <span className="font-medium text-gray-900 dark:text-white">출처 표시:</span>{' '}
                        출처 표시는 선택사항이지만, 제작자를 언급해주시면 감사하겠습니다.
                      </p>
                      <p>
                        <span className="font-medium text-gray-900 dark:text-white">환불 정책:</span>{' '}
                        구매 후 30일 이내 정당한 사유가 있는 경우 환불이 가능합니다.
                      </p>
                      <p>
                        <span className="font-medium text-gray-900 dark:text-white">기술 지원:</span>{' '}
                        구매 후 6개월간 이메일을 통한 기술 지원이 제공됩니다.
                      </p>
                      <p className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        라이선스에 대해 궁금한 점이 있으시면{' '}
                        <Link to="/support" className="text-primary-600 dark:text-primary-400 hover:underline">
                          고객지원
                        </Link>
                        으로 문의해주세요.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Write Review Button */}
                  {hasPurchased && (
                    <div className="flex justify-end mb-6">
                      <button
                        onClick={handleWriteReview}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Edit className="h-5 w-5" />
                        리뷰 작성
                      </button>
                    </div>
                  )}

                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.authorAvatar}
                          alt={review.authorName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.authorName}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'text-yellow-500 fill-yellow-500'
                                          : 'text-gray-300 dark:text-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {review.comment}
                          </p>
                          <button className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                            <ThumbsUp className="h-4 w-4" />
                            <span>도움됨 ({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">
                ₩{template.price.toLocaleString()}
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  장바구니에 추가
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                    isWishlisted
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? '찜하기 취소' : '찜하기'}
                </button>
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  데모 보기
                </a>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-semibold text-lg mb-4">구매 혜택</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      평생 무료 업데이트
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      상업적 이용 가능
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      30일 환불 보장
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      6개월 기술 지원
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      즉시 다운로드
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h3 className="font-semibold mb-3">커스터마이징 필요하세요?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  전문가에게 맞춤 제작을 의뢰하세요
                </p>
                <Link to="/experts" className="btn-secondary w-full text-center block">
                  전문가 찾기
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Templates */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">비슷한 템플릿</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates
              .filter(
                (t) =>
                  t.category === template.category && t.id !== template.id
              )
              .slice(0, 4)
              .map((t) => (
                <Link
                  key={t.id}
                  to={`/templates/${t.id}`}
                  className="card hover:shadow-xl transition-shadow group"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="font-semibold mb-2">{t.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{t.rating}</span>
                    </div>
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      ₩{t.price.toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {template && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          templateName={template.name}
          templateId={template.id}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default TemplateDetail;
