import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, ArrowLeft, Building2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, isAuthenticated, showToast } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'kakao'>('card');
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
  });

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            로그인이 필요합니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            결제를 진행하려면 먼저 로그인해주세요.
          </p>
          <Link to="/login" className="btn-primary inline-block">
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            장바구니가 비어있습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            결제할 상품이 없습니다.
          </p>
          <button
            onClick={() => navigate('/templates')}
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            템플릿 둘러보기
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      showToast('error', '구매 약관에 동의해주세요.');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Save order to localStorage
      const order = {
        id: `ORDER-${Date.now()}`,
        date: new Date().toISOString(),
        items: cart,
        total: Math.floor(cartTotal * 1.15),
        status: 'completed',
        paymentMethod,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));

      // Clear cart
      clearCart();
      setProcessing(false);

      // Navigate to order complete page
      navigate(`/order-complete/${order.id}`);
    }, 2000);
  };

  const platformFee = Math.floor(cartTotal * 0.15);
  const totalAmount = cartTotal + platformFee;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            장바구니로 돌아가기
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">결제하기</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">연락처 정보</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">이름 *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="홍길동"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">이메일 *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className="input-field"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      구매 영수증과 다운로드 링크가 전송됩니다
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">전화번호</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="010-0000-0000"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">결제 수단</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">신용카드</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Building2 className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">계좌이체</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('kakao')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'kakao'
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <CheckCircle className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">카카오페이</p>
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">카드번호 *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">유효기간 *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVC *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="000"
                          maxLength={3}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">카드 소유자명 *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="홍길동"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-300">
                      결제 진행 시 계좌이체 정보가 이메일로 전송됩니다.
                      입금 확인 후 템플릿이 제공됩니다.
                    </p>
                  </div>
                )}

                {paymentMethod === 'kakao' && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-900 dark:text-yellow-300">
                      결제 진행 시 카카오페이 결제창이 새 창으로 열립니다.
                    </p>
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="card">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm">
                    <span className="font-medium">구매 약관에 동의합니다 *</span>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      환불 정책, 라이선스 약관 및 이용 약관에 동의합니다.
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    처리 중...
                  </span>
                ) : (
                  <>
                    <Lock className="inline mr-2 h-5 w-5" />
                    ₩{totalAmount.toLocaleString()} 결제하기
                  </>
                )}
              </button>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                결제 정보는 안전하게 암호화됩니다
              </p>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="text-xl font-semibold mb-4">주문 요약</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.templateId} className="flex gap-3">
                      <img
                        src={item.template.image}
                        alt={item.template.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.template.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ₩{item.template.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>소계</span>
                    <span>₩{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>플랫폼 수수료 (15%)</span>
                    <span>₩{Math.floor(cartTotal * 0.15).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>총 결제금액</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      ₩{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">구매 후 제공</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 즉시 다운로드</li>
                    <li>• 평생 무료 업데이트</li>
                    <li>• 6개월 기술 지원</li>
                    <li>• 30일 환불 보장</li>
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="h-3 w-3 mr-1" />
                  안전한 결제
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
