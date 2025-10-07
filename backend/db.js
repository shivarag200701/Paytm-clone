import mongoose from "mongoose";
import dotenv from "dotenv";
const { Schema } = mongoose;
dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

console.log(process.env.MONGODB_URL);

console.log("Connected to MongoDB");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const AccountsSchema = new Schema({
  balance: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
export const Account = mongoose.model("Account", AccountsSchema);
