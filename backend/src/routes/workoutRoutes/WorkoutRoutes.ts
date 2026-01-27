import { Router } from "express";
import WorkoutController from "../../controllers/WorkoutController";

const router = Router();

const workoutController = new WorkoutController();

router
  .post("/create", (req, res) => workoutController.createWorkout(req, res))
  .delete("/:id", (req, res) => workoutController.deleteWorkout(req, res))
  .get("/all", (req, res) => workoutController.getWorkouts(req, res))
  .get("/count", (req, res) => workoutController.countWorkouts(req, res));

export default router;
