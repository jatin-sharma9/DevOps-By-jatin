import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import dataRouter from "./data.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dataRouter);

export default router;
