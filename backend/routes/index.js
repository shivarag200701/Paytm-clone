import express from "express";
import userRouter from "./user.js";
import accountRouter from "./account.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/me", (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(403).json({ msg: "not authenticated" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({ userId: decoded.userId });
    } catch (err) {
      console.error("error in verifying", err);

      return res.status(403).json({ msg: "not authenticated" });
    }
  }
});

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
