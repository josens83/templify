import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleShare = (platform: string) => {
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'kakao':
        // 카카오톡 공유는 실제 Kakao SDK가 필요하므로, 여기서는 간단히 URL 복사로 대체
        navigator.clipboard.writeText(url);
        alert('링크가 클립보드에 복사되었습니다!');
        return;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('링크가 클립보드에 복사되었습니다!');
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        <Share2 className="w-4 h-4 inline mr-1" />
        공유:
      </span>

      {/* Twitter */}
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-lg bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white transition-colors"
        title="트위터로 공유"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white transition-colors"
        title="페이스북으로 공유"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      {/* KakaoTalk */}
      <button
        onClick={() => handleShare('kakao')}
        className="p-2 rounded-lg bg-[#FEE500] hover:bg-[#f5dc00] text-[#000000] transition-colors"
        title="카카오톡으로 공유"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      {/* Copy Link */}
      <button
        onClick={() => handleShare('copy')}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
        title="링크 복사"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

export default SocialShare;
