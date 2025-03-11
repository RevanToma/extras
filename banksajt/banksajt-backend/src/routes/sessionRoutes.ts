import express from "express";
import { loginUser } from "../controllers/sessionController";

const router = express.Router();

router.post("/", loginUser);

export default router;
