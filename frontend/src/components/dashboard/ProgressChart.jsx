import React from 'react';
import { Card } from '../ui/Card';
import { useApp } from '../../contexts/AppContext';

export const ProgressChart = () => {
  const { foodLog, goals } = useApp();

  if (!foodLog || !goals) return null;

  const activities = [
    {
      name: 'Sleep',
      current: foodLog.intake.sleep,
      target: 8,
      unit: 'hours',
      color: 'bg-purple-500',
      icon: '😴',
    },
    {
      name: 'Steps',
      current: foodLog.intake.steps,
      target: 10000,
      unit: 'steps',
      color: 'bg-green-500',
      icon: '👟',
    },
    {
      name: 'Water',
      current: foodLog.intake.water_intake,
      target: goals.waterIntake,
      unit: 'ml',
      color: 'bg-blue-500',
      icon: '💧',
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Daily Activities</h2>
      
      <div className="space-y-6">
        {activities.map((activity) => {
          const progress = Math.min((activity.current / activity.target) * 100, 100);
          
          return (
            <div key={activity.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                    <p className="text-sm text-gray-600">
                      {activity.current.toLocaleString()} / {activity.target.toLocaleString()} {activity.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{Math.round(progress)}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${activity.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};