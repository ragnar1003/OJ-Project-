import bcrpyt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6 || password.length > 20) {
      return res.status(400).json({ message: "Password must be between 6 and 20 characters" });
    }
    if (email.indexOf("@") === -1) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrpyt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    user.token = token;
    user.password = undefined;
    res.status(200).cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:'strict',
      maxAge: 24*60*60*1000
    }).json({
      message: "User registered successfully",
      user
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrpyt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
  user.token = token;
  user.password = undefined;
  res.status(200).cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24*60*60*1000
  }).json({
    message:"Login Successful",
    user
  })
  
};

export const logout = (req,res) =>{
  res.clearCookie('token').status(200).json({message:"Logout Successful"});
}

export const checkSession = async (req, res) => {
  
  res.status(200).json(req.user);
};