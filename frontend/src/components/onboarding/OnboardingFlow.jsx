import React, { useState } from 'react';
import { PersonalInfo } from './PersonalInfo';
import { ActivityLevel } from './ActivityLevel';
import { GoalsPreferences } from './GoalsPreferences';
import { api } from '../../services/api';
import { useApp } from '../../contexts/AppContext';

const steps = [
  { id: 1, title: 'Personal Info', component: PersonalInfo },
  { id: 2, title: 'Activity Level', component: ActivityLevel },
  { id: 3, title: 'Goals & Preferences', component: GoalsPreferences },
];

export const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setGoals, setIsOnboarded } = useApp();

  const updateData = (stepData) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    try {
      setIsLoading(true);

      // ✅ Fix: Map fitness_goal to valid DB values
      const fitnessGoalMap = {
        maintain: 'maintain_health',
        lose: 'lose_weight',
        gain: 'gain_muscle',
      };

      const formattedData = {
        ...data,
        fitness_goal: fitnessGoalMap[data.fitness_goal] || 'maintain_health',
      };

      const response = await api.onboardUser(formattedData);

      if (response.userId) {
        setUser({ ...formattedData, id: response.userId });
        setGoals(response.goals);
        setIsOnboarded(true);
      }
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`ml-3 text-sm font-medium ${
                    currentStep >= step.id ? 'text-emerald-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <CurrentStepComponent
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
            onComplete={completeOnboarding}
            isLastStep={currentStep === steps.length}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};