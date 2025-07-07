// components/FoodSelector.js
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export const FoodSelector = ({ onFoodClick }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodList = await api.getFoods();
        setFoods(foodList);
      } catch (err) {
        console.error('Failed to fetch foods', err);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">🍎 Quick Add Food</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {foods.map((food) => (
          <button
            key={food.id}
            onClick={() => onFoodClick(food)}
            className="p-3 border rounded-md hover:bg-emerald-50 transition"
          >
            <div className="font-medium">{food.name}</div>
            <div className="text-xs text-gray-500">
              {food.calories} cal, {food.protein}g P, {food.carbs}g C, {food.fats}g F
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
