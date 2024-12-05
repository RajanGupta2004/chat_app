import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(404).json({ message: "token not found" });
    }

    const decodeToken = await jwt.verify(token, process.env.JWT_SECRETE);
    if (!decodeToken) {
      return res
        .status(400)
        .json({ message: "Errro to decode token in valid token" });
    }

    const user = await User.findById(decodeToken.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "usernot found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;
