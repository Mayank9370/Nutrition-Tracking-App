import React from 'react';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';
import { useApp } from '../../contexts/AppContext';

export const NutritionOverview = () => {
  const { goals, foodLog } = useApp();

  if (!goals || !foodLog) return null;

  const nutritionData = [
    {
      name: 'Calories',
      current: foodLog.intake.total_calories,
      target: goals.dailyCalories,
      unit: 'kcal',
      color: '#10B981',
      icon: '🔥',
    },
    {
      name: 'Protein',
      current: foodLog.intake.protein,
      target: goals.protein,
      unit: 'g',
      color: '#3B82F6',
      icon: '💪',
    },
    {
      name: 'Carbs',
      current: foodLog.intake.carbs,
      target: goals.carbs,
      unit: 'g',
      color: '#F59E0B',
      icon: '🌾',
    },
    {
      name: 'Fats',
      current: foodLog.intake.fats,
      target: goals.fats,
      unit: 'g',
      color: '#EF4444',
      icon: '🥑',
    },
    {
      name: 'Water',
      current: foodLog.intake.water_intake,
      target: goals.waterIntake,
      unit: 'ml',
      color: '#06B6D4',
      icon: '💧',
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Nutrition</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {nutritionData.map((item) => {
          const progress = (item.current / item.target) * 100;
          
          return (
            <div key={item.name} className="text-center">
              <ProgressRing
                progress={progress}
                size={100}
                strokeWidth={6}
                color={item.color}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm font-bold text-gray-900">
                    {Math.round(progress)}%
                  </div>
                </div>
              </ProgressRing>
              
              <div className="mt-3">
                <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                <p className="text-xs text-gray-600">
                  {item.current} / {item.target} {item.unit}
                </p>
                <p className="text-xs text-gray-500">
                  {item.target - item.current} {item.unit} left
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};