import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Eye,
  EyeOff,
  Save,
  Trash2,
} from 'lucide-react';

type SettingsTab = 'profile' | 'payment' | 'notifications' | 'security';

const Settings: React.FC = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    website: '',
    location: '',
  });

  // Payment settings
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailMessages: true,
    emailUpdates: false,
    pushSales: true,
    pushMessages: true,
    pushUpdates: false,
  });

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileSave = () => {
    console.log('Profile saved:', profileData);
    alert('프로필이 저장되었습니다.');
  };

  const handlePaymentSave = () => {
    console.log('Payment saved:', paymentData);
    alert('결제 정보가 저장되었습니다.');
  };

  const handleNotificationsSave = () => {
    console.log('Notifications saved:', notifications);
    alert('알림 설정이 저장되었습니다.');
  };

  const handlePasswordChange = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (securityData.newPassword.length < 8) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }
    console.log('Password changed');
    alert('비밀번호가 변경되었습니다.');
    setSecurityData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const tabs = [
    { id: 'profile' as const, label: '프로필', icon: User },
    { id: 'payment' as const, label: '결제 정보', icon: CreditCard },
    { id: 'notifications' as const, label: '알림', icon: Bell },
    { id: 'security' as const, label: '보안', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          설정
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  프로필 설정
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      이름
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      자기소개
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="자신을 소개해주세요"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Globe className="w-4 h-4 inline mr-1" />
                        웹사이트
                      </label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) =>
                          setProfileData({ ...profileData, website: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        위치
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({ ...profileData, location: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="서울, 대한민국"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleProfileSave}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      저장
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  결제 정보
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      카드 번호
                    </label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, cardNumber: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      카드 소유자 이름
                    </label>
                    <input
                      type="text"
                      value={paymentData.cardName}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, cardName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="홍길동"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        만료일
                      </label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) =>
                          setPaymentData({ ...paymentData, expiryDate: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) =>
                          setPaymentData({ ...paymentData, cvv: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      onClick={handlePaymentSave}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      저장
                    </button>
                    <button
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      카드 삭제
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  알림 설정
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      이메일 알림
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          판매 알림
                        </span>
                        <input
                          type="checkbox"
                          checked={notifications.emailSales}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              emailSales: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          메시지 알림
                        </span>
                        <input
                          type="checkbox"
                          checked={notifications.emailMessages}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              emailMessages: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          업데이트 및 뉴스
                        </span>
                        <input
                          type="checkbox"
                          checked={notifications.emailUpdates}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              emailUpdates: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      푸시 알림
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          판매 알림
                        </span>
                        <input
                          type="checkbox"
                          checked={notifications.pushSales}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              pushSales: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          메시지 알림
                        </span>
                        <input
                          type="checkbox"
                          checked={notifications.pushMessages}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              pushMessages: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">
                          업데이트 및 뉴스
                        </span>
                        <input
                          type="checkbox"
                          checked={notifications.pushUpdates}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              pushUpdates: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleNotificationsSave}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      저장
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  보안 설정
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      현재 비밀번호
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={securityData.currentPassword}
                        onChange={(e) =>
                          setSecurityData({
                            ...securityData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      새 비밀번호
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={securityData.newPassword}
                        onChange={(e) =>
                          setSecurityData({
                            ...securityData,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      새 비밀번호 확인
                    </label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) =>
                        setSecurityData({
                          ...securityData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      비밀번호는 최소 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함하는 것을 권장합니다.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handlePasswordChange}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Shield className="w-5 h-5" />
                      비밀번호 변경
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    계정 삭제
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                  </p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    계정 삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
