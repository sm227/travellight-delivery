'use client';

export function Header({ currentStep, isWorking }) {
  const getStepTitle = () => {
    switch(currentStep) {
      case 'map':
        return '지도 설정';
      case 'mode':
        return '배차 방식 선택';
      case 'start':
        return '운행 시작 및 배차';
      case 'pickup':
        return '픽업 장소로 이동 및 물품 수령';
      case 'delivery':
        return '배달 장소로 이동';
      case 'complete':
        return '배달 완료';
      default:
        return '트래블라이트 배송';
    }
  };

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white py-4 px-5 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">TravelRider</h1>
        {isWorking && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 dark:bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-medium">운행중</span>
          </div>
        )}
      </div>
      <p className="text-sm mt-1 font-medium">{getStepTitle()}</p>
    </header>
  );
} 