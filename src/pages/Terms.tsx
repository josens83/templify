import React from 'react';
import { Calendar } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            이용약관
          </h1>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-5 w-5" />
            <span>최종 업데이트: 2024년 1월 1일</span>
          </div>
        </div>

        {/* Content */}
        <div className="card space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제1조 (목적)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              본 약관은 Templify(이하 "회사")가 제공하는 템플릿 마켓플레이스 및 관련 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제2조 (정의)
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                1. "서비스"란 회사가 제공하는 템플릿 판매 및 구매, 전문가 매칭, 커뮤니티 등의 모든 서비스를 의미합니다.
              </p>
              <p>
                2. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
              </p>
              <p>
                3. "회원"이란 회사와 서비스 이용계약을 체결하고 회원 ID를 부여받은 자를 말합니다.
              </p>
              <p>
                4. "템플릿"이란 회원이 서비스를 통해 판매 또는 구매하는 디지털 콘텐츠를 의미합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제3조 (약관의 효력 및 변경)
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.
              </p>
              <p>
                2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.
              </p>
              <p>
                3. 약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 공지합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제4조 (회원가입)
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
              </p>
              <p>
                2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
              </p>
              <p className="pl-6">
                - 가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우
              </p>
              <p className="pl-6">
                - 등록 내용에 허위, 기재누락, 오기가 있는 경우
              </p>
              <p className="pl-6">
                - 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제5조 (구매 및 결제)
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                1. 회원은 서비스 내에서 다음 각 호의 방법으로 구매를 신청할 수 있습니다.
              </p>
              <p className="pl-6">
                - 템플릿 선택 및 장바구니 담기
              </p>
              <p className="pl-6">
                - 결제 정보 입력
              </p>
              <p className="pl-6">
                - 약관 동의 및 구매 신청
              </p>
              <p>
                2. 회사는 회원의 구매신청이 다음 각 호에 해당하는 경우 승낙하지 않을 수 있습니다.
              </p>
              <p className="pl-6">
                - 실명이 아니거나 타인의 명의를 이용한 경우
              </p>
              <p className="pl-6">
                - 허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제6조 (환불 정책)
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                1. 회원은 구매일로부터 30일 이내에 환불을 요청할 수 있습니다.
              </p>
              <p>
                2. 다음 각 호의 경우에는 환불이 제한될 수 있습니다.
              </p>
              <p className="pl-6">
                - 템플릿 파일을 다운로드한 경우
              </p>
              <p className="pl-6">
                - 회원의 귀책사유로 인한 경우
              </p>
              <p>
                3. 환불 처리는 영업일 기준 5-7일이 소요될 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제7조 (라이선스 및 저작권)
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                1. 구매한 템플릿은 확장 라이선스가 포함되어 있어 상업적 목적으로 사용할 수 있습니다.
              </p>
              <p>
                2. 템플릿의 저작권은 원 제작자에게 있으며, 구매자는 사용 권리만을 취득합니다.
              </p>
              <p>
                3. 템플릿을 재판매하거나 무단으로 배포할 수 없습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제8조 (면책조항)
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
              </p>
              <p>
                2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
              </p>
              <p>
                3. 회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              제9조 (분쟁 해결)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              본 약관에 명시되지 않은 사항과 본 약관의 해석에 관하여는 대한민국 법률 및 상관례에 따릅니다. 서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              문의사항이 있으시면 <a href="mailto:legal@templify.com" className="text-primary-600 dark:text-primary-400 hover:underline">legal@templify.com</a>으로 연락주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
