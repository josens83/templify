import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Facebook, Twitter, Instagram, Youtube, Mail, Send } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast('error', '이메일을 입력해주세요.');
      return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('error', '올바른 이메일 주소를 입력해주세요.');
      return;
    }

    setIsSubscribing(true);

    // localStorage에 구독자 저장
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');

    // 중복 구독 확인
    if (subscribers.includes(email)) {
      showToast('info', '이미 구독 중인 이메일입니다.');
      setIsSubscribing(false);
      return;
    }

    subscribers.push({
      email,
      subscribedAt: new Date().toISOString()
    });
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

    showToast('success', '뉴스레터 구독이 완료되었습니다! 🎉');
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Package className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Templify
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              전문가가 만든 프리미엄 템플릿을 구매하고, 맞춤 제작 서비스를 받을 수 있는
              원스톱 플랫폼입니다.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>

          {/* Templates */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              템플릿
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/templates?category=ecommerce"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  쇼핑몰
                </Link>
              </li>
              <li>
                <Link
                  to="/templates?category=portfolio"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  포트폴리오
                </Link>
              </li>
              <li>
                <Link
                  to="/templates?category=saas"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  SaaS 랜딩
                </Link>
              </li>
              <li>
                <Link
                  to="/templates?category=blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  블로그
                </Link>
              </li>
              <li>
                <Link
                  to="/templates?category=admin"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  관리자 대시보드
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              서비스
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/experts"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  전문가 찾기
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  가격 정책
                </Link>
              </li>
              <li>
                <Link
                  to="/sell"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  판매하기
                </Link>
              </li>
              <li>
                <Link
                  to="/become-expert"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  전문가 등록
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              지원
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  고객 지원
                </Link>
              </li>
              <li>
                <Link
                  to="/support/tickets"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  내 문의
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="mailto:support@templify.com"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@templify.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                뉴스레터 구독
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                신규 템플릿, 특별 할인 및 업데이트 소식을 가장 먼저 받아보세요
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                disabled={isSubscribing}
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                구독
              </button>
            </form>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              언제든지 구독을 취소할 수 있습니다
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; 2025 Templify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
