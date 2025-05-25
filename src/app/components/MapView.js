'use client';

import { useState } from 'react';

export function MapView({ onNext }) {
  const [mapType, setMapType] = useState('naver');
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocation = () => {
    setIsLoading(true);
    
    // Mock getting location
    setTimeout(() => {
      setLocation({
        latitude: 37.5665,
        longitude: 126.9780
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">지도 설정</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-4">
        <h3 className="font-medium text-lg mb-3 text-gray-900 dark:text-gray-100">지도 제공자 선택</h3>
        <div className="flex gap-3 mb-4">
          <button
            className={`flex-1 py-3 px-4 rounded-lg border ${
              mapType === 'naver' 
                ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300' 
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={() => setMapType('naver')}
          >
            네이버맵
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg border ${
              mapType === 'kakao' 
                ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300' 
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={() => setMapType('kakao')}
          >
            카카오맵
          </button>
        </div>
        
        <h3 className="font-medium text-lg mb-3 text-gray-900 dark:text-gray-100">현재 위치</h3>
        <div className="mb-4">
          {location ? (
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm">
              <p className="text-gray-700 dark:text-gray-300">위도: {location.latitude}</p>
              <p className="text-gray-700 dark:text-gray-300">경도: {location.longitude}</p>
              <p className="text-green-600 dark:text-green-400 font-medium mt-1">위치 확인 완료</p>
            </div>
          ) : (
            <button
              className="w-full py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
              onClick={requestLocation}
              disabled={isLoading}
            >
              {isLoading ? '위치 확인 중...' : '내 위치 확인하기'}
            </button>
          )}
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative min-h-[300px] flex items-center justify-center">
        {location ? (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 z-0">
              {/* Map would render here with actual map API */}
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-gray-200 shadow-lg"></div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">위치를 확인하면 지도가 표시됩니다</p>
        )}
      </div>
      
      <button
        className="w-full py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-medium mt-4 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
        onClick={onNext}
        disabled={!location}
      >
        다음
      </button>
    </div>
  );
} 