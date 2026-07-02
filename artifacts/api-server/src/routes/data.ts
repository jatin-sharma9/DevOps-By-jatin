import { Router, type IRouter } from "express";
import * as db from "../lib/db.js";

const router: IRouter = Router();

router.get("/roadmap", (_req, res) => {
  res.json(db.roadmap);
});

router.get("/topics", (_req, res) => {
  res.json(db.topics);
});

router.get("/projects", (_req, res) => {
  res.json(db.projects);
});

router.get("/labs", (_req, res) => {
  res.json(db.labs);
});

router.get("/interview", (_req, res) => {
  res.json(db.interview);
});

router.get("/resources", (_req, res) => {
  res.json(db.resources);
});

router.get("/best-practices", (_req, res) => {
  res.json(db.bestPractices);
});

export default router;
