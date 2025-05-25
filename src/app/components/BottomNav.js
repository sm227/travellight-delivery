'use client';

export function BottomNav({ currentStep, setCurrentStep, isWorking, setIsWorking }) {
  const canNavigateFreely = ['map', 'mode', 'start'].includes(currentStep);
  
  const handleNavClick = (step) => {
    // Only allow free navigation when not in the middle of a delivery
    if (canNavigateFreely) {
      setCurrentStep(step);
    } else {
      // If in middle of delivery, only allow emergency return to start
      if (step === 'start' && window.confirm('현재 배달을 취소하시겠습니까? 배달 취소는 패널티가 부과될 수 있습니다.')) {
        setCurrentStep('start');
      }
    }
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 z-10">
      <button 
        onClick={() => handleNavClick('map')}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${currentStep === 'map' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3l-6-3m12 0l-6-3m0 0l-6 3m6-3v13" />
        </svg>
        <span className="text-xs mt-1">지도</span>
      </button>
      
      <button 
        onClick={() => handleNavClick('mode')}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${currentStep === 'mode' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs mt-1">설정</span>
      </button>
      
      <button 
        onClick={() => handleNavClick('start')}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${currentStep === 'start' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs mt-1">배달</span>
      </button>
      
      <button 
        className={`flex flex-col items-center justify-center w-1/5 h-full ${['pickup', 'delivery'].includes(currentStep) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
        disabled={!['pickup', 'delivery', 'complete'].includes(currentStep)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <span className="text-xs mt-1">진행중</span>
      </button>
      
      <button 
        onClick={() => {
          if (isWorking && window.confirm('운행을 종료하시겠습니까?')) {
            setIsWorking(false);
            setCurrentStep('map');
          }
        }}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${isWorking ? 'text-red-600 dark:text-red-400' : 'text-gray-300 dark:text-gray-600'}`}
        disabled={!isWorking}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="text-xs mt-1">종료</span>
      </button>
    </nav>
  );
} 