import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token)
      return res.status(403).json({
        message: "Token not provided",
      });

    const decodedData = jwt.verify(token, process.env.JWT_SEC);

    req.user = await User.findById(decodedData._id);

    next();
  } catch (error) {
    res.status(403).json({
      message: "Please Login",
    });
  }
};
