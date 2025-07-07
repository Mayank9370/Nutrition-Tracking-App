import React from 'react';
import { X, TrendingUp, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useApp } from '../../contexts/AppContext';

export const ProgressModal = ({ isOpen, onClose }) => {
  const { goals, foodLog } = useApp();

  if (!isOpen) return null;

  const achievements = [
    {
      title: 'Water Warrior',
      description: 'Met your water goal today',
      icon: '💧',
      achieved: (foodLog?.progress_percent?.water_intake || 0) >= 100,
    },
    {
      title: 'Protein Power',
      description: 'Hit protein target today',
      icon: '💪',
      achieved: (foodLog?.progress_percent?.protein || 0) >= 100,
    },
    {
      title: 'Sleep Champion',
      description: 'Met your sleep goal',
      icon: '😴',
      achieved: (foodLog?.progress_percent?.sleep || 0) >= 100,
    },
    {
      title: 'Step Master',
      description: '10,000 steps today',
      icon: '👟',
      achieved: (foodLog?.progress_percent?.steps || 0) >= 100,
    },
  ];

  const StatCard = ({ title, current, target, unit, color, icon, progress }) => {
    const isOverTarget = current > target;

    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{icon}</span>
            <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          </div>
          <span className="text-xs text-gray-500">Today</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-gray-900">
              {current.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600">
              /{target.toLocaleString()} {unit}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${color} transition-all duration-500`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>{Math.round(progress)}% of goal</span>
            <span className={progress >= 100 ? 'text-green-600 font-medium' : ''}>
              {progress >= 100
                ? '✓ Goal Met'
                : isOverTarget
                ? `${Math.round(current - target)} ${unit} over`
                : `${Math.round(target - current)} ${unit} to go`}
            </span>
          </div>
        </div>
      </Card>
    );
  };

  const AchievementCard = ({ achievement }) => (
    <Card
      className={`p-4 ${
        achievement.achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3
            className={`font-semibold ${
              achievement.achieved ? 'text-green-800' : 'text-gray-700'
            }`}
          >
            {achievement.title}
          </h3>
          <p
            className={`text-sm ${
              achievement.achieved ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {achievement.description}
          </p>
        </div>
        {achievement.achieved && <Award className="w-6 h-6 text-green-600" />}
      </div>
    </Card>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Today's Progress</h2>
              <p className="text-gray-600">Your daily nutrition and fitness stats</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatCard
              title="Calories"
              current={foodLog?.intake?.total_calories || 0}
              target={goals?.dailyCalories || 2000}
              unit="kcal"
              color="bg-emerald-500"
              icon="🔥"
              progress={foodLog?.progress_percent?.calories || 0}
            />
            <StatCard
              title="Protein"
              current={foodLog?.intake?.protein || 0}
              target={goals?.protein || 100}
              unit="g"
              color="bg-blue-500"
              icon="💪"
              progress={foodLog?.progress_percent?.protein || 0}
            />
            <StatCard
              title="Carbs"
              current={foodLog?.intake?.carbs || 0}
              target={goals?.carbs || 300}
              unit="g"
              color="bg-yellow-400"
              icon="🍞"
              progress={foodLog?.progress_percent?.carbs || 0}
            />
            <StatCard
              title="Fats"
              current={foodLog?.intake?.fats || 0}
              target={goals?.fats || 70}
              unit="g"
              color="bg-pink-400"
              icon="🥑"
              progress={foodLog?.progress_percent?.fats || 0}
            />
            <StatCard
              title="Water"
              current={foodLog?.intake?.water_intake || 0}
              target={goals?.water || 3000}
              unit="ml"
              color="bg-cyan-500"
              icon="💧"
              progress={foodLog?.progress_percent?.water_intake || 0}
            />
            <StatCard
              title="Sleep"
              current={foodLog?.intake?.sleep || 0}
              target={goals?.sleep || 8}
              unit="hrs"
              color="bg-purple-500"
              icon="🛌"
              progress={foodLog?.progress_percent?.sleep || 0}
            />
            <StatCard
              title="Steps"
              current={foodLog?.intake?.steps || 0}
              target={goals?.steps || 10000}
              unit="steps"
              color="bg-orange-500"
              icon="👟"
              progress={foodLog?.progress_percent?.steps || 0}
            />
          </div>

          {/* Achievements */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Achievements</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((ach, idx) => (
                <AchievementCard key={idx} achievement={ach} />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
