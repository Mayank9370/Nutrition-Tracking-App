import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const fitnessGoals = [
  {
    id: 'lose_weight',
    title: 'Lose Weight',
    description: 'Create a calorie deficit to lose fat',
    icon: '⬇️',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'maintain',
    title: 'Maintain Weight',
    description: 'Maintain current weight and health',
    icon: '⚖️',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'gain_muscle',
    title: 'Gain Muscle',
    description: 'Build muscle mass with proper nutrition',
    icon: '⬆️',
    color: 'from-emerald-500 to-green-500',
  },
];

const dietaryPreferences = [
  'Omnivore',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Keto',
  'Paleo',
  'Mediterranean',
];

export const GoalsPreferences = ({
  data,
  updateData,
  onPrev,
  onComplete,
  isLoading,
}) => {
  const [selectedGoal, setSelectedGoal] = useState(data.fitness_goal || '');
  const [selectedDiet, setSelectedDiet] = useState(data.dietary_preference || '');

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    updateData({ fitness_goal: goal });
  };

  const handleDietSelect = (diet) => {
    setSelectedDiet(diet);
    updateData({ dietary_preference: diet });
  };

  const isValid = selectedGoal && selectedDiet;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Goals & Preferences</h2>
        <p className="text-gray-600">Let's personalize your nutrition plan</p>
      </div>

      {/* Fitness Goals */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's your primary fitness goal?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fitnessGoals.map((goal) => (
            <Card
              key={goal.id}
              className={`p-6 cursor-pointer transition-all duration-200 ${
                selectedGoal === goal.id
                  ? 'ring-2 ring-emerald-500 bg-emerald-50 border-emerald-200'
                  : 'hover:border-emerald-200'
              }`}
              onClick={() => handleGoalSelect(goal.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{goal.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h4>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dietary Preferences */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Dietary preference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {dietaryPreferences.map((diet) => (
            <button
              key={diet}
              onClick={() => handleDietSelect(diet)}
              className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedDiet === diet
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button
          onClick={onComplete}
          disabled={!isValid || isLoading}
          className="px-8"
        >
          {isLoading ? 'Creating Plan...' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );
};