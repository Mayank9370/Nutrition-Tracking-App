require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const userRoutes = require('./routes/userRoutes');
const foodLogRoutes = require('./routes/foodLogRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const setupReminderChecker = require('./cron/reminderCron'); // updated to be a setup function
const foodRoutes = require('./routes/foodLogRoutes');

const app = express();
const server = http.createServer(app);

// WebSocket Setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // frontend URL
    methods: ['GET', 'POST'],
  },
});


app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/food-log', foodLogRoutes);
app.use('/reminders', reminderRoutes);
// app.use('/api/foods', foodRoutes);

// Daily reset logic
require('./cron/dailyReset');

// WebSocket connection
io.on('connection', (socket) => {
  console.log('🟢 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// Reminder check every minute
setupReminderChecker(io); // pass socket server to cron job

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




//To check Connection
// require('dotenv').config();
// const supabase = require('./config/supabaseClient');

// // Test connection
// async function testConnection() {
//   const { data, error } = await supabase
//     .from('foods')
//     .select('*')
//     .limit(1);

//   if (error) console.error('Connection error:', error);
//   else console.log('Successfully connected to Supabase!');
// }

// testConnection();