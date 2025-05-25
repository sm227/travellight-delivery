'use client';

import { useState } from 'react';
import { MapView } from './MapView';
import { DeliveryMode } from './DeliveryMode';
import { StartDelivery } from './StartDelivery';
import { PickupProcess } from './PickupProcess';
import { DeliveryProcess } from './DeliveryProcess';
import { CompleteDelivery } from './CompleteDelivery';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function RiderApp() {
  const [currentStep, setCurrentStep] = useState('map');
  const [isWorking, setIsWorking] = useState(false);
  
  // Steps: 'map', 'mode', 'start', 'pickup', 'delivery', 'complete'
  
  const renderCurrentStep = () => {
    switch(currentStep) {
      case 'map':
        return <MapView onNext={() => setCurrentStep('mode')} />;
      case 'mode':
        return <DeliveryMode onNext={() => setCurrentStep('start')} />;
      case 'start':
        return <StartDelivery 
          isWorking={isWorking} 
          onStartWork={() => setIsWorking(true)} 
          onNext={() => setCurrentStep('pickup')} 
        />;
      case 'pickup':
        return <PickupProcess onNext={() => setCurrentStep('delivery')} />;
      case 'delivery':
        return <DeliveryProcess onNext={() => setCurrentStep('complete')} />;
      case 'complete':
        return <CompleteDelivery onFinish={() => {
          setCurrentStep('start');
          // Don't stop working, rider can accept another delivery
        }} />;
      default:
        return <MapView onNext={() => setCurrentStep('mode')} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header currentStep={currentStep} isWorking={isWorking} />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="pb-24">
          {renderCurrentStep()}
        </div>
      </main>
      <BottomNav 
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        isWorking={isWorking}
        setIsWorking={setIsWorking}
      />
    </div>
  );
} 