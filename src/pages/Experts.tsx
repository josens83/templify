import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, Search } from 'lucide-react';
import { experts } from '../data/experts';
import type { ExpertiseType } from '../types';

const expertiseOptions: { value: ExpertiseType | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'fullstack', label: '풀스택' },
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'design', label: '디자인' },
  { value: 'mobile', label: '모바일' },
];

const Experts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [sortBy, setSortBy] = useState('rating');
  const [maxRate, setMaxRate] = useState(150000);

  const filteredExperts = useMemo(() => {
    let result = experts;

    // Filter by expertise
    if (selectedExpertise !== 'all') {
      result = result.filter((e) =>
        e.expertise.includes(selectedExpertise as ExpertiseType)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.title.toLowerCase().includes(query) ||
          e.skills.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Filter by rate
    result = result.filter((e) => e.hourlyRate <= maxRate);

    // Sort
    switch (sortBy) {
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'projects':
        result = [...result].sort((a, b) => b.completedProjects - a.completedProjects);
        break;
      case 'rate-low':
        result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'rate-high':
        result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
    }

    return result;
  }, [selectedExpertise, searchQuery, sortBy, maxRate]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            전문가 찾기
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            검증된 전문가에게 프로젝트를 맡기세요
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="전문가 또는 스킬 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="rating">평점순</option>
              <option value="projects">프로젝트순</option>
              <option value="rate-low">요율 낮은순</option>
              <option value="rate-high">요율 높은순</option>
            </select>
          </div>

          {/* Expertise Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {expertiseOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedExpertise(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedExpertise === option.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Rate Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              최대 시간당 요율: ₩{maxRate.toLocaleString()}
            </label>
            <input
              type="range"
              min="50000"
              max="150000"
              step="5000"
              value={maxRate}
              onChange={(e) => setMaxRate(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredExperts.length}명의 전문가
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredExperts.map((expert) => (
            <Link
              key={expert.id}
              to={`/experts/${expert.id}`}
              className="card hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{expert.name}</h3>
                    {expert.verified && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {expert.title}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {expert.bio}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {expert.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
                {expert.skills.length > 4 && (
                  <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                    +{expert.skills.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{expert.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ({expert.reviewCount})
                  </span>
                </div>
                <div className="text-primary-600 dark:text-primary-400 font-semibold">
                  ₩{expert.hourlyRate.toLocaleString()}/시간
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {expert.completedProjects}개 프로젝트 완료 • 응답시간{' '}
                {expert.responseTime}
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              검색 결과가 없습니다. 다른 키워드로 시도해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experts;
