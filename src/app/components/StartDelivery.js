'use client';

import { useState, useEffect } from 'react';

export function StartDelivery({ isWorking, onStartWork, onNext }) {
  const [availableDeliveries, setAvailableDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchInterval, setSearchInterval] = useState(null);

  // Mock fetching available deliveries
  const fetchDeliveries = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Generate random luggage delivery requests
      const mockDeliveries = [
        {
          id: 'del-' + Math.floor(Math.random() * 10000),
          type: 'luggage',
          pickup: '서울특별시 중구 명동길 74',
          dropoff: '서울특별시 강남구 테헤란로 152',
          distance: (2 + Math.random() * 8).toFixed(1),
          price: Math.floor(8000 + Math.random() * 12000),
          items: Math.floor(1 + Math.random() * 3),
          weight: (5 + Math.random() * 20).toFixed(1),
          estimatedTime: Math.floor(15 + Math.random() * 30)
        },
        {
          id: 'del-' + Math.floor(Math.random() * 10000),
          type: 'package',
          pickup: '서울특별시 용산구 한남동 독서당로 122',
          dropoff: '서울특별시 서초구 서초대로 411',
          distance: (2 + Math.random() * 8).toFixed(1),
          price: Math.floor(6000 + Math.random() * 8000),
          items: 1,
          weight: (1 + Math.random() * 5).toFixed(1),
          estimatedTime: Math.floor(10 + Math.random() * 20)
        }
      ];
      
      setAvailableDeliveries(mockDeliveries);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (isWorking) {
      fetchDeliveries();
      // Set up recurring fetch
      const interval = setInterval(fetchDeliveries, 30000); // Every 30 seconds
      setSearchInterval(interval);
    } else {
      // Clear interval if not working
      if (searchInterval) {
        clearInterval(searchInterval);
        setSearchInterval(null);
      }
      setAvailableDeliveries([]);
    }

    return () => {
      if (searchInterval) {
        clearInterval(searchInterval);
      }
    };
  }, [isWorking]);

  const handleAcceptDelivery = () => {
    if (selectedDelivery) {
      // In real app, would call API to accept the delivery
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">배달 시작</h2>

      {!isWorking ? (
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 4H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">운행을 시작해볼까요?</h3>
          <p className="text-gray-500 mb-6">운행을 시작하면 근처의 배달 요청이 표시됩니다.</p>
          <button 
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium"
            onClick={onStartWork}
          >
            운행 시작하기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">가능한 배달</h3>
              <button 
                onClick={fetchDeliveries} 
                disabled={loading}
                className="text-blue-600 text-sm font-medium"
              >
                {loading ? '검색 중...' : '새로고침'}
              </button>
            </div>
            
            {loading && availableDeliveries.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-10 h-10 border-t-2 border-b-2 border-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">주변 배달 요청을 검색 중입니다...</p>
              </div>
            ) : availableDeliveries.length === 0 ? (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-gray-500 mb-2">아직 가능한 배달이 없습니다</p>
                <p className="text-sm text-gray-400">잠시 후 다시 시도해 주세요</p>
              </div>
            ) : (
              <div className="space-y-3">
                {availableDeliveries.map(delivery => (
                  <button
                    key={delivery.id}
                    className={`w-full text-left p-4 border rounded-lg ${selectedDelivery?.id === delivery.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setSelectedDelivery(delivery)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {delivery.type === 'luggage' ? '여행 가방' : 
                         delivery.type === 'package' ? '일반 소포' : '배달'}
                      </span>
                      <span className="text-blue-600 font-bold">{delivery.price.toLocaleString()}원</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>픽업: {delivery.pickup}</p>
                      <p>배달: {delivery.dropoff}</p>
                      <p className="mt-1">
                        거리: {delivery.distance}km | 
                        예상 시간: {delivery.estimatedTime}분 | 
                        무게: {delivery.weight}kg
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {selectedDelivery && (
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-t-lg shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">배달 수락</h3>
                <span className="text-blue-600 font-bold">{selectedDelivery.price.toLocaleString()}원</span>
              </div>
              <button
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium"
                onClick={handleAcceptDelivery}
              >
                배달 수락하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 