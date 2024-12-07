import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All field are required...",
      });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist " });
    }

    // hashed password...

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "something went wrong on user create....",
      });
    }

    // generate token

    const token = await jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRETE,
      { expiresIn: "7d" }
    );

    if (!token) {
      return res.status(400).json({ message: "Error to generate token" });
    }
    // token save into cookies

    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "User created successfully...",
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("error in user signup", error);
    return res.status(500).json({
      success: false,
      message: "error in sign in",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "all field are required..." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "you are not register user" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Invalid email and password..." });
    }

    // generate token
    const salt = 10;
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRETE);

    if (!jwt) {
      return res.status(400).json({ message: "error in generate token" });
    }
    res.cookie("jwt", token);

    res.status(200).json({
      message: "login successfulll",
      _id: user._id,
      email: user.email,
      password: user.password,
      fullName: user.fullName,
    });
  } catch (error) {
    console.log("Error in login routes", error);
    return res
      .status(500)
      .json({ message: "Error in login", message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "User logout successfully..." });
  } catch (error) {
    console.log("Error in logout", error.message);
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in auth ckeck", error);
    return res
      .status(500)
      .json({ message: "Error in auth check", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    // console.log(profilePic);

    if (!profilePic) {
      return res.status(400).json({ message: "All filed are required...." });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    if (!uploadResponse) {
      return res
        .status(400)
        .json({ message: "Error in upload image on cloudinary..." });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "Error to update user...." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in update profile", error.message);
    return res
      .status(500)
      .json({ message: "Error in update profile", error: error });
  }
};

export { signup, login, logout, checkAuth, updateProfile };
