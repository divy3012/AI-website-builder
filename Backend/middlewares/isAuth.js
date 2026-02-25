import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("cookies", req.cookies);
    if (!token) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid token" });
  }
};

export default isAuth;
