import { Request, Response } from "express";
import { createWorkout } from "../services/WorkoutService";
import { Workout } from "../models/Workout";

export default class WorkoutController {
  async createWorkout(req: Request, res: Response) {
    const { date, category, description } = req.body;

    if (!date || !category || !description) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const workout = await createWorkout({
      date,
      category,
      description
    });

    return res.status(201).json(workout);
  }

  async deleteWorkout(req: Request, res: Response) {
    try {
      const workoutId = req.data?.id;

      if (!workoutId) return res.status(400).json({ message: "Id não enviado!" });

      await Workout.findOneAndDelete(workoutId);
      return res.json({ message: "Treino deletado com sucesso!" });

    } catch (err) {
      return res.status(500).json({ message: "Erro ao deletar usuário.", error: err.message });
    }
  }

  async getWorkouts(req: Request, res: Response) {
    try {
      const workouts = await Workout.find();

      return res.status(200).json(workouts)
    } catch (err) {
      return res.status(500).json({ message: "Erro ao encontrar os treinos.", error: err.message });
    }
  }

  async countWorkouts(req: Request, res: Response) {
    try {
      const count = await Workout.countDocuments();

      return res.status(200).json({ count })
    } catch (err) {
      return res.status(500).json({ message: "Erro ao contar os treinos.", error: err.message });
    }
  }
}