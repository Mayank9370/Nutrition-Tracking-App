import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Dashboard } from './components/dashboard/Dashboard';
import { FoodLogModal } from './components/food-log/FoodLogModal';
import { RemindersModal } from './components/reminders/RemindersModal';
import { ProgressModal } from './components/progress/ProgressModal';
import { BottomNav } from './components/navigation/BottomNav';

const AppContent = () => {
  const { isOnboarded } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFoodLog, setShowFoodLog] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    if (tab === 'food-log') {
      setShowFoodLog(true);
    } else if (tab === 'reminders') {
      setShowReminders(true);
    } else if (tab === 'progress') {
      setShowProgress(true);
    }
  };

  const closeAllModals = () => {
    setShowFoodLog(false);
    setShowReminders(false);
    setShowProgress(false);
    setActiveTab('dashboard');
  };

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return (
    <div className="pb-20">
      <Dashboard />
      
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      <FoodLogModal 
        isOpen={showFoodLog} 
        onClose={closeAllModals}
      />
      
      <RemindersModal 
        isOpen={showReminders} 
        onClose={closeAllModals}
      />
      
      <ProgressModal 
        isOpen={showProgress} 
        onClose={closeAllModals}
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;