import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Zap, Crown, Rocket, HelpCircle } from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: '무료',
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      description: '시작하기에 완벽한 플랜',
      features: [
        { name: '템플릿 구매', included: true },
        { name: '기본 커뮤니티 참여', included: true },
        { name: '월 3개까지 다운로드', included: true },
        { name: '플랫폼 수수료 20%', included: true, note: true },
        { name: '우선 지원', included: false },
        { name: '무제한 다운로드', included: false },
        { name: '전문가 매칭 할인', included: false },
        { name: '독점 템플릿 접근', included: false },
      ],
      cta: '무료로 시작하기',
      highlighted: false,
    },
    {
      name: '프로',
      icon: Crown,
      price: { monthly: 29000, yearly: 290000 },
      description: '전문가를 위한 최고의 선택',
      features: [
        { name: '모든 무료 기능', included: true },
        { name: '월 20개까지 다운로드', included: true },
        { name: '플랫폼 수수료 15%', included: true, note: true },
        { name: '우선 고객 지원', included: true },
        { name: '전문가 매칭 10% 할인', included: true },
        { name: '독점 템플릿 접근', included: true },
        { name: '분석 대시보드', included: true },
        { name: '무제한 다운로드', included: false },
      ],
      cta: '프로 시작하기',
      highlighted: true,
    },
    {
      name: '비즈니스',
      icon: Rocket,
      price: { monthly: 99000, yearly: 990000 },
      description: '팀과 기업을 위한 솔루션',
      features: [
        { name: '모든 프로 기능', included: true },
        { name: '무제한 다운로드', included: true },
        { name: '플랫폼 수수료 10%', included: true, note: true },
        { name: '24/7 전담 지원', included: true },
        { name: '전문가 매칭 20% 할인', included: true },
        { name: '팀 협업 도구', included: true },
        { name: '커스텀 브랜딩', included: true },
        { name: 'API 접근', included: true },
      ],
      cta: '비즈니스 시작하기',
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: '언제든지 플랜을 변경할 수 있나요?',
      answer:
        '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 업그레이드 시 즉시 적용되며, 다운그레이드는 다음 결제 주기부터 적용됩니다.',
    },
    {
      question: '플랫폼 수수료는 어떻게 작동하나요?',
      answer:
        '템플릿 판매 시 발생하는 수수료입니다. 무료 플랜은 20%, 프로는 15%, 비즈니스는 10%의 수수료가 적용됩니다. 수수료는 판매 금액에서 자동으로 차감됩니다.',
    },
    {
      question: '환불 정책은 어떻게 되나요?',
      answer:
        '구독료는 7일 이내 100% 환불이 가능합니다. 단, 이미 사용한 다운로드나 혜택은 환불 시 차감될 수 있습니다.',
    },
    {
      question: '팀원을 추가할 수 있나요?',
      answer:
        '비즈니스 플랜에서는 무제한으로 팀원을 추가할 수 있습니다. 프로 플랜은 추가 비용으로 팀원을 초대할 수 있습니다.',
    },
    {
      question: '결제 방법은 무엇이 있나요?',
      answer:
        '신용카드, 체크카드, 계좌이체를 지원합니다. 비즈니스 플랜은 세금계산서 발행도 가능합니다.',
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
    if (billingCycle === 'yearly') {
      return Math.floor(price / 12);
    }
    return price;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (billingCycle === 'yearly' && plan.price.monthly > 0) {
      const yearlyTotal = plan.price.monthly * 12;
      const savings = yearlyTotal - plan.price.yearly;
      return Math.floor((savings / yearlyTotal) * 100);
    }
    return 0;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            모든 규모의 비즈니스를 위한 플랜
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            필요에 맞는 완벽한 플랜을 선택하세요
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              월간 결제
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              연간 결제
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                17% 할인
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const savings = getSavings(plan);

            return (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.highlighted
                    ? 'ring-2 ring-primary-600 shadow-2xl scale-105'
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      인기
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      ₩{getPrice(plan).toLocaleString()}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      /월
                    </span>
                  </div>
                  {savings > 0 && billingCycle === 'yearly' && (
                    <p className="text-green-600 dark:text-green-400 text-sm mt-2">
                      연간 {savings}% 절약
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-400 line-through'
                        }`}
                      >
                        {feature.name}
                        {feature.note && feature.included && (
                          <span className="ml-1 text-xs text-primary-600 dark:text-primary-400">
                            *
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/login"
                  className={`w-full text-center block py-3 rounded-lg font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Commission Rates */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            판매 수수료 비교
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 px-6 text-left">구분</th>
                  <th className="py-4 px-6 text-center">무료</th>
                  <th className="py-4 px-6 text-center">프로</th>
                  <th className="py-4 px-6 text-center">비즈니스</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6">템플릿 판매 수수료</td>
                  <td className="py-4 px-6 text-center">20%</td>
                  <td className="py-4 px-6 text-center font-semibold text-primary-600">
                    15%
                  </td>
                  <td className="py-4 px-6 text-center font-semibold text-primary-600">
                    10%
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6">전문가 매칭 수수료</td>
                  <td className="py-4 px-6 text-center">20%</td>
                  <td className="py-4 px-6 text-center">18%</td>
                  <td className="py-4 px-6 text-center">16%</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">월 다운로드 제한</td>
                  <td className="py-4 px-6 text-center">3개</td>
                  <td className="py-4 px-6 text-center">20개</td>
                  <td className="py-4 px-6 text-center">무제한</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <HelpCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center card bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
          <h2 className="text-3xl font-bold mb-4">
            아직 확실하지 않으신가요?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            무료 플랜으로 시작해서 언제든지 업그레이드하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/templates" className="btn-primary">
              템플릿 둘러보기
            </Link>
            <Link to="/experts" className="btn-secondary">
              전문가 찾기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
