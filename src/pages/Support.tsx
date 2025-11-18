import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send, AlertCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getItem, setItem } from '../utils/storage';

const Support: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    category: 'general',
    subject: '',
    message: '',
    email: '',
    orderId: ''
  });

  const categories = [
    { value: 'general', label: '일반 문의' },
    { value: 'purchase', label: '구매 관련' },
    { value: 'refund', label: '환불 요청' },
    { value: 'technical', label: '기술 지원' },
    { value: 'account', label: '계정 문제' },
    { value: 'seller', label: '판매자 문의' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim() || !formData.email.trim()) {
      showToast('error', '모든 필수 항목을 입력해주세요.');
      return;
    }

    // 티켓 생성
    const ticket = {
      id: `TICKET-${Date.now()}`,
      ...formData,
      status: 'open',
      createdAt: new Date().toISOString(),
      replies: []
    };

    // localStorage에 티켓 저장
    const tickets = getItem<any[]>('supportTickets') || [];
    tickets.push(ticket);
    setItem('supportTickets', tickets);

    showToast('success', '문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
    navigate('/support/tickets');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            고객 지원
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            무엇을 도와드릴까요? 문의사항을 남겨주시면 빠르게 답변드리겠습니다.
          </p>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <p className="font-medium mb-1">답변 시간 안내</p>
              <p>평일 09:00 - 18:00 (주말 및 공휴일 제외)</p>
              <p className="mt-2">
                • 일반 문의: 24시간 내 답변<br />
                • 기술 지원: 48시간 내 답변<br />
                • 환불 요청: 영업일 기준 3일 내 처리
              </p>
            </div>
          </div>
        </div>

        {/* 문의 폼 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                문의 유형 <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="답변을 받을 이메일 주소"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
            </div>

            {/* 주문번호 (선택사항) */}
            {(formData.category === 'purchase' || formData.category === 'refund') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  주문번호 (선택사항)
                </label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  placeholder="ORDER-123456789"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  주문번호를 입력하시면 더 빠르게 처리할 수 있습니다.
                </p>
              </div>
            )}

            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="문의 제목을 입력하세요"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                문의 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="문의 내용을 자세히 작성해주세요"
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                문제를 자세히 설명해주시면 더 정확한 답변을 드릴 수 있습니다.
              </p>
            </div>

            {/* 버튼 */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                문의 접수하기
              </button>
              <button
                type="button"
                onClick={() => navigate('/support/tickets')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                내 문의 보기
              </button>
            </div>
          </form>
        </div>

        {/* 빠른 도움말 */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            빠른 도움말
          </h3>
          <div className="space-y-3">
            <a
              href="/faq"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-900 dark:text-white">자주 묻는 질문 (FAQ)</span>
              <span className="text-indigo-600 dark:text-indigo-400">→</span>
            </a>
            <a
              href="/terms"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-900 dark:text-white">이용약관</span>
              <span className="text-indigo-600 dark:text-indigo-400">→</span>
            </a>
            <a
              href="/privacy"
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-900 dark:text-white">개인정보처리방침</span>
              <span className="text-indigo-600 dark:text-indigo-400">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
