'use client';

import { useState } from 'react';

export function PickupProcess({ onNext }) {
  const [currentStep, setCurrentStep] = useState('navigating'); // navigating, arrived, verifying, completed
  const [verificationCode, setVerificationCode] = useState('');
  
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
    code: '3459'
  };
  
  const handleArrived = () => {
    setCurrentStep('arrived');
  };
  
  const handleStartVerification = () => {
    setCurrentStep('verifying');
  };
  
  const handleVerify = () => {
    if (verificationCode === delivery.code) {
      setCurrentStep('completed');
    } else {
      alert('인증 코드가 올바르지 않습니다. 다시 시도해주세요.');
    }
  };
  
  const handleCompletePickup = () => {
    onNext();
  };
  
  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">픽업 진행</h2>
      
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-4">
        <div className="flex items-center mb-1">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</div>
          <div className="flex-1 h-1 mx-2 bg-blue-600"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep !== 'navigating' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
          <div className={`flex-1 h-1 mx-2 ${currentStep === 'completed' ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
        </div>
        <div className="flex text-xs text-gray-500">
          <div className="flex-1 text-center">길 안내</div>
          <div className="flex-1 text-center">도착</div>
          <div className="flex-1 text-center">픽업 완료</div>
        </div>
      </div>
      
      {/* Navigation Map */}
      {currentStep === 'navigating' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="h-64 bg-gray-200 relative">
            {/* Mock map */}
            <div className="absolute inset-0 bg-gray-300"></div>
            
            {/* Route info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">픽업 장소로 이동 중</h3>
                <span className="text-blue-600 font-medium">12분</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{delivery.pickup.address}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>거리: 3.2km</span>
                <span>도착 예정: 12:45</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <h3 className="font-medium mb-1">픽업 정보</h3>
              <p className="text-sm text-gray-600 mb-1">{delivery.pickup.name}</p>
              <p className="text-sm text-gray-600 mb-1">{delivery.pickup.phone}</p>
              <p className="text-sm text-gray-600 mb-3">물품: {delivery.items}개 ({delivery.weight})</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">{delivery.pickup.instructions}</p>
              </div>
            </div>
            
            <button
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium"
              onClick={handleArrived}
            >
              픽업 장소 도착
            </button>
          </div>
        </div>
      )}
      
      {/* Arrived at Pickup */}
      {currentStep === 'arrived' && (
        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center mb-2">픽업 장소에 도착했습니다</h3>
          <p className="text-gray-500 text-center mb-6">물품을 픽업하려면 아래 정보를 확인하세요</p>
          
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h4 className="font-medium mb-2">픽업 정보</h4>
            <p className="text-sm text-gray-600 mb-1">{delivery.pickup.name}</p>
            <p className="text-sm text-gray-600 mb-1">{delivery.pickup.address}</p>
            <p className="text-sm text-gray-600 mb-1">{delivery.pickup.phone}</p>
            <p className="text-sm text-gray-600 mb-3">물품: {delivery.items}개 ({delivery.weight})</p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">{delivery.pickup.instructions}</p>
            </div>
          </div>
          
          <button
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium"
            onClick={handleStartVerification}
          >
            물품 인증하기
          </button>
        </div>
      )}
      
      {/* Verification */}
      {currentStep === 'verifying' && (
        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <h3 className="text-lg font-medium mb-4">물품 인증</h3>
          <p className="text-gray-500 mb-6">픽업 장소에서 받은 4자리 인증 코드를 입력해주세요</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">인증 코드</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl font-bold tracking-widest"
              maxLength={4}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              inputMode="numeric"
              placeholder="0000"
            />
          </div>
          
          <button
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium mb-3"
            onClick={handleVerify}
            disabled={verificationCode.length !== 4}
          >
            인증하기
          </button>
          
          <p className="text-sm text-gray-500 text-center">
            인증 코드를 받지 못하셨나요? <br />
            <a href="#" className="text-blue-600 font-medium">문의하기</a>
          </p>
        </div>
      )}
      
      {/* Pickup Completed */}
      {currentStep === 'completed' && (
        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center mb-2">물품 픽업 완료!</h3>
          <p className="text-gray-500 text-center mb-6">물품을 안전하게 보관하고 배달 장소로 이동해주세요</p>
          
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h4 className="font-medium mb-2">체크리스트</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">물품 수량 확인 ({delivery.items}개)</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">물품 상태 확인</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">인증 코드 확인</span>
              </div>
            </div>
          </div>
          
          <button
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium"
            onClick={handleCompletePickup}
          >
            배달 장소로 이동하기
          </button>
        </div>
      )}
    </div>
  );
} 