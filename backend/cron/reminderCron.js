const supabase = require('../config/supabaseClient');

const setupReminderChecker = (io) => {
  const checkReminders = async () => {
    const now = new Date();

    const pad = (n) => (n < 10 ? '0' + n : n);
    const currentTime = `${pad(now.getHours())}:${pad(now.getMinutes())}:00`;
    const currentDay = now.getDay();

    console.log(`[Cron] Checking reminders @ ${currentTime} (Day: ${currentDay})`);

    const { data, error } = await supabase.from('reminders').select('*');

    if (error) {
      console.error('❌ Error fetching reminders:', error.message);
      return;
    }

    data.forEach((reminder) => {
      const { times, repeat_interval, user_id, message, reminder_type } = reminder;

      if (!times.includes(currentTime)) return;

      const shouldTrigger =
        repeat_interval === 'daily' ||
        (repeat_interval === 'weekdays' && currentDay >= 1 && currentDay <= 5) ||
        (repeat_interval === 'weekends' && (currentDay === 0 || currentDay === 6)) ||
        (repeat_interval === 'weekly' && currentDay === 1); // every Monday

      if (shouldTrigger) {
        const alertMessage = `It's time to ${message}`;
        console.log(`🔔 Sending alert to user ${user_id}: ${alertMessage}`);

        // Emit reminder to all connected clients (or filter by user if needed)
        io.emit('reminderAlert', {
          user_id,
          message: alertMessage,
          reminder_type,
          time: currentTime,
        });
      }
    });
  };

  setInterval(checkReminders, 60 * 1000); // Run every minute
};

module.exports = setupReminderChecker;
