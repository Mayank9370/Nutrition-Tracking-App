import React from 'react';
import { Card } from '../ui/Card';
import { Plus, Utensils, Bell, BarChart3 } from 'lucide-react';

export const QuickActions = ({
  onLogFood,
  onSetReminder,
  onViewProgress,
}) => {
  const actions = [
    {
      title: 'Log Food',
      description: 'Add meals and track calories',
      icon: <Utensils className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      onClick: onLogFood,
    },
    {
      title: 'Set Reminder',
      description: 'Create nutrition reminders',
      icon: <Bell className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      onClick: onSetReminder,
    },
    {
      title: 'View Progress',
      description: 'See your weekly trends',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      onClick: onViewProgress,
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Quick Actions
      </h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-full p-4 rounded-xl bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                {action.icon}
              </div>
              <div className="text-left">
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm opacity-80">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};