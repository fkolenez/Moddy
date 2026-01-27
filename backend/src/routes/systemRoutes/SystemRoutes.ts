import { Router } from "express";
import SystemController from "../../controllers/SystemController";

const router = Router();
const systemController = new SystemController();

router.get("/health", (req, res) => systemController.getHealth(req, res));
router.get("/", (req, res) => systemController.getApiInfo(req, res));

export default router;
