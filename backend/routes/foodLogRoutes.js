const express = require("express");
const router = express.Router();
const {updateFoodLog,getTodayLogAndRemainingGoals, getAllFoods} = require("../controllers/foodLogController");


router.put("/log", updateFoodLog); // Update today's log
router.get("/log/:userId", getTodayLogAndRemainingGoals); // Get log + remaining goals

//router.get('/', getAllFoods);

module.exports = router;