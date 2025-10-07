import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);

  const { balance } = await Account.findOne({ userId });

  if (!balance) {
    return res.status(411).json({ msg: "account not found" });
  }

  return res.status(200).json({ balance });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { to, amount, userId } = req.body;

  const fromAccount = await Account.findOne({ userId });
  const toAccount = await Account.findOne({ to });

  if (!to) {
    return res.status(400).json({ message: "Invalid account" });
  }

  if (fromAccount && fromAccount.balance < amount) {
    return res.status(400).json({ message: "insufficient balance" });
  }
  //reduce balance
  await Account.updateOne({ userId }, { $inc: { balance: -amount } });

  //increase balance
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

  return res.status(200).json({ message: "Transfer successful" });
});

export default accountRouter;
