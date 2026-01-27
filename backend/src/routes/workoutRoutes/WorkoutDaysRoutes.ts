import { Router } from "express";
import {
  getWorkoutDayController,
} from "../../controllers/WorkoutDayController";

const router = Router();

router.get("/:date", getWorkoutDayController);

export default router;
