import express from "express";
import WorkoutRoutes from "./workoutRoutes/WorkoutRoutes"
import WorkoutDayRoutes from "./workoutRoutes/WorkoutDaysRoutes"
import SystemRoutes from "./systemRoutes/SystemRoutes"
import PhotosRoutes from "./photosRoutes/photosRoutes";

const router = express.Router();

router.use("/", SystemRoutes);
router.use("/workouts", WorkoutRoutes);
router.use("/workoutsDays", WorkoutDayRoutes);
router.use("/photos", PhotosRoutes)

export default router;