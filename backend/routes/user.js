import express from "express";
import { z } from "zod";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = z.object({
  username: z.string().min(3).max(30),
  firstname: z.string().min(3).max(30),
  lastname: z.string().min(3).max(30).optional(),
  password: z.string().min(6),
});

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  console.log("here");

  const { username, firstname, lastname, password } = req.body;
  const parsedUser = userSchema.safeParse({
    username,
    firstname,
    lastname,
    password,
  });
  if (!parsedUser.success) {
    res.status(411).json({
      error: "please provide valid user data",
      details: parsedUser.error,
    });
  }
  const existingUser = await User.find({ username });
  if (existingUser) {
    res.status(411).json({ msg: "user already exists" });
  }

  const newUser = await User.create({
    username,
    firstname,
    lastname,
    password,
  });

  const token = jwt.sign({ username }, process.env.JWT_SECRET);

  res.json({ message: "User created successfully", token });
});

export default userRouter;
