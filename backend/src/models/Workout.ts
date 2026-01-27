import { Schema, model } from "mongoose";

const WorkoutSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      index: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { 
    timestamps: true,     
    versionKey: false // Remove o campo __v
  }
);

export const Workout = model("Workout", WorkoutSchema);
