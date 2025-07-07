const supabase = require("../config/supabaseClient");

// ✅ PUT /api/log { userId, calories, protein, carbs, fats, water_intake, sleep, steps }
exports.updateFoodLog = async (req, res) => {
  try {
    const {
      userId,
      calories = 0,
      protein = 0,
      carbs = 0,
      fats = 0,
      water_intake = 0,
      sleep = 0,
      steps = 0
    } = req.body;

    const today = new Date().toISOString().split("T")[0];

    // Check if log exists
    const { data: existing, error: getErr } = await supabase
      .from("food_log")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single();

    if (getErr) throw getErr;

    // Update existing values (add to them)
    const updated = {
      total_calories: existing.total_calories + calories,
      protein: existing.protein + protein,
      carbs: existing.carbs + carbs,
      fats: existing.fats + fats,
      water_intake: existing.water_intake + water_intake,
      sleep: existing.sleep + sleep,
      steps: existing.steps + steps
    };

    const { error: updateErr } = await supabase
      .from("food_log")
      .update(updated)
      .eq("id", existing.id);

    if (updateErr) throw updateErr;

    res.status(200).json({ message: "Log updated successfully", updated });

  } catch (err) {
    console.error("Update log error:", err.message);
    res.status(500).json({ error: "Failed to update log", details: err.message });
  }
};

// ✅ GET /api/log/:userId
// exports.getTodayLogAndRemainingGoals = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const today = new Date().toISOString().split("T")[0];

//     const [{ data: profile, error: profileErr }, { data: log, error: logErr }] = await Promise.all([
//       supabase.from("user_profile").select("*").eq("id", userId).single(),
//       supabase.from("food_log").select("*").eq("user_id", userId).eq("date", today).single()
//     ]);

//     if (profileErr || logErr) throw profileErr || logErr;

//     const remaining = {
//       calories: profile.daily_calories - log.total_calories,
//       protein: profile.protein_target - log.protein,
//       carbs: profile.carbs_target - log.carbs,
//       fats: profile.fats_target - log.fats,
//       water_intake: profile.water_intake_goal - log.water_intake,
//       sleep: profile.sleep_goal - log.sleep,
//       steps: profile.step_goal - log.steps
//     };

//     res.status(200).json({
//       date: today,
//       intake: log,
//       remaining_goals: remaining
//     });

//   } catch (err) {
//     console.error("Fetch log error:", err.message);
//     res.status(500).json({ error: "Failed to fetch log", details: err.message });
//   }
// };

exports.getAllFoods = async (req, res) => {
  const { data, error } = await supabase
    .from('foods')
    .select('id, name, calories, protein, carbs, fats');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};

// ✅ GET /api/log/:userId
exports.getTodayLogAndRemainingGoals = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date().toISOString().split("T")[0];

    const [{ data: profile, error: profileErr }, { data: log, error: logErr }] = await Promise.all([
      supabase.from("user_profile").select("*").eq("id", userId).single(),
      supabase.from("food_log").select("*").eq("user_id", userId).eq("date", today).single()
    ]);

    if (profileErr || logErr) throw profileErr || logErr;

    const remaining = {
      calories: profile.daily_calories - log.total_calories,
      protein: profile.protein_target - log.protein,
      carbs: profile.carbs_target - log.carbs,
      fats: profile.fats_target - log.fats,
      water_intake: profile.water_intake_goal - log.water_intake,
      sleep: profile.sleep_goal - log.sleep,
      steps: profile.step_goal - log.steps
    };

    const progress = {
      calories: (log.total_calories / profile.daily_calories) * 100,
      protein: (log.protein / profile.protein_target) * 100,
      carbs: (log.carbs / profile.carbs_target) * 100,
      fats: (log.fats / profile.fats_target) * 100,
      water_intake: (log.water_intake / profile.water_intake_goal) * 100,
      sleep: (log.sleep / profile.sleep_goal) * 100,
      steps: (log.steps / profile.step_goal) * 100
    };

    res.status(200).json({
      date: today,
      intake: log,
      remaining_goals: remaining,
      progress_percent: progress
    });

  } catch (err) {
    console.error("Fetch log error:", err.message);
    res.status(500).json({ error: "Failed to fetch log", details: err.message });
  }
};