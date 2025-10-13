import express from "express";
import { z } from "zod";
import { User, Account } from "../db.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware.js";

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

// const updateSchema = z.object({
//   firstName: z.string().min(3).max(30).optional(),
//   lastName: z.string().min(3).max(30).optional(),
//   password: z.string().min(6).optional(),
//   userId: z.string().min(1),
// });

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

  //Initialize account with 1 - 10,000 random balance
  const account = await Account.create({
    userId,
    balance: Math.floor(Math.random() * 10000) + 1,
  });

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  return res.json({ message: "User created successfully", token: token });
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
  return res
    .status(200)
    .json({ message: "user sucessfully logged in", token: token });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { firstName, lastName, password, userId } = req.body;
  console.log("userId", userId);

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(411).json({ message: "User not found" });
  }

  if (password && password.length < 6) {
    return res
      .status(411)
      .json({ message: "Password must be at least 6 characters long" });
  }

  await User.findOneAndUpdate(
    { _id: userId },
    { firstName, lastName, password }
  );

  return res.status(200).json({ message: "Updated successfully" });
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const users = req.query.filter;
  console.log("params", users);
  if (!users) {
    // return res.status(411).json({ message: "Please provide user ids" });
    const userList = await User.find();
    return res.status(200).json({ users: userList });
  }
  const userList = await User.find({ username: { $in: users } });

  if (!userList) {
    return res.status(411).json({ message: "Users not found" });
  }
  return res.status(200).json({ users: userList });
});

export default userRouter;
