import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Clock, CheckCircle, XCircle, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface Ticket {
  id: string;
  category: string;
  subject: string;
  message: string;
  email: string;
  orderId?: string;
  status: 'open' | 'answered' | 'closed';
  createdAt: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  message: string;
  author: string;
  isAdmin: boolean;
  createdAt: string;
}

const SupportTickets: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    setTickets(savedTickets);
  }, []);

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      general: '일반 문의',
      purchase: '구매 관련',
      refund: '환불 요청',
      technical: '기술 지원',
      account: '계정 문제',
      seller: '판매자 문의'
    };
    return labels[category] || category;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            답변 대기
          </span>
        );
      case 'answered':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            답변 완료
          </span>
        );
      case 'closed':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 rounded flex items-center">
            <XCircle className="w-3 h-3 mr-1" />
            종료
          </span>
        );
      default:
        return null;
    }
  };

  const toggleTicket = (ticketId: string) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
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

  const filteredTickets = tickets.filter((ticket) => {
    if (filterStatus === 'all') return true;
    return ticket.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              내 문의 목록
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              접수하신 문의사항과 답변을 확인하세요
            </p>
          </div>
          <button
            onClick={() => navigate('/support')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            새 문의하기
          </button>
        </div>

        {/* 필터 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4">
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
                전체 ({tickets.length})
              </button>
              <button
                onClick={() => setFilterStatus('open')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'open'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                답변 대기 ({tickets.filter((t) => t.status === 'open').length})
              </button>
              <button
                onClick={() => setFilterStatus('answered')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'answered'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                답변 완료 ({tickets.filter((t) => t.status === 'answered').length})
              </button>
            </div>
          </div>
        </div>

        {/* 티켓 목록 */}
        {filteredTickets.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              문의 내역이 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              궁금하신 사항이 있으시면 언제든지 문의해주세요
            </p>
            <button
              onClick={() => navigate('/support')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              문의하기
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
              >
                {/* 티켓 헤더 */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  onClick={() => toggleTicket(ticket.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded">
                          {getCategoryLabel(ticket.category)}
                        </span>
                        {getStatusBadge(ticket.status)}
                        {ticket.orderId && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            주문번호: {ticket.orderId}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {ticket.subject}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(ticket.createdAt)} • {ticket.id}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      {expandedTicket === ticket.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {expandedTicket !== ticket.id && (
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {ticket.message}
                    </p>
                  )}
                </div>

                {/* 티켓 상세 (확장 시) */}
                {expandedTicket === ticket.id && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    {/* 원본 문의 */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {ticket.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {ticket.email}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                              {formatDate(ticket.createdAt)}
                            </span>
                          </div>
                          <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                              {ticket.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 답변 목록 */}
                    {ticket.replies && ticket.replies.length > 0 && (
                      <div className="p-6 space-y-6">
                        {ticket.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                reply.isAdmin
                                  ? 'bg-indigo-100 dark:bg-indigo-900/30'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            >
                              <span
                                className={`text-sm font-medium ${
                                  reply.isAdmin
                                    ? 'text-indigo-700 dark:text-indigo-400'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {reply.author.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="mb-2">
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {reply.author}
                                </span>
                                {reply.isAdmin && (
                                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 rounded">
                                    고객 지원팀
                                  </span>
                                )}
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                  {formatDate(reply.createdAt)}
                                </span>
                              </div>
                              <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                  {reply.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 답변 대기 메시지 */}
                    {ticket.status === 'open' && (!ticket.replies || ticket.replies.length === 0) && (
                      <div className="p-6 text-center">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 dark:text-gray-400">
                          고객 지원팀이 확인 중입니다. 곧 답변을 드리겠습니다.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTickets;
