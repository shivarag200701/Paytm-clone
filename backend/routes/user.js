import express from "express";
import { z } from "zod";
import { User } from "../db.js";
import jwt from "jsonwebtoken";

const userSchema = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(3).max(30).optional(),
  password: z.string().min(6),
});

const signinSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  console.log("here");

  const { username, firstName, lastName, password } = req.body;
  const parsedUser = userSchema.safeParse({
    username,
    firstName,
    lastName,
    password,
  });
  if (!parsedUser.success) {
    return res.status(411).json({
      error: "please provide valid user data",
      details: parsedUser.error,
    });
  }
  const existingUser = await User.find({ username });
  console.log(existingUser.length);

  if (existingUser.length !== 0) {
    return res.status(411).json({ msg: "user already exists" });
  }

  const newUser = await User.create({
    username,
    firstName,
    lastName,
    password,
  });

  const userId = newUser._id;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  return res.json({ message: "User created successfully", token });
});

userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const parsedUser = signinSchema.safeParse({
    username,
    password,
  });
  if (!parsedUser.success) {
    return res.status(411).json({
      error: "please provide valid user data",
      details: parsedUser.error,
    });
  }

  const user = await User.find({ username });

  if (!user) {
    return res.status(411).json({ message: "Error while logging in" });
  }

  const userId = user[0]._id;

  if (user[0].password !== password) {
    return res.status(411).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return res.status(200).json({ token });
});

export default userRouter;
