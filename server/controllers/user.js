import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "User Already exists",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    user = {
      name,
      email,
      password: hashPassword,
    };

    const otp = Math.floor(Math.random() * 1000000);

    const activationToken = jwt.sign(
      { user, otp },
      process.env.Activation_Secret,
      {
        expiresIn: "5m", //5 minutes
      }
    );

    await sendMail(
      email,
      "Account Activation",
      `Your OTP is: ${otp}. Please use this OTP to verify your account.`
    );

    res.status(200).json({
      message: "OTP send to your mail",
      activationToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;

    const verify = jwt.verify(activationToken, process.env.Activation_Secret);

    if (!verify)
      return res.status(400).json({
        message: "OTP expired",
      });

    if (verify.otp !== otp)
      return res.status(400).json({
        message: "Incorrect OTP",
      });

    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.password,
    });

    res.json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
      return res.status(400).json({
        message: "Incorrect password",
      });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
      expiresIn: "15d", //15 days
    });

    res.json({
      message: `Welcome Back ${user.name}`,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({ user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
