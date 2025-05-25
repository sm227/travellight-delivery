'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from '../components/theme-toggle';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기 (실제 구현에서는 토큰 검증 등 필요)
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    // 카카오 로그아웃
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 완료');
      });
    }
    
    // 로컬 스토리지 정리
    localStorage.removeItem('user');
    
    // 로그인 페이지로 이동
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">로그인이 필요합니다</h2>
          <a 
            href="/login"
            className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            로그인하기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Travel Rider
            </h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-3">
                {user.profileImage && (
                  <img
                    src={user.profileImage}
                    alt="프로필"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.nickname}님
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              환영합니다! 🎉
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 사용자 정보 카드 */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                  내 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">닉네임:</span>
                    <span className="ml-2 text-sm text-blue-900 dark:text-blue-100">{user.nickname}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">이메일:</span>
                    <span className="ml-2 text-sm text-blue-900 dark:text-blue-100">{user.email || '미제공'}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">가입일:</span>
                    <span className="ml-2 text-sm text-blue-900 dark:text-blue-100">
                      {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">최근 로그인:</span>
                    <span className="ml-2 text-sm text-blue-900 dark:text-blue-100">
                      {new Date(user.lastLoginAt).toLocaleString('ko-KR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* 서비스 메뉴 */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                  서비스 메뉴
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-200 dark:border-green-700">
                    <div className="font-medium text-green-900 dark:text-green-100">배송 요청</div>
                    <div className="text-sm text-green-700 dark:text-green-300">새로운 배송을 요청하세요</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-200 dark:border-green-700">
                    <div className="font-medium text-green-900 dark:text-green-100">배송 현황</div>
                    <div className="text-sm text-green-700 dark:text-green-300">진행 중인 배송을 확인하세요</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-200 dark:border-green-700">
                    <div className="font-medium text-green-900 dark:text-green-100">배송 기록</div>
                    <div className="text-sm text-green-700 dark:text-green-300">과거 배송 내역을 조회하세요</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 