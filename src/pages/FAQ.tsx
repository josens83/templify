import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Mail, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: '구매 및 결제',
    question: '어떤 결제 수단을 이용할 수 있나요?',
    answer: '신용카드, 계좌이체, 카카오페이를 지원합니다. 모든 결제는 안전하게 암호화되어 처리됩니다.',
  },
  {
    id: '2',
    category: '구매 및 결제',
    question: '구매 후 바로 다운로드할 수 있나요?',
    answer: '네, 결제가 완료되면 즉시 다운로드가 가능합니다. "내 구매 목록" 페이지에서 언제든지 다시 다운로드하실 수 있습니다.',
  },
  {
    id: '3',
    category: '구매 및 결제',
    question: '환불이 가능한가요?',
    answer: '구매일로부터 30일 이내에 환불 요청이 가능합니다. 단, 템플릿 파일이 다운로드된 경우 환불이 제한될 수 있습니다.',
  },
  {
    id: '4',
    category: '라이선스',
    question: '상업적으로 사용할 수 있나요?',
    answer: '네, 모든 템플릿은 확장 라이선스가 포함되어 있어 상업적 목적으로 자유롭게 사용하실 수 있습니다.',
  },
  {
    id: '5',
    category: '라이선스',
    question: '템플릿을 여러 프로젝트에 사용할 수 있나요?',
    answer: '네, 한 번 구매하시면 무제한으로 여러 프로젝트에 사용하실 수 있습니다. 단, 템플릿 자체를 재판매할 수는 없습니다.',
  },
  {
    id: '6',
    category: '라이선스',
    question: '고객에게 템플릿을 제공할 수 있나요?',
    answer: '클라이언트를 위한 프로젝트에 템플릿을 사용하는 것은 가능하지만, 템플릿 원본 파일을 고객에게 직접 전달할 수는 없습니다.',
  },
  {
    id: '7',
    category: '기술 지원',
    question: '기술 지원이 제공되나요?',
    answer: '네, 구매일로부터 6개월간 이메일을 통한 기술 지원을 제공합니다. 설치 및 커스터마이징에 대한 도움을 받으실 수 있습니다.',
  },
  {
    id: '8',
    category: '기술 지원',
    question: '업데이트는 어떻게 받나요?',
    answer: '모든 템플릿은 평생 무료 업데이트를 제공합니다. 업데이트가 있을 경우 이메일로 알림을 받으실 수 있으며, "내 구매 목록"에서 최신 버전을 다운로드하실 수 있습니다.',
  },
  {
    id: '9',
    category: '기술 지원',
    question: '커스터마이징 서비스도 제공하나요?',
    answer: '템플릿 판매자가 별도의 커스터마이징 서비스를 제공하는 경우가 있습니다. 템플릿 상세 페이지에서 판매자에게 문의하실 수 있습니다.',
  },
  {
    id: '10',
    category: '계정',
    question: '계정을 만들어야 하나요?',
    answer: '네, 템플릿 구매 및 다운로드를 위해서는 계정 생성이 필요합니다. 가입은 무료이며 간단하게 진행됩니다.',
  },
  {
    id: '11',
    category: '계정',
    question: '비밀번호를 잊어버렸어요.',
    answer: '로그인 페이지에서 "비밀번호 찾기"를 클릭하시면 등록된 이메일로 비밀번호 재설정 링크가 전송됩니다.',
  },
  {
    id: '12',
    category: '판매',
    question: '제 템플릿을 판매할 수 있나요?',
    answer: '네, 누구나 템플릿 판매자가 될 수 있습니다. "판매자 대시보드"에서 템플릿을 업로드하고 판매를 시작하실 수 있습니다.',
  },
  {
    id: '13',
    category: '판매',
    question: '수수료는 얼마인가요?',
    answer: '플랫폼 수수료는 판매 금액의 15%입니다. 나머지 85%는 판매자에게 지급됩니다.',
  },
  {
    id: '14',
    category: '판매',
    question: '정산은 언제 이루어지나요?',
    answer: '매월 1일에 전월 판매 금액이 정산됩니다. 정산 금액은 등록하신 계좌로 자동 입금됩니다.',
  },
];

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = ['전체', ...Array.from(new Set(faqData.map((item) => item.category)))];

  const filteredFAQs = faqData.filter((item) => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            자주 묻는 질문
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            궁금하신 점을 빠르게 찾아보세요
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="질문 검색..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                검색 결과가 없습니다.
              </p>
            </div>
          ) : (
            filteredFAQs.map((item) => (
              <div
                key={item.id}
                className="card hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-start justify-between text-left"
                >
                  <div className="flex-1 pr-4">
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-xs font-medium mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.question}
                    </h3>
                  </div>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(item.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            찾으시는 답변이 없으신가요?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            저희 고객 지원팀이 도와드리겠습니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:support@templify.com"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  이메일 문의
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  support@templify.com
                </p>
              </div>
            </a>
            <a
              href="/community"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <MessageCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  커뮤니티
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  다른 사용자와 소통하기
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
