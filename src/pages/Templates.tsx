import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { templates } from '../data/templates';
import TemplateCard from '../components/TemplateCard';
import type { TemplateCategory } from '../types';

const categories: { value: TemplateCategory | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'ecommerce', label: '쇼핑몰' },
  { value: 'portfolio', label: '포트폴리오' },
  { value: 'saas', label: 'SaaS' },
  { value: 'blog', label: '블로그' },
  { value: 'landing', label: '랜딩페이지' },
  { value: 'dashboard', label: '대시보드' },
  { value: 'mobile', label: '모바일' },
  { value: 'education', label: '교육' },
  { value: 'corporate', label: '기업' },
  { value: 'admin', label: '관리자' },
  { value: 'creative', label: '크리에이티브' },
];

const sortOptions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'rating', label: '평점순' },
  { value: 'price-low', label: '가격 낮은순' },
  { value: 'price-high', label: '가격 높은순' },
];

const Templates: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTemplates = useMemo(() => {
    let result = templates;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    result = result.filter(
      (t) => t.price >= priceRange[0] && t.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'recent':
        result = [...result].sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default: // popular
        result = [...result].sort((a, b) => b.downloads - a.downloads);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== 'all') {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            템플릿 마켓플레이스
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            전문가가 만든 프리미엄 웹사이트 템플릿을 찾아보세요
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
                placeholder="템플릿 검색..."
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
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              필터
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  가격 범위: ₩{priceRange[0].toLocaleString()} - ₩
                  {priceRange[1].toLocaleString()}
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredTemplates.length}개의 템플릿
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
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

export default Templates;
