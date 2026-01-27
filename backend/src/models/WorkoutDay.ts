import { Schema, model, Types } from "mongoose";

const WorkoutDaySchema = new Schema({
    date: {
        type: String,
        required: true,
        unique: true
    },
    workouts: [{ type: Types.ObjectId, ref: "Workout" }],
    count: { type: Number, default: 0 }
}, {
    versionKey: false // Remove o campo __v
});

export const WorkoutDay = model("WorkoutDay", WorkoutDaySchema);