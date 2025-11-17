import React from 'react';
import { Calendar, Shield } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary-600 dark:text-primary-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              개인정보처리방침
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-5 w-5" />
            <span>최종 업데이트: 2024년 1월 1일</span>
          </div>
        </div>

        {/* Content */}
        <div className="card space-y-8">
          <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Templify(이하 "회사")는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. 개인정보의 수집 및 이용 목적
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공, 본인확인</li>
                <li>재화 또는 서비스 제공: 템플릿 판매 및 구매 서비스 제공, 콘텐츠 제공, 요금 결제 및 정산</li>
                <li>고객 상담: 민원처리, 고지사항 전달</li>
                <li>마케팅 및 광고: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. 수집하는 개인정보의 항목
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <div>
                <h3 className="font-semibold mb-2">가. 회원 가입 시</h3>
                <p>필수: 이름, 이메일 주소, 비밀번호</p>
                <p>선택: 전화번호, 프로필 사진</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">나. 결제 시</h3>
                <p>필수: 결제 정보(카드번호, 유효기간 등), 청구 주소</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">다. 자동 수집 정보</h3>
                <p>IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. 개인정보의 보유 및 이용 기간
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>회원 탈퇴 시: 즉시 파기 (단, 관계 법령에 따라 보존 필요 시 해당 기간 동안 보관)</li>
                <li>결제 기록: 5년 (전자상거래법)</li>
                <li>소비자 불만 또는 분쟁처리 기록: 3년</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. 개인정보의 제3자 제공
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. 회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않으며, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 mt-3 text-gray-700 dark:text-gray-300">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. 개인정보 처리의 위탁
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 dark:border-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">수탁업체</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">위탁업무 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">결제대행사</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">결제 처리</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">이메일 발송 대행사</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">이메일 발송</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. 정보주체의 권리·의무 및 행사방법
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
              <p className="mt-3">
                권리 행사는 회사에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. 개인정보의 안전성 확보조치
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>개인정보 취급 직원의 최소화 및 교육</li>
                <li>개인정보의 암호화</li>
                <li>해킹 등에 대비한 기술적 대책</li>
                <li>개인정보 처리시스템 접근 제한</li>
                <li>접속기록의 보관 및 위변조 방지</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. 개인정보 보호책임자
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:</p>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p>개인정보 보호책임자</p>
                <p>이메일: privacy@templify.com</p>
                <p>전화: 02-1234-5678</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. 개인정보 처리방침의 변경
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              이 개인정보 처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              개인정보 관련 문의사항이 있으시면 <a href="mailto:privacy@templify.com" className="text-primary-600 dark:text-primary-400 hover:underline">privacy@templify.com</a>으로 연락주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
