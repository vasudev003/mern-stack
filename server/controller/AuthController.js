import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const categories = [
  { label: "Travel", icon: "user" },
  { label: "Shopping", icon: "user" },
  { label: "Investment", icon: "user" },
  { label: "Bills", icon: "user" },
];

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(406).json({ message: "User already exists." });
    return;
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hasedPassword = bcrypt.hashSync(password, salt);

  const user = await User({
    email,
    password: hasedPassword,
    firstName,
    lastName,
    categories,
  });
  await user.save();
  res.status(201).json({ message: "user is created" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "Credentials not found" });
    return;
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    res.status(406).json({ message: "Credentials not found" });
    return;
  }

  const payload = {
    username: email,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "succefully logged in.", token, user });
};
