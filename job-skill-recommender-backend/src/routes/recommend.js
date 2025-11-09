import express from "express";
import { recommendJobs } from "../controllers/recommendController.js";

const router = express.Router();

router.post("/recommend", recommendJobs);

export default router;
