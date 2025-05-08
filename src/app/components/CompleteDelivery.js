'use client';

export function CompleteDelivery({ onFinish }) {
  // Dummy delivery summary data
  const deliverySummary = {
    id: 'del-45382',
    type: 'luggage',
    fee: 12500,
    distance: '7.5km',
    time: '45분',
    pickup: '트래블라이트 호텔',
    dropoff: '서울특별시 강남구 테헤란로 152',
    timestamp: new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">배달 완료</h2>
      
      <div className="bg-white rounded-lg shadow-md p-5 mb-4">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-center mb-2">배달 완료!</h3>
        <p className="text-gray-500 text-center mb-6">
          고생하셨습니다. 배달이 성공적으로 완료되었습니다.
        </p>
        
        <div className="p-4 bg-blue-50 rounded-lg flex justify-between items-center mb-6">
          <span className="font-medium">배달 수당</span>
          <span className="text-blue-700 font-bold text-xl">{deliverySummary.fee.toLocaleString()}원</span>
        </div>
        
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <h4 className="font-medium mb-3">배달 요약</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">배달 ID</span>
              <span>{deliverySummary.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">물품 종류</span>
              <span>{deliverySummary.type === 'luggage' ? '여행 가방' : '일반 소포'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">이동 거리</span>
              <span>{deliverySummary.distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">소요 시간</span>
              <span>{deliverySummary.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">픽업 장소</span>
              <span>{deliverySummary.pickup}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">배달 장소</span>
              <span className="text-right max-w-[60%]">{deliverySummary.dropoff}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">완료 시간</span>
              <span>{deliverySummary.timestamp}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium"
            onClick={onFinish}
          >
            계속 배달하기
          </button>
          <button
            className="w-full py-4 border border-gray-300 text-gray-700 rounded-lg font-medium"
            onClick={() => window.confirm('배달 평가 화면으로 이동하시겠습니까?')}
          >
            배달 평가하기
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="font-medium mb-3">오늘의 배달 통계</h3>
        <div className="flex text-center mb-4">
          <div className="flex-1 border-r border-gray-200">
            <p className="text-2xl font-bold text-blue-600">1</p>
            <p className="text-sm text-gray-500">완료한 배달</p>
          </div>
          <div className="flex-1 border-r border-gray-200">
            <p className="text-2xl font-bold text-blue-600">12,500원</p>
            <p className="text-sm text-gray-500">총 수익</p>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold text-blue-600">7.5km</p>
            <p className="text-sm text-gray-500">총 이동거리</p>
          </div>
        </div>
        <button 
          className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm"
          onClick={() => window.confirm('통계 화면으로 이동하시겠습니까?')}
        >
          자세한 통계 보기
        </button>
      </div>
    </div>
  );
} 