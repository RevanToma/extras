import { Request, Response } from "express";
import { accounts, sessions } from "../models/data";

export const getBalance = (req: Request, res: Response): void => {
    const { token } = req.body;
    const session = sessions.find((s) => s.token === token);
    if (!session) {
        res.status(401).json({ message: "Invalid or expired session" });
        return;
    }

    const account = accounts.find((acc) => acc.userId === session.userId);
    res.json({ balance: account?.amount ?? 0 });
};

export const depositMoney = (req: Request, res: Response): void => {
    const { token, amount } = req.body;
    if (!amount || amount <= 0) {
        res.status(400).json({ message: "Invalid amount" });
        return;
    }

    const session = sessions.find((s) => s.token === token);
    if (!session) {
        res.status(401).json({ message: "Invalid or expired session" });
        return;
    }

    const account = accounts.find((acc) => acc.userId === session.userId);
    if (account) {
        account.amount += amount;
        res.json({ message: "Deposit successful", balance: account.amount });
        return;
    }

    res.status(404).json({ message: "Account not found" });
};
