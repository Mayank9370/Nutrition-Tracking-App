import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { useApp } from "../../contexts/AppContext";
import { api } from "../../services/api";
import { FoodSelector } from "./FoodSelector";
//import { toast } from 'react-hot-toast';

export const FoodLogModal = ({ isOpen, onClose }) => {
  const { user, setFoodLog } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    water_intake: "",
    sleep: "",
    steps: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      setIsLoading(true);

      const data = {
        userId: user.id,
        calories: Number(formData.calories) || 0,
        protein: Number(formData.protein) || 0,
        carbs: Number(formData.carbs) || 0,
        fats: Number(formData.fats) || 0,
        water_intake: Number(formData.water_intake) || 0,
        sleep: Number(formData.sleep) || 0,
        steps: Number(formData.steps) || 0,
      };

      await api.updateFoodLog(data);

      // Refresh food log
      const updatedLog = await api.getFoodLog(user.id);
      setFoodLog(updatedLog);

      // Reset form
      setFormData({
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        water_intake: "",
        sleep: "",
        steps: "",
      });

      onClose();
    } catch (error) {
      console.error("Failed to update food log:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Log Food & Activities
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* <FoodSelector
            onFoodClick={(food) => {
              // Add food nutrition to current form data
              setFormData((prev) => ({
                ...prev,
                calories: Number(prev.calories || 0) + food.calories,
                protein: Number(prev.protein || 0) + food.protein,
                carbs: Number(prev.carbs || 0) + food.carbs,
                fats: Number(prev.fats || 0) + food.fats,
              }));
            }}
          /> */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nutrition */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  🍽️ Nutrition
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => handleChange("calories", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={formData.protein}
                    onChange={(e) => handleChange("protein", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={formData.carbs}
                    onChange={(e) => handleChange("carbs", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    value={formData.fats}
                    onChange={(e) => handleChange("fats", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  🏃 Activities
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Water Intake (ml)
                  </label>
                  <input
                    type="number"
                    value={formData.water_intake}
                    onChange={(e) =>
                      handleChange("water_intake", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sleep (hours)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.sleep}
                    onChange={(e) => handleChange("sleep", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Steps
                  </label>
                  <input
                    type="number"
                    value={formData.steps}
                    onChange={(e) => handleChange("steps", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logging..." : "Log Entry"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
