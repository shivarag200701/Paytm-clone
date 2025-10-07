import express from "express";
import userRouter from "./user.js";
import accountRouter from "./account.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
