import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  CheckCircle,
  Clock,
  Briefcase,
  Mail,
  ThumbsUp,
  ExternalLink,
} from 'lucide-react';
import { experts } from '../data/experts';
import { getReviewsByExpertId } from '../data/reviews';

const ExpertDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews'>(
    'about'
  );
  const [showContactForm, setShowContactForm] = useState(false);

  const expert = experts.find((e) => e.id === id);
  const reviews = expert ? getReviewsByExpertId(expert.id) : [];

  if (!expert) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            전문가를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            요청하신 전문가가 존재하지 않습니다.
          </p>
          <Link to="/experts" className="btn-primary">
            전문가 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

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
                to="/experts"
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                전문가
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              {expert.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Expert Header */}
            <div className="card mb-6">
              <div className="flex items-start space-x-6">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold">{expert.name}</h1>
                    {expert.verified && (
                      <CheckCircle className="h-7 w-7 text-primary-600" />
                    )}
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                    {expert.title}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{expert.rating}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({expert.reviewCount} 리뷰)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Briefcase className="h-5 w-5" />
                      <span>{expert.completedProjects}개 프로젝트 완료</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Clock className="h-5 w-5" />
                      <span>응답시간: {expert.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {expert.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="card">
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`pb-4 font-medium border-b-2 transition-colors ${
                      activeTab === 'about'
                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    소개
                  </button>
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`pb-4 font-medium border-b-2 transition-colors ${
                      activeTab === 'portfolio'
                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    포트폴리오
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-4 font-medium border-b-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    리뷰 ({expert.reviewCount})
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'about' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">자기소개</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {expert.bio}
                  </p>

                  <h3 className="text-lg font-semibold mb-3">보유 기술</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {expert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-3">사용 언어</h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div>
                  {expert.portfolio.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {expert.portfolio.map((project) => (
                        <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold mb-2">{project.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {project.description}
                            </p>
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 dark:text-primary-400 text-sm flex items-center space-x-1 hover:underline"
                              >
                                <span>프로젝트 보기</span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                      등록된 포트폴리오가 없습니다.
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
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
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                ₩{expert.hourlyRate.toLocaleString()}
                <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                  /시간
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                평균 응답시간: {expert.responseTime}
              </p>

              {!showContactForm ? (
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full btn-primary flex items-center justify-center mb-4"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  프로젝트 의뢰하기
                </button>
              ) : (
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">프로젝트 의뢰</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        프로젝트 제목
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="프로젝트 제목을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        프로젝트 설명
                      </label>
                      <textarea
                        className="input-field min-h-[120px]"
                        placeholder="프로젝트에 대해 자세히 설명해주세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        예산 범위
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="예: 100만원 - 200만원"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 btn-primary">
                        견적 요청
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="flex-1 btn-secondary"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-semibold mb-4">전문가 정보</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      완료 프로젝트
                    </span>
                    <span className="font-medium">{expert.completedProjects}개</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">평점</span>
                    <span className="font-medium">{expert.rating}/5.0</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">리뷰</span>
                    <span className="font-medium">{expert.reviewCount}개</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">인증 상태</span>
                    <span className="font-medium">
                      {expert.verified ? '✓ 인증됨' : '미인증'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h3 className="font-semibold mb-3">안전한 거래</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 에스크로 결제 시스템</li>
                  <li>• 프로젝트 완료 후 결제</li>
                  <li>• 분쟁 중재 서비스</li>
                  <li>• 100% 환불 보장</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Experts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">비슷한 전문가</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts
              .filter(
                (e) =>
                  e.expertise.some((exp) => expert.expertise.includes(exp)) &&
                  e.id !== expert.id
              )
              .slice(0, 4)
              .map((e) => (
                <Link
                  key={e.id}
                  to={`/experts/${e.id}`}
                  className="card text-center hover:shadow-xl transition-shadow"
                >
                  <img
                    src={e.avatar}
                    alt={e.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-1">{e.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {e.title}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{e.rating}</span>
                  </div>
                  <div className="text-primary-600 dark:text-primary-400 font-semibold">
                    ₩{e.hourlyRate.toLocaleString()}/시간
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetail;
