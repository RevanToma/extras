import express from "express";
import { getBalance, depositMoney } from "../controllers/accountController";

const router = express.Router();

router.post("/", getBalance);
router.post("/transactions", depositMoney);

export default router;
