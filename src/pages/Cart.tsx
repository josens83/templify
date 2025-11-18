import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts';

const Cart: React.FC = () => {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              장바구니가 비어있습니다
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              마음에 드는 템플릿을 찾아 장바구니에 담아보세요
            </p>
            <Link
              to="/templates"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              템플릿 둘러보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          장바구니
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.templateId}
                  className="card flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <img
                    src={item.template.image}
                    alt={item.template.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {item.template.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                      {item.template.description}
                    </p>
                    <div className="text-primary-600 dark:text-primary-400 font-semibold">
                      ₩{item.template.price.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.templateId)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="삭제"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
              장바구니 비우기
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-semibold mb-6">주문 요약</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>상품 수</span>
                  <span>{cart.length}개</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>소계</span>
                  <span>₩{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>플랫폼 수수료 (15%)</span>
                  <span>₩{Math.floor(cartTotal * 0.15).toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>총 결제금액</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ₩{Math.floor(cartTotal * 1.15).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-primary flex items-center justify-center"
              >
                결제하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">구매 혜택</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 평생 무료 업데이트</li>
                  <li>• 상업적 이용 가능</li>
                  <li>• 30일 환불 보장</li>
                  <li>• 기술 지원 제공</li>
                </ul>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/templates"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                >
                  계속 쇼핑하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
