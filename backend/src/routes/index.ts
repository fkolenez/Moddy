import express from "express";
import WorkoutRoutes from "./workoutRoutes/WorkoutRoutes"
import WorkoutDayRoutes from "./workoutRoutes/WorkoutDaysRoutes"
import SystemRoutes from "./systemRoutes/SystemRoutes"

const router = express.Router();

router.use("/", SystemRoutes);
router.use("/workouts", WorkoutRoutes);
router.use("/workoutsDays", WorkoutDayRoutes);

export default router;