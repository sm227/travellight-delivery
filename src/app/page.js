import { RiderApp } from './components/RiderApp';
import ThemeToggle from './components/theme-toggle';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              TravelLight Delivery
            </h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link 
                href="/login"
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </header>
      <RiderApp />
    </div>
  );
}
