import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Calendar, CreditCard, Star, ShoppingBag } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  items: Array<{
    templateId: string;
    template: {
      id: string;
      name: string;
      image: string;
      price: number;
      description: string;
    };
    quantity: number;
  }>;
  total: number;
  status: string;
  paymentMethod: string;
}

const MyPurchases: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'downloads'>('all');

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const handleDownload = (templateName: string) => {
    // Simulate download
    alert(`다운로드 시작: ${templateName}\n\n실제 서비스에서는 템플릿 파일이 다운로드됩니다.`);
  };

  const allPurchasedTemplates = orders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      orderId: order.id,
      orderDate: order.date,
    }))
  );

  if (orders.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            구매 내역이 없습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            템플릿을 구매하고 여기에서 다운로드하세요
          </p>
          <Link to="/templates" className="btn-primary inline-block">
            템플릿 둘러보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          내 구매 목록
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'all'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            전체 주문 ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'downloads'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            다운로드 ({allPurchasedTemplates.length})
          </button>
        </div>

        {/* All Orders Tab */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">주문 번호</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>
                        {new Date(order.date).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span>
                        {{
                          card: '신용카드',
                          bank: '계좌이체',
                          kakao: '카카오페이',
                        }[order.paymentMethod]}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {order.status === 'completed' ? '결제 완료' : order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.templateId}
                      className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                    >
                      <Link to={`/templates/${item.template.id}`} className="flex-shrink-0">
                        <img
                          src={item.template.image}
                          alt={item.template.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/templates/${item.template.id}`}
                          className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {item.template.name}
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                          {item.template.description}
                        </p>
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-2">
                          ₩{item.template.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownload(item.template.name)}
                          className="btn-primary flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          다운로드
                        </button>
                        <Link
                          to={`/templates/${item.template.id}`}
                          className="btn-secondary flex items-center gap-2"
                        >
                          <Star className="h-4 w-4" />
                          리뷰 작성
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    총 {order.items.length}개 상품
                  </p>
                  <p className="text-lg font-semibold">
                    총 결제금액:{' '}
                    <span className="text-primary-600 dark:text-primary-400">
                      ₩{order.total.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Downloads Tab */}
        {activeTab === 'downloads' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPurchasedTemplates.map((item, index) => (
              <div key={`${item.orderId}-${item.templateId}-${index}`} className="card">
                <Link to={`/templates/${item.template.id}`}>
                  <img
                    src={item.template.image}
                    alt={item.template.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </Link>
                <Link
                  to={`/templates/${item.template.id}`}
                  className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 block mb-2"
                >
                  {item.template.name}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  구매일: {new Date(item.orderDate).toLocaleDateString('ko-KR')}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(item.template.name)}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    다운로드
                  </button>
                  <Link
                    to={`/templates/${item.template.id}`}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    title="상세 보기"
                  >
                    <FileText className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 card bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <h2 className="text-xl font-semibold mb-4">다운로드 안내</h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• 구매한 템플릿은 언제든지 무제한 다운로드할 수 있습니다</li>
            <li>• 모든 템플릿은 상업적 이용이 가능합니다</li>
            <li>• 평생 무료 업데이트를 제공합니다</li>
            <li>• 기술 지원은 구매일로부터 6개월간 제공됩니다</li>
            <li>• 환불은 구매일로부터 30일 이내에만 가능합니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;
