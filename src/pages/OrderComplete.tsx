import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Download, FileText, ArrowRight, Home } from 'lucide-react';
import { getItem } from '../utils/storage';

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
    };
    quantity: number;
  }>;
  total: number;
  status: string;
  paymentMethod: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const OrderComplete: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Load order from localStorage
    const orders = getItem<Order[]>('orders') || [];
    const foundOrder = orders.find((o: Order) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Redirect if order not found
      setTimeout(() => navigate('/'), 3000);
    }
  }, [orderId, navigate]);

  if (!order) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            주문을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            홈으로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  const paymentMethodText = {
    card: '신용카드',
    bank: '계좌이체',
    kakao: '카카오페이',
  }[order.paymentMethod];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Message */}
        <div className="card text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            결제가 완료되었습니다!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            구매해 주셔서 감사합니다.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            구매 확인 이메일이 <span className="font-medium">{order.customerInfo.email}</span>로 전송되었습니다.
          </p>
        </div>

        {/* Order Information */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-6">주문 정보</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">주문 번호</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">결제 날짜</p>
              <p className="font-medium">
                {new Date(order.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">결제 수단</p>
              <p className="font-medium">{paymentMethodText}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">주문 상태</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                결제 완료
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">주문자 정보</p>
            <p className="font-medium">{order.customerInfo.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerInfo.email}</p>
            {order.customerInfo.phone && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerInfo.phone}</p>
            )}
          </div>
        </div>

        {/* Purchased Items */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-6">구매한 템플릿</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.templateId}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <img
                  src={item.template.image}
                  alt={item.template.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ₩{item.template.price.toLocaleString()}
                  </p>
                </div>
                <Link
                  to={`/my-purchases`}
                  className="btn-primary flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  다운로드
                </Link>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>총 결제금액</span>
              <span className="text-primary-600 dark:text-primary-400">
                ₩{order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card mb-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <h2 className="text-xl font-semibold mb-4">다음 단계</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Download className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
              <div>
                <p className="font-medium">템플릿 다운로드</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  구매한 템플릿을 즉시 다운로드하실 수 있습니다
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
              <div>
                <p className="font-medium">라이선스 확인</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  상업적 이용이 가능한 확장 라이선스가 포함되어 있습니다
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
              <div>
                <p className="font-medium">평생 업데이트</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  무료 업데이트와 6개월 기술 지원을 받으실 수 있습니다
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/my-purchases" className="flex-1 btn-primary flex items-center justify-center">
            <Download className="mr-2 h-5 w-5" />
            내 구매 목록으로 이동
          </Link>
          <Link to="/templates" className="flex-1 btn-secondary flex items-center justify-center">
            계속 쇼핑하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link to="/" className="btn-secondary flex items-center justify-center px-6">
            <Home className="h-5 w-5" />
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>문의사항이 있으신가요?</p>
          <Link to="/community" className="text-primary-600 dark:text-primary-400 hover:underline">
            고객 지원 센터
          </Link>
          <span className="mx-2">•</span>
          <a href={`mailto:support@templify.com?subject=주문 문의 (${order.id})`} className="text-primary-600 dark:text-primary-400 hover:underline">
            이메일 문의
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
