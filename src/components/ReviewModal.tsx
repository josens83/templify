import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  templateId: string;
  onSubmit: (review: {
    rating: number;
    title: string;
    content: string;
    pros: string[];
    cons: string[];
  }) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  templateName,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pros, setPros] = useState(['']);
  const [cons, setCons] = useState(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }

    onSubmit({
      rating,
      title,
      content,
      pros: pros.filter((p) => p.trim() !== ''),
      cons: cons.filter((c) => c.trim() !== ''),
    });

    // Reset form
    setRating(0);
    setTitle('');
    setContent('');
    setPros(['']);
    setCons(['']);
    onClose();
  };

  const addPro = () => {
    setPros([...pros, '']);
  };

  const removePro = (index: number) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const updatePro = (index: number, value: string) => {
    const newPros = [...pros];
    newPros[index] = value;
    setPros(newPros);
  };

  const addCon = () => {
    setCons([...cons, '']);
  };

  const removeCon = (index: number) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  const updateCon = (index: number, value: string) => {
    const newCons = [...cons];
    newCons[index] = value;
    setCons(newCons);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              리뷰 작성
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {templateName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-3">
                별점 <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {rating}.0
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                리뷰 제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="한 줄로 요약해주세요"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">
                상세 리뷰 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="템플릿을 사용해본 경험을 자세히 공유해주세요"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white resize-none"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                최소 50자 이상 작성해주세요
              </p>
            </div>

            {/* Pros */}
            <div>
              <label className="block text-sm font-medium mb-2">장점</label>
              {pros.map((pro, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={pro}
                    onChange={(e) => updatePro(index, e.target.value)}
                    placeholder="이 템플릿의 장점을 알려주세요"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                  {pros.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePro(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPro}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                + 장점 추가
              </button>
            </div>

            {/* Cons */}
            <div>
              <label className="block text-sm font-medium mb-2">단점</label>
              {cons.map((con, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={con}
                    onChange={(e) => updateCon(index, e.target.value)}
                    placeholder="개선이 필요한 부분을 알려주세요"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                  {cons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCon(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCon}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                + 단점 추가
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            리뷰 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
