import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useApp } from '../../contexts/AppContext';
import { api } from '../../services/api';

export const RemindersModal = ({ isOpen, onClose }) => {
  const { user } = useApp();
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    message: '',
    time: '',
    reminder_type: 'Hydration',
    repeat_interval: 'daily',
  });

  const reminderTypes = [
    'Hydration',
    'Meal',
    'Exercise',
    'Sleep',
    'Medication',
    'Supplement',
  ];

  useEffect(() => {
    if (isOpen && user?.id) {
      fetchReminders();
    }
  }, [isOpen, user?.id]);

  const fetchReminders = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const response = await api.getReminders(user.id);
      setReminders(response.data || []);
    } catch (error) {
      console.error('Failed to fetch reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const data = {
        user_id: user.id,
        message: newReminder.message,
        times: [newReminder.time + ':00'],
        device_token: 'web-token',
        repeat_interval: newReminder.repeat_interval,
        reminder_type: newReminder.reminder_type,
      };

      await api.addReminder(data);
      await fetchReminders();
      setNewReminder({
        message: '',
        time: '',
        reminder_type: 'Hydration',
        repeat_interval: 'daily',
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add reminder:', error);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await api.deleteReminder(id);
      await fetchReminders();
    } catch (error) {
      console.error('Failed to delete reminder:', error);
    }
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getReminderIcon = (type) => {
    const icons = {
      Hydration: '💧',
      Meal: '🍽️',
      Exercise: '💪',
      Sleep: '😴',
      Medication: '💊',
      Supplement: '🌿',
    };
    return icons[type] || '⏰';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reminders</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading reminders...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Add Reminder Form */}
              {showAddForm ? (
                <Card className="p-4 border-2 border-emerald-200 bg-emerald-50">
                  <form onSubmit={handleAddReminder} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <input
                          type="text"
                          value={newReminder.message}
                          onChange={(e) => setNewReminder(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Drink water"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={newReminder.time}
                          onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          value={newReminder.reminder_type}
                          onChange={(e) => setNewReminder(prev => ({ ...prev, reminder_type: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          {reminderTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Repeat
                        </label>
                        <select
                          value={newReminder.repeat_interval}
                          onChange={(e) => setNewReminder(prev => ({ ...prev, repeat_interval: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Add Reminder
                      </Button>
                    </div>
                  </form>
                </Card>
              ) : (
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="w-full flex items-center justify-center space-x-2"
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Reminder</span>
                </Button>
              )}

              {/* Reminders List */}
              <div className="space-y-3">
                {reminders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No reminders set yet</p>
                    <p className="text-sm">Add your first reminder to get started!</p>
                  </div>
                ) : (
                  reminders.map((reminder) => (
                    <Card key={reminder.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">
                            {getReminderIcon(reminder.reminder_type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {reminder.message}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {reminder.times.map(time => formatTime(time)).join(', ')}
                              </span>
                              <span className="capitalize">
                                {reminder.repeat_interval}
                              </span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {reminder.reminder_type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteReminder(reminder.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};