import React from 'react';
import { Card } from '../ui/Card';
import { useApp } from '../../contexts/AppContext';

export const WelcomeHeader = () => {
  const { user, foodLog } = useApp();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getCaloriesConsumed = () => {
    return foodLog?.intake?.total_calories || 0;
  };

  const getCaloriesRemaining = () => {
    return foodLog?.remaining_goals?.calories || 0;
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            {getGreeting()}! 👋
          </h1>
          <p className="text-emerald-100 mb-2">{currentDate}</p>
          <p className="text-sm text-emerald-100">
            Ready to crush your nutrition goals today?
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 md:text-right">
          <div className="flex flex-col space-y-1">
            <div className="text-sm text-emerald-100">Today's Progress</div>
            <div className="text-2xl font-bold">
              {getCaloriesConsumed()}<span className="text-lg text-emerald-100">/kcal</span>
            </div>
            <div className="text-sm text-emerald-100">
              {getCaloriesRemaining()} calories remaining
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};