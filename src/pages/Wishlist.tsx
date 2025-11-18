import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Star, Download } from 'lucide-react';
import { useCart, useToast } from '../contexts';
import { templates } from '../data/templates';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const { showToast } = useToast();

  const wishlistTemplates = templates.filter((template) =>
    wishlist.includes(template.id)
  );

  const handleAddToCart = (template: typeof templates[0]) => {
    addToCart(template);
    showToast('success', '장바구니에 추가되었습니다!');
  };

  if (wishlistTemplates.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            찜한 템플릿
          </h1>
          <div className="text-center py-16">
            <Heart className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              찜한 템플릿이 없습니다
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              마음에 드는 템플릿을 찜해보세요
            </p>
            <Link to="/templates" className="btn-primary inline-block">
              템플릿 둘러보기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            찜한 템플릿
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {wishlistTemplates.length}개의 템플릿
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {wishlistTemplates.map((template) => (
            <div
              key={template.id}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <Link
                  to={`/templates/${template.id}`}
                  className="flex-shrink-0"
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full md:w-64 h-48 object-cover rounded-lg"
                  />
                </Link>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        to={`/templates/${template.id}`}
                        className="group"
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {template.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {template.description}
                      </p>

                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-yellow-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {template.rating}
                          </span>
                          <span>({template.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{template.downloads.toLocaleString()}</span>
                        </div>
                        <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-xs">
                          {template.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {template.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        ₩{template.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleAddToCart(template)}
                        className="btn-primary flex items-center gap-2 whitespace-nowrap"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        장바구니
                      </button>
                      <button
                        onClick={() => {
                          removeFromWishlist(template.id);
                          showToast('info', '찜하기에서 제거되었습니다.');
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400">총 예상 금액</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                ₩
                {wishlistTemplates
                  .reduce((sum, template) => sum + template.price, 0)
                  .toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => {
                wishlistTemplates.forEach((template) => addToCart(template));
                showToast('success', `${wishlistTemplates.length}개의 템플릿이 장바구니에 추가되었습니다!`);
              }}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              모두 장바구니에 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
