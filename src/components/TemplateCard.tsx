import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import type { Template } from '../types';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const isWishlisted = isInWishlist(template.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(template.id);
    } else {
      addToWishlist(template.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(template);
  };

  return (
    <div className="card group hover:shadow-xl transition-all duration-300">
      <Link to={`/templates/${template.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={template.image}
            alt={template.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
            }`}
            aria-label={isWishlisted ? '찜하기 취소' : '찜하기'}
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
            />
          </button>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
              {template.name}
            </h3>
            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-xs whitespace-nowrap">
              {template.category}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {template.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {template.rating}
              </span>
              <span className="text-xs">({template.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span className="text-xs">{template.downloads.toLocaleString()}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span className="px-2 py-0.5 text-gray-500 dark:text-gray-500 text-xs">
                +{template.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                가격
              </p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ₩{template.price.toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">장바구니</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TemplateCard;
