import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, isAuthenticated } = useApp();
  const [step, setStep] = useState<'payment' | 'success'>('payment');
  const [formData, setFormData] = useState({
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

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            장바구니가 비어있습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            결제할 상품이 없습니다.
          </p>
          <Link to="/templates" className="btn-primary inline-block">
            템플릿 둘러보기
          </Link>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 결제 처리 (데모용)
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 1000);
  };

  if (step === 'success') {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              결제가 완료되었습니다!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              구매하신 템플릿을 이제 다운로드할 수 있습니다.
            </p>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-lg mb-4">주문 정보</h2>
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    주문 번호
                  </span>
                  <span className="font-medium">
                    #ORD-{Date.now().toString().slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    결제 날짜
                  </span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    총 결제금액
                  </span>
                  <span className="font-semibold text-lg text-primary-600 dark:text-primary-400">
                    ₩{Math.floor(cartTotal * 1.15).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="btn-primary">
                내 대시보드로 이동
              </Link>
              <Link to="/templates" className="btn-secondary">
                계속 쇼핑하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const platformFee = Math.floor(cartTotal * 0.15);
  const totalAmount = cartTotal + platformFee;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          결제하기
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Information */}
              <div className="card">
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-semibold">카드 정보</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      카드 번호
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      카드 소유자 이름
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="홍길동"
                      required
                      className="input-field"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        만료일
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={3}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">청구 주소</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">주소</label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      placeholder="서울시 강남구 테헤란로 123"
                      required
                      className="input-field"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">도시</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="서울"
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        우편번호
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center text-lg py-4"
              >
                <Lock className="mr-2 h-5 w-5" />₩
                {totalAmount.toLocaleString()} 결제하기
              </button>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                결제 정보는 안전하게 암호화됩니다
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-semibold mb-6">주문 요약</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.templateId}
                    className="flex items-start space-x-3"
                  >
                    <img
                      src={item.template.image}
                      alt={item.template.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">
                        {item.template.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ₩{item.template.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    소계 ({cart.length}개)
                  </span>
                  <span>₩{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    플랫폼 수수료 (15%)
                  </span>
                  <span>₩{platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-3">
                  <span>총 결제금액</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ₩{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">구매 후 제공</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 즉시 다운로드</li>
                  <li>• 평생 무료 업데이트</li>
                  <li>• 6개월 기술 지원</li>
                  <li>• 30일 환불 보장</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
