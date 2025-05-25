import KakaoLogin from '../components/KakaoLogin';
import ThemeToggle from '../components/theme-toggle';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative">
      {/* 테마 토글 버튼 */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Travel Rider
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            간편하게 로그인하고 서비스를 이용해보세요
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              소셜 계정으로 빠른 로그인
            </p>
            <KakaoLogin />
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              로그인 시 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 