import { Request, Response } from "express";
import { WorkoutDay } from "../models/WorkoutDay";

export async function getWorkoutDayController(req: Request, res: Response) {
  const { date } = req.params;

  const workoutDay = await WorkoutDay.findOne({ date })
    .populate("workouts");

  if (!workoutDay) {
    return res.status(404).json({ message: "Nenhum treino nesse dia" });
  }

  return res.json(workoutDay);
}
