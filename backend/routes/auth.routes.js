import express from "express";
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const authRouter = express.Router();

authRouter.post('/signup', signup);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/onboard', protectRoute, onboard);

//check if user logged in
authRouter.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default authRouter;