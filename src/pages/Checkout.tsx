import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, ArrowLeft, Building2, Tag, Gift, Coins, Crown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  description: string;
}

type MembershipTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

interface MembershipInfo {
  tier: MembershipTier;
  points: number;
  totalSpent: number;
  discount: number; // percentage
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, isAuthenticated, showToast } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'kakao'>('card');
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [membership, setMembership] = useState<MembershipInfo>({
    tier: 'Bronze',
    points: 0,
    totalSpent: 0,
    discount: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // 사용 가능한 쿠폰 목록
  const availableCoupons: Coupon[] = [
    { code: 'WELCOME10', type: 'percentage', value: 10, minPurchase: 30000, description: '신규 회원 10% 할인' },
    { code: 'SAVE5000', type: 'fixed', value: 5000, minPurchase: 50000, description: '5만원 이상 구매 시 5천원 할인' },
    { code: 'VIP20', type: 'percentage', value: 20, minPurchase: 100000, description: 'VIP 회원 20% 할인' },
  ];

  useEffect(() => {
    // Load membership info from localStorage
    const savedMembership = JSON.parse(localStorage.getItem('membership') || 'null');
    if (savedMembership) {
      setMembership(savedMembership);
    } else {
      // Initialize membership based on total spent
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const totalSpent = orders.reduce((sum: number, order: any) => sum + order.total, 0);
      const points = Math.floor(totalSpent * 0.05); // 5% points back

      let tier: MembershipTier = 'Bronze';
      let discount = 0;

      if (totalSpent >= 500000) {
        tier = 'Platinum';
        discount = 15;
      } else if (totalSpent >= 300000) {
        tier = 'Gold';
        discount = 10;
      } else if (totalSpent >= 100000) {
        tier = 'Silver';
        discount = 5;
      }

      const membershipInfo = { tier, points, totalSpent, discount };
      setMembership(membershipInfo);
      localStorage.setItem('membership', JSON.stringify(membershipInfo));
    }
  }, []);

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

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());

    if (!coupon) {
      showToast('error', '유효하지 않은 쿠폰 코드입니다.');
      return;
    }

    if (cartTotal < coupon.minPurchase) {
      showToast('error', `이 쿠폰은 ₩${coupon.minPurchase.toLocaleString()} 이상 구매 시 사용 가능합니다.`);
      return;
    }

    setAppliedCoupon(coupon);
    showToast('success', '쿠폰이 적용되었습니다!');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    showToast('info', '쿠폰이 제거되었습니다.');
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const maxPoints = Math.min(membership.points, Math.floor(cartTotal * 0.5)); // 최대 50%까지만 포인트 사용 가능
    setPointsToUse(Math.min(value, maxPoints));
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
      // Calculate earned points (5% of final amount)
      const earnedPoints = Math.floor(finalTotal * 0.05);

      // Save order to localStorage
      const order = {
        id: `ORDER-${Date.now()}`,
        date: new Date().toISOString(),
        items: cart,
        subtotal: cartTotal,
        membershipDiscount,
        couponDiscount,
        pointsUsed: pointsToUse,
        platformFee,
        total: finalTotal,
        earnedPoints,
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

      // Update membership
      const updatedMembership = {
        ...membership,
        points: membership.points - pointsToUse + earnedPoints,
        totalSpent: membership.totalSpent + finalTotal
      };

      // Upgrade tier if needed
      if (updatedMembership.totalSpent >= 500000 && updatedMembership.tier !== 'Platinum') {
        updatedMembership.tier = 'Platinum';
        updatedMembership.discount = 15;
        showToast('success', '🎉 Platinum 등급으로 업그레이드되었습니다!');
      } else if (updatedMembership.totalSpent >= 300000 && updatedMembership.tier === 'Silver') {
        updatedMembership.tier = 'Gold';
        updatedMembership.discount = 10;
        showToast('success', '🎉 Gold 등급으로 업그레이드되었습니다!');
      } else if (updatedMembership.totalSpent >= 100000 && updatedMembership.tier === 'Bronze') {
        updatedMembership.tier = 'Silver';
        updatedMembership.discount = 5;
        showToast('success', '🎉 Silver 등급으로 업그레이드되었습니다!');
      }

      localStorage.setItem('membership', JSON.stringify(updatedMembership));

      // Clear cart
      clearCart();
      setProcessing(false);

      // Navigate to order complete page
      navigate(`/order-complete/${order.id}`);
    }, 2000);
  };

  // Calculate discounts
  const membershipDiscount = Math.floor(cartTotal * (membership.discount / 100));

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = Math.floor((cartTotal - membershipDiscount) * (appliedCoupon.value / 100));
    } else {
      couponDiscount = appliedCoupon.value;
    }
  }

  const discountedTotal = cartTotal - membershipDiscount - couponDiscount - pointsToUse;
  const platformFee = Math.floor(discountedTotal * 0.15);
  const finalTotal = discountedTotal + platformFee;

  const getMembershipIcon = (tier: MembershipTier) => {
    const colors = {
      Bronze: 'text-amber-700',
      Silver: 'text-gray-400',
      Gold: 'text-yellow-500',
      Platinum: 'text-purple-500'
    };
    return <Crown className={`w-5 h-5 ${colors[tier]}`} />;
  };

  const maxPointsUsable = Math.min(membership.points, Math.floor(cartTotal * 0.5));

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
              {/* Membership Badge */}
              <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getMembershipIcon(membership.tier)}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">현재 등급</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{membership.tier} 멤버</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">등급 혜택</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {membership.discount}% 할인
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">보유 포인트</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {membership.points.toLocaleString()}P
                    </p>
                  </div>
                </div>
              </div>

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
                    ₩{finalTotal.toLocaleString()} 결제하기
                  </>
                )}
              </button>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                결제 정보는 안전하게 암호화됩니다
              </p>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24 space-y-4">
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

                {/* Coupon Input */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    쿠폰 코드
                  </label>
                  {appliedCoupon ? (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-900 dark:text-green-300">
                            {appliedCoupon.code}
                          </p>
                          <p className="text-xs text-green-700 dark:text-green-400">
                            {appliedCoupon.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          제거
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="쿠폰 코드 입력"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                      >
                        적용
                      </button>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <p className="font-medium mb-1">사용 가능한 쿠폰:</p>
                    <ul className="space-y-1">
                      {availableCoupons.map((coupon) => (
                        <li key={coupon.code}>• {coupon.code} - {coupon.description}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Points Usage */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    <Coins className="w-4 h-4 mr-1" />
                    포인트 사용 (최대 50%)
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={pointsToUse}
                      onChange={handlePointsChange}
                      min="0"
                      max={maxPointsUsable}
                      placeholder="0"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setPointsToUse(maxPointsUsable)}
                      className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700"
                    >
                      전액
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    사용 가능: {maxPointsUsable.toLocaleString()}P / 보유: {membership.points.toLocaleString()}P
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>소계</span>
                    <span>₩{cartTotal.toLocaleString()}</span>
                  </div>

                  {membership.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span className="flex items-center">
                        <Gift className="w-4 h-4 mr-1" />
                        {membership.tier} 회원 할인 ({membership.discount}%)
                      </span>
                      <span>-₩{membershipDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        쿠폰 할인
                      </span>
                      <span>-₩{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {pointsToUse > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span className="flex items-center">
                        <Coins className="w-4 h-4 mr-1" />
                        포인트 사용
                      </span>
                      <span>-₩{pointsToUse.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>플랫폼 수수료 (15%)</span>
                    <span>₩{platformFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>총 결제금액</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      ₩{finalTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Earn Points Info */}
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <p className="text-xs text-indigo-900 dark:text-indigo-300 flex items-center">
                      <Gift className="w-4 h-4 mr-1" />
                      이번 구매로 <strong className="mx-1">{Math.floor(finalTotal * 0.05).toLocaleString()}P</strong> 적립 예정
                    </p>
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

                <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
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
