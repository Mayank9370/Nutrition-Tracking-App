import React, { useState } from 'react';
import { Button } from '../ui/Button';

export const PersonalInfo = ({ data, updateData, onNext }) => {
  const [formData, setFormData] = useState({
    age: data.age || '',
    weight: data.weight || '',
    height: data.height || '',
    gender: data.gender || '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    updateData({ [field]: field === 'gender' ? value : Number(value) });
  };

  const isValid = formData.age && formData.weight && formData.height && formData.gender;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
        <p className="text-gray-600">We'll use this information to create your personalized nutrition plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="25"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="70"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleChange('height', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="175"
          />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="px-8"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};