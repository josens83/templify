import React from 'react';
import { MessageSquare, ThumbsUp, Eye, CheckCircle } from 'lucide-react';

const Community: React.FC = () => {
  const posts = [
    {
      id: '1',
      type: 'question',
      title: 'React에서 다크모드 구현하는 가장 좋은 방법은?',
      author: '김개발',
      avatar: 'https://i.pravatar.cc/150?img=1',
      date: '2시간 전',
      views: 234,
      likes: 12,
      comments: 8,
      tags: ['React', 'CSS', '다크모드'],
      solved: false,
    },
    {
      id: '2',
      type: 'article',
      title: 'TypeScript로 안전한 API 클라이언트 만들기',
      author: '박타입',
      avatar: 'https://i.pravatar.cc/150?img=2',
      date: '5시간 전',
      views: 456,
      likes: 34,
      comments: 12,
      tags: ['TypeScript', 'API', '튜토리얼'],
    },
    {
      id: '3',
      type: 'showcase',
      title: '제가 만든 포트폴리오 사이트 피드백 부탁드립니다',
      author: '이디자인',
      avatar: 'https://i.pravatar.cc/150?img=3',
      date: '1일 전',
      views: 789,
      likes: 56,
      comments: 23,
      tags: ['포트폴리오', '디자인', '피드백'],
    },
    {
      id: '4',
      type: 'question',
      title: 'Next.js vs Gatsby, 어떤 걸 선택해야 할까요?',
      author: '최프론트',
      avatar: 'https://i.pravatar.cc/150?img=4',
      date: '1일 전',
      views: 345,
      likes: 18,
      comments: 15,
      tags: ['Next.js', 'Gatsby', '조언'],
      solved: true,
    },
    {
      id: '5',
      type: 'article',
      title: '반응형 웹 디자인 베스트 프랙티스 2025',
      author: '정반응',
      avatar: 'https://i.pravatar.cc/150?img=5',
      date: '2일 전',
      views: 1234,
      likes: 89,
      comments: 31,
      tags: ['반응형', 'CSS', '디자인'],
    },
  ];

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'article':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'showcase':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'question':
        return '질문';
      case 'article':
        return '아티클';
      case 'showcase':
        return '쇼케이스';
      default:
        return type;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            커뮤니티
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            개발자들과 지식을 공유하고 질문하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h2 className="font-semibold text-lg mb-4">카테고리</h2>
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium">
                    전체
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    질문
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    아티클
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    쇼케이스
                  </button>
                </li>
              </ul>
            </div>

            <div className="card">
              <h2 className="font-semibold text-lg mb-4">인기 태그</h2>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'CSS'].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
                  최신순
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
                  인기순
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
                  미해결
                </button>
              </div>
              <button className="btn-primary whitespace-nowrap">
                글쓰기
              </button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${getPostTypeColor(
                                post.type
                              )}`}
                            >
                              {getPostTypeLabel(post.type)}
                            </span>
                            {post.type === 'question' && post.solved && (
                              <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                                <CheckCircle className="h-4 w-4" />
                                해결됨
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                            {post.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {post.author}
                        </span>
                        <span>{post.date}</span>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="flex gap-2">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  2
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  3
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  다음
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
