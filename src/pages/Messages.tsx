import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    'c1'
  );
  const [messageInput, setMessageInput] = useState('');

  // Mock data
  const conversations: Conversation[] = [
    {
      id: 'c1',
      userId: 'u1',
      userName: '김철수',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: '템플릿 구매 관련해서 문의드립니다.',
      timestamp: '2024-01-15 14:30',
      unread: 2,
      messages: [
        {
          id: 'm1',
          senderId: 'u1',
          text: '안녕하세요! ModernShop Pro 템플릿에 관심이 있습니다.',
          timestamp: '2024-01-15 14:25',
          read: true,
        },
        {
          id: 'm2',
          senderId: 'me',
          text: '안녕하세요! 문의 주셔서 감사합니다. 어떤 점이 궁금하신가요?',
          timestamp: '2024-01-15 14:27',
          read: true,
        },
        {
          id: 'm3',
          senderId: 'u1',
          text: '템플릿 구매 관련해서 문의드립니다.',
          timestamp: '2024-01-15 14:30',
          read: false,
        },
        {
          id: 'm4',
          senderId: 'u1',
          text: '결제 후 커스터마이징 지원이 가능한가요?',
          timestamp: '2024-01-15 14:30',
          read: false,
        },
      ],
    },
    {
      id: 'c2',
      userId: 'u2',
      userName: '이영희',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: '데모 확인했습니다. 감사합니다!',
      timestamp: '2024-01-14 16:20',
      unread: 0,
      messages: [
        {
          id: 'm5',
          senderId: 'u2',
          text: 'BlogMaster 템플릿 데모 URL을 공유해주실 수 있나요?',
          timestamp: '2024-01-14 15:10',
          read: true,
        },
        {
          id: 'm6',
          senderId: 'me',
          text: '네, 여기 데모 링크입니다: https://demo.blogmaster.com',
          timestamp: '2024-01-14 15:15',
          read: true,
        },
        {
          id: 'm7',
          senderId: 'u2',
          text: '데모 확인했습니다. 감사합니다!',
          timestamp: '2024-01-14 16:20',
          read: true,
        },
      ],
    },
    {
      id: 'c3',
      userId: 'u3',
      userName: '박민수',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: '라이선스 관련 문의드립니다.',
      timestamp: '2024-01-13 10:45',
      unread: 0,
      messages: [
        {
          id: 'm8',
          senderId: 'u3',
          text: '라이선스 관련 문의드립니다.',
          timestamp: '2024-01-13 10:40',
          read: true,
        },
        {
          id: 'm9',
          senderId: 'u3',
          text: '여러 프로젝트에서 사용할 수 있나요?',
          timestamp: '2024-01-13 10:45',
          read: true,
        },
        {
          id: 'm10',
          senderId: 'me',
          text: '단일 프로젝트 라이선스입니다. 여러 프로젝트에 사용하시려면 확장 라이선스를 구매해주세요.',
          timestamp: '2024-01-13 10:50',
          read: true,
        },
      ],
    },
    {
      id: 'c4',
      userId: 'u4',
      userName: '정유진',
      userAvatar: 'https://i.pravatar.cc/150?img=9',
      lastMessage: '알겠습니다. 감사합니다!',
      timestamp: '2024-01-12 09:15',
      unread: 0,
      messages: [
        {
          id: 'm11',
          senderId: 'u4',
          text: '환불 정책이 어떻게 되나요?',
          timestamp: '2024-01-12 09:00',
          read: true,
        },
        {
          id: 'm12',
          senderId: 'me',
          text: '구매 후 30일 이내에 환불 요청이 가능합니다.',
          timestamp: '2024-01-12 09:10',
          read: true,
        },
        {
          id: 'm13',
          senderId: 'u4',
          text: '알겠습니다. 감사합니다!',
          timestamp: '2024-01-12 09:15',
          read: true,
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = conversations.find(
    (conv) => conv.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    console.log('Sending message:', messageInput);
    // 실제로는 API로 메시지 전송
    setMessageInput('');
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          메시지
        </h1>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="대화 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 ${
                  selectedConversation === conversation.id
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : ''
                }`}
              >
                <img
                  src={conversation.userAvatar}
                  alt={conversation.userName}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {conversation.userName}
                    </p>
                    {conversation.unread > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full flex-shrink-0">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conversation.lastMessage}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(conversation.timestamp).toLocaleString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        {currentConversation ? (
          <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentConversation.userAvatar}
                  alt={currentConversation.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {currentConversation.userName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    온라인
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === 'me' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === 'me'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === 'me'
                          ? 'text-primary-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">
              대화를 선택하세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
