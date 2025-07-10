import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long!!" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists!!" });
    }

    const randomIndex = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${randomIndex}`;

    const newUser = await User.create({
      username,
      email,
      password,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.username,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for user ${newUser.username}`);
    } catch (error) {
      console.log("Error creating stream user", error);
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false   // process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log("Error in signing up", error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password!!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false, // process.env.NODE_ENV === "production"
    });

    res.status(200).json({ message: "User signed in successfully", user });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({ message: "Internal Server error!!" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out successfully" });
};

export const onboard = async (req, res) => {
    try {
        console.log(req.user)
        const userId = req.user._id;

        const { username, bio, nativeLanguage, learningLanguage, location } = req.body;
        if (!username || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({ message: "All fields are required!!" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnBoarded: true,
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!!" });
        }

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.username,
                image: updatedUser.profilePic || "",
            });
        } catch (error) {
            console.log("Error updating stream user during onboarding", error);
            res.status(500).json({ message: "Internal Server Error!!" });
            return;
        }

        res.status(200).json({ message: "User updated successfully", updatedUser})

    } catch (error) {
        console.log("Error in onboarding", error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}
