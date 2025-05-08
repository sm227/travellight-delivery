'use client';

import { useState } from 'react';

export function DeliveryProcess({ onNext }) {
  const [currentStep, setCurrentStep] = useState('navigating'); // navigating, arrived
  
  // Dummy delivery data
  const delivery = {
    id: 'del-45382',
    type: 'luggage',
    pickup: {
      name: '트래블라이트 호텔',
      address: '서울특별시 중구 명동길 74',
      phone: '010-1234-5678',
      instructions: '호텔 로비 프론트 데스크에 물품 있음'
    },
    dropoff: {
      name: '김여행',
      address: '서울특별시 강남구 테헤란로 152',
      phone: '010-9876-5432',
      instructions: '아파트 경비실에 맡겨주세요'
    },
    items: 2,
    weight: '15.5kg',
    code: '3459',
    fee: 12500
  };
  
  const handleArrived = () => {
    setCurrentStep('arrived');
  };
  
  const handleStartDelivery = () => {
    onNext();
  };
  
  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">배달 진행</h2>
      
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-4">
        <div className="flex items-center mb-1">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</div>
          <div className="flex-1 h-1 mx-2 bg-blue-600"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep !== 'navigating' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
        </div>
        <div className="flex text-xs text-gray-500">
          <div className="flex-1 text-center">길 안내</div>
          <div className="flex-1 text-center">도착</div>
        </div>
      </div>
      
      {/* Navigation to Delivery */}
      {currentStep === 'navigating' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="h-64 bg-gray-200 relative">
            {/* Mock map */}
            <div className="absolute inset-0 bg-gray-300"></div>
            
            {/* Route info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">배달 장소로 이동 중</h3>
                <span className="text-blue-600 font-medium">20분</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{delivery.dropoff.address}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>거리: 7.5km</span>
                <span>도착 예정: 13:15</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <h3 className="font-medium mb-1">배달 정보</h3>
              <p className="text-sm text-gray-600 mb-1">수령인: {delivery.dropoff.name}</p>
              <p className="text-sm text-gray-600 mb-1">연락처: {delivery.dropoff.phone}</p>
              <p className="text-sm text-gray-600 mb-3">물품: {delivery.items}개 ({delivery.weight})</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">{delivery.dropoff.instructions}</p>
              </div>
            </div>
            
            <div className="flex gap-3 mb-4">
              <button className="flex-1 py-3 px-2 border border-gray-300 rounded-lg font-medium text-gray-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                고객 연락
              </button>
              <button className="flex-1 py-3 px-2 border border-gray-300 rounded-lg font-medium text-gray-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                고객 문의
              </button>
            </div>
            
            <button
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium"
              onClick={handleArrived}
            >
              배달 장소 도착
            </button>
          </div>
        </div>
      )}
      
      {/* Arrived at Delivery */}
      {currentStep === 'arrived' && (
        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center mb-2">배달 장소에 도착했습니다</h3>
          <p className="text-gray-500 text-center mb-6">물품을 배달하려면 아래 정보를 확인하세요</p>
          
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h4 className="font-medium mb-2">배달 정보</h4>
            <p className="text-sm text-gray-600 mb-1">수령인: {delivery.dropoff.name}</p>
            <p className="text-sm text-gray-600 mb-1">주소: {delivery.dropoff.address}</p>
            <p className="text-sm text-gray-600 mb-1">연락처: {delivery.dropoff.phone}</p>
            <p className="text-sm text-gray-600 mb-3">물품: {delivery.items}개 ({delivery.weight})</p>
            <div className="bg-blue-50 p-3 rounded-lg mb-3">
              <p className="text-sm text-blue-800">{delivery.dropoff.instructions}</p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-3 px-2 border border-gray-300 rounded-lg font-medium text-gray-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                고객 연락
              </button>
            </div>
          </div>
          
          <div className="border-b border-gray-200 py-4 mb-4">
            <h4 className="font-medium mb-2">배달 확인사항</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="check1" 
                  className="mt-1 mr-3"
                />
                <label htmlFor="check1" className="text-sm text-gray-600">수령인(또는 대리인)에게 직접 전달했습니다.</label>
              </div>
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="check2" 
                  className="mt-1 mr-3"
                />
                <label htmlFor="check2" className="text-sm text-gray-600">물품 상태에 이상이 없음을 확인했습니다.</label>
              </div>
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="check3" 
                  className="mt-1 mr-3"
                />
                <label htmlFor="check3" className="text-sm text-gray-600">안전한 장소에 물품을 전달했습니다.</label>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg flex justify-between items-center mb-4">
            <span className="font-medium">배달 수당</span>
            <span className="text-blue-700 font-bold">{delivery.fee.toLocaleString()}원</span>
          </div>
          
          <button
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium"
            onClick={handleStartDelivery}
          >
            배달 완료하기
          </button>
        </div>
      )}
    </div>
  );
} 