import { Request, Response } from "express";

class SystemController {
  async getHealth(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "API is running! 🚀",
        status: "healthy",
        timestamp: new Date().toISOString(),
        environment: "development"
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        status: "error",
        error: error
      });
    }
  }

  async getApiInfo(req: Request, res: Response) {
    try {
      res.status(200).json({
        name: "Moddy API",
        version: "1.0.0",
        endpoints: {
          health: "/api/health",
          workouts: "/api/workouts",
          workoutsDays: "/api/workoutsDays"
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error
      });
    }
  }
}

export default SystemController;
