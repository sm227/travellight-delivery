'use client';

import { useState } from 'react';

export function DeliveryMode({ onNext }) {
  const [selectedMode, setSelectedMode] = useState('standard');
  const [radius, setRadius] = useState(5);
  const [categories, setCategories] = useState(['all']);
  
  const handleCategoryToggle = (category) => {
    if (category === 'all') {
      setCategories(['all']);
      return;
    }
    
    // Remove 'all' if it's selected
    const updatedCategories = categories.filter(c => c !== 'all');
    
    // Toggle the selected category
    if (updatedCategories.includes(category)) {
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      updatedCategories.push(category);
    }
    
    // If no categories are selected, default to 'all'
    setCategories(updatedCategories.length ? updatedCategories : ['all']);
  };
  
  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">배차 방식 선택</h2>
      
      <div className="bg-white rounded-lg shadow-md p-5 mb-4">
        <h3 className="font-medium text-lg mb-3">배달 모드</h3>
        <div className="flex flex-col gap-3 mb-4">
          <button
            className={`py-3 px-4 rounded-lg border flex justify-between items-center ${selectedMode === 'standard' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'}`}
            onClick={() => setSelectedMode('standard')}
          >
            <div>
              <span className="font-medium">일반 배달</span>
              <p className="text-sm text-gray-500 mt-1">하나의 배달 주문을 수락하고 배달합니다.</p>
            </div>
            <div className={`w-6 h-6 rounded-full border ${selectedMode === 'standard' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} flex items-center justify-center`}>
              {selectedMode === 'standard' && <div className="w-3 h-3 bg-white rounded-full"></div>}
            </div>
          </button>
          
          <button
            className={`py-3 px-4 rounded-lg border flex justify-between items-center ${selectedMode === 'group' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'}`}
            onClick={() => setSelectedMode('group')}
          >
            <div>
              <span className="font-medium">그룹 배달</span>
              <p className="text-sm text-gray-500 mt-1">여러 배달 주문을 한번에 수락하여 효율적으로 배달합니다.</p>
            </div>
            <div className={`w-6 h-6 rounded-full border ${selectedMode === 'group' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} flex items-center justify-center`}>
              {selectedMode === 'group' && <div className="w-3 h-3 bg-white rounded-full"></div>}
            </div>
          </button>
        </div>
        
        <h3 className="font-medium text-lg mb-3">배달 가능 거리</h3>
        <div className="mb-4">
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={radius} 
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>1km</span>
            <span>{radius}km</span>
            <span>10km</span>
          </div>
        </div>
        
        <h3 className="font-medium text-lg mb-3">배달 물품 카테고리</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`py-2 px-4 rounded-lg ${categories.includes('all') ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setCategories(['all'])}
          >
            전체
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${categories.includes('food') ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleCategoryToggle('food')}
          >
            음식
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${categories.includes('luggage') ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleCategoryToggle('luggage')}
          >
            여행 가방
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${categories.includes('package') ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleCategoryToggle('package')}
          >
            일반 소포
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${categories.includes('documents') ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleCategoryToggle('documents')}
          >
            서류
          </button>
        </div>
      </div>
      
      <div className="flex-1"></div>
      
      <button
        className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium mt-4"
        onClick={onNext}
      >
        다음
      </button>
    </div>
  );
} 