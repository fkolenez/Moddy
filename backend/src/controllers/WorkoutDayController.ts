import { Request, Response } from "express";
import { WorkoutDay } from "../models/WorkoutDay";

export class WorkoutDaysController {
  async getWorkoutDay(req: Request, res: Response) {
    const { date } = req.params;

    const workoutDay = await WorkoutDay.findOne({ date })
      .populate("workouts");

    if (!workoutDay) {
      return res.status(404).json({ message: "Nenhum treino nesse dia" });
    }

    return res.json(workoutDay);
  }

   async getAllWorkoutDays(req: Request, res: Response) {
    try {
      const workoutDays = await WorkoutDay.find()
        .select('date count') 
        .sort({ date: 1 }); 

      return res.json(workoutDays);
    } catch (error) {
      console.error('Erro ao buscar workout days:', error);
      return res.status(500).json({ message: "Erro ao buscar dias de treino" });
    }
  }
}
 
