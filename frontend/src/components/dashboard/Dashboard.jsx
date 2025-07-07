import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { api } from '../../services/api';
import { NutritionOverview } from './NutritionOverview';
import { QuickActions } from './QuickActions';
import { ProgressChart } from './ProgressChart';
import { WelcomeHeader } from './WelcomeHeader';

export const Dashboard = () => {
  const { user, foodLog, setFoodLog } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodLog = async () => {
      if (!user?.id) return;
      
      try {
        const response = await api.getFoodLog(user.id);
        setFoodLog(response);
      } catch (error) {
        console.error('Failed to fetch food log:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodLog();
  }, [user?.id, setFoodLog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <WelcomeHeader />
        <NutritionOverview />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProgressChart />
          </div>
          <div>
            <QuickActions />
          </div>
          
        </div>
      </div>
    </div>
  );
};