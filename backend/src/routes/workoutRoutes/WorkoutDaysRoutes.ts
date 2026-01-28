import { Router } from "express";
import {
  WorkoutDaysController
} from "../../controllers/WorkoutDayController";

const workoutDaysController = new WorkoutDaysController();

const router = Router();

router
  .get("/all", (req, res) => workoutDaysController.getAllWorkoutDays(req, res))
  .get("/:date", (req, res) => workoutDaysController.getWorkoutDay(req, res));

export default router;
