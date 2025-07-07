import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const activityLevels = [
  {
    id: 'sedentary',
    title: 'Sedentary',
    description: 'Little or no exercise, desk job',
    icon: '🪑',
  },
  {
    id: 'light',
    title: 'Lightly Active',
    description: 'Light exercise 1-3 days/week',
    icon: '🚶',
  },
  {
    id: 'moderate',
    title: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week',
    icon: '🏃',
  },
  {
    id: 'active',
    title: 'Very Active',
    description: 'Hard exercise 6-7 days/week',
    icon: '💪',
  },
  {
    id: 'very_active',
    title: 'Extremely Active',
    description: 'Very hard exercise, physical job',
    icon: '🏋️',
  },
];

export const ActivityLevel = ({ data, updateData, onNext, onPrev }) => {
  const [selected, setSelected] = useState(data.activity_level || '');

  const handleSelect = (level) => {
    setSelected(level);
    updateData({ activity_level: level });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your activity level?</h2>
        <p className="text-gray-600">This helps us calculate your daily calorie needs</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activityLevels.map((level) => (
          <Card
            key={level.id}
            className={`p-6 cursor-pointer transition-all duration-200 ${
              selected === level.id
                ? 'ring-2 ring-emerald-500 bg-emerald-50 border-emerald-200'
                : 'hover:border-emerald-200'
            }`}
            onClick={() => handleSelect(level.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{level.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{level.title}</h3>
                <p className="text-gray-600">{level.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                selected === level.id
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-gray-300'
              }`}>
                {selected === level.id && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!selected}
          className="px-8"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};