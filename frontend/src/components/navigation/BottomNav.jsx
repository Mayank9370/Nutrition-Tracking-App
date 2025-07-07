import React from 'react';
import { Home, Utensils, Bell, BarChart3 } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'food-log', label: 'Log Food', icon: Utensils },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};