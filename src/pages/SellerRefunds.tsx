import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface RefundRequest {
  id: string;
  orderId: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  orderDetails?: {
    total: number;
    items: Array<{
      template: {
        name: string;
        price: number;
      };
    }>;
    customerEmail?: string;
  };
}

const SellerRefunds: React.FC = () => {
  const { showToast } = useApp();
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadRefundRequests();
  }, []);

  const loadRefundRequests = () => {
    const requests = JSON.parse(localStorage.getItem('refundRequests') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    // Merge refund requests with order details
    const enrichedRequests = requests.map((request: RefundRequest) => {
      const order = orders.find((o: any) => o.id === request.orderId);
      return {
        ...request,
        orderDetails: order ? {
          total: order.total,
          items: order.items,
          customerEmail: order.customerInfo?.email
        } : undefined
      };
    });

    setRefundRequests(enrichedRequests);
  };

  const handleApprove = (refundId: string) => {
    const requests = refundRequests.map((req) =>
      req.id === refundId ? { ...req, status: 'approved' as const } : req
    );
    setRefundRequests(requests);

    // Update localStorage
    const storageRequests = JSON.parse(localStorage.getItem('refundRequests') || '[]');
    const updatedStorageRequests = storageRequests.map((req: RefundRequest) =>
      req.id === refundId ? { ...req, status: 'approved' } : req
    );
    localStorage.setItem('refundRequests', JSON.stringify(updatedStorageRequests));

    // Update order status
    const request = requests.find((r) => r.id === refundId);
    if (request) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.map((order: any) =>
        order.id === request.orderId ? { ...order, refundStatus: 'approved' } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }

    showToast('success', '환불 요청이 승인되었습니다.');
  };

  const handleReject = (refundId: string) => {
    const requests = refundRequests.map((req) =>
      req.id === refundId ? { ...req, status: 'rejected' as const } : req
    );
    setRefundRequests(requests);

    // Update localStorage
    const storageRequests = JSON.parse(localStorage.getItem('refundRequests') || '[]');
    const updatedStorageRequests = storageRequests.map((req: RefundRequest) =>
      req.id === refundId ? { ...req, status: 'rejected' } : req
    );
    localStorage.setItem('refundRequests', JSON.stringify(updatedStorageRequests));

    // Update order status
    const request = requests.find((r) => r.id === refundId);
    if (request) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.map((order: any) =>
        order.id === request.orderId ? { ...order, refundStatus: 'rejected' } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }

    showToast('success', '환불 요청이 거부되었습니다.');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            대기중
          </span>
        );
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            승인됨
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded flex items-center">
            <XCircle className="w-3 h-3 mr-1" />
            거부됨
          </span>
        );
      default:
        return null;
    }
  };

  const filteredRequests = refundRequests.filter((request) => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = searchQuery === '' ||
      request.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = refundRequests.filter((r) => r.status === 'pending').length;
  const approvedCount = refundRequests.filter((r) => r.status === 'approved').length;
  const rejectedCount = refundRequests.filter((r) => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            환불 관리
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            고객의 환불 요청을 확인하고 처리하세요
          </p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">전체</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {refundRequests.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">대기중</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {pendingCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">승인됨</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {approvedCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">거부됨</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {rejectedCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* 상태 필터 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">상태:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'pending'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  대기중
                </button>
                <button
                  onClick={() => setFilterStatus('approved')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'approved'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  승인됨
                </button>
                <button
                  onClick={() => setFilterStatus('rejected')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'rejected'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  거부됨
                </button>
              </div>
            </div>

            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="주문번호 또는 환불ID 검색"
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* 환불 요청 목록 */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <RotateCcw className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              환불 요청이 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filterStatus !== 'all' ? `${filterStatus === 'pending' ? '대기중인' : filterStatus === 'approved' ? '승인된' : '거부된'} 환불 요청이 없습니다` : '아직 환불 요청이 접수되지 않았습니다'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusBadge(request.status)}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {request.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      주문번호: {request.orderId}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      요청일시: {formatDate(request.createdAt)}
                    </p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        승인
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        거부
                      </button>
                    </div>
                  )}
                </div>

                {request.orderDetails && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">결제 금액</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ₩{request.orderDetails.total.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">상품 수</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {request.orderDetails.items.length}개
                        </p>
                      </div>
                      {request.orderDetails.customerEmail && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">고객 이메일</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {request.orderDetails.customerEmail}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">구매 템플릿</p>
                      <div className="space-y-1">
                        {request.orderDetails.items.map((item, index) => (
                          <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
                            • {item.template.name} (₩{item.template.price.toLocaleString()})
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">환불 사유</p>
                  <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                    {request.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerRefunds;
