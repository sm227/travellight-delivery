'use client';

import { useEffect } from 'react';

const KakaoLogin = () => {
  useEffect(() => {
    // 카카오 SDK 로드
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // 여기에 실제 카카오 앱 키를 입력하세요
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || 'your_kakao_app_key');
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleKakaoLogin = () => {
    if (window.Kakao) {
      window.Kakao.Auth.login({
        success: function (response) {
          console.log('카카오 로그인 성공:', response);
          
          // 사용자 정보 가져오기
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: function (userResponse) {
              console.log('사용자 정보:', userResponse);
              
              // 여기서 백엔드로 사용자 정보를 전송하여 회원가입/로그인 처리
              handleUserRegistration(userResponse, response.access_token);
            },
            fail: function (error) {
              console.error('사용자 정보 가져오기 실패:', error);
            }
          });
        },
        fail: function (error) {
          console.error('카카오 로그인 실패:', error);
        }
      });
    }
  };

  const handleUserRegistration = async (userInfo, accessToken) => {
    try {
      const userData = {
        kakaoId: userInfo.id,
        email: userInfo.kakao_account?.email,
        nickname: userInfo.properties?.nickname,
        profileImage: userInfo.properties?.profile_image,
        accessToken: accessToken
      };

      // 백엔드 API 호출
      const response = await fetch('/api/auth/kakao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('회원가입/로그인 성공:', result);
        
        // 사용자 정보를 로컬 스토리지에 저장
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // 로그인 성공 알림
        if (result.isNewUser) {
          alert(`환영합니다! ${result.user.nickname}님의 회원가입이 완료되었습니다.`);
        } else {
          alert(`안녕하세요! ${result.user.nickname}님, 다시 만나서 반갑습니다.`);
        }
        
        // 대시보드로 이동
        window.location.href = '/dashboard';
      } else {
        const errorResult = await response.json();
        console.error('회원가입/로그인 실패:', errorResult);
        alert('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={handleKakaoLogin}
        className="flex items-center justify-center w-full max-w-sm px-4 py-3 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-black dark:text-gray-900 font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
        </svg>
        카카오로 시작하기
      </button>
    </div>
  );
};

export default KakaoLogin; 