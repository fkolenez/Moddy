import { Workout } from "../models/Workout";
import { WorkoutDay } from "../models/WorkoutDay";

type CreateWorkoutDTO = {
  date: string;
  category: string;
  description: string;
};

export async function createWorkout(data: CreateWorkoutDTO) {
  const workout = await Workout.create(data);

  const workoutDay = await WorkoutDay.findOneAndUpdate(
    { date: data.date },
    {
      $push: { workouts: workout._id },
      $inc: { count: 1 }
    },
    { upsert: true, new: true }
  );

  return {
    workout,
    workoutDay
  };
}