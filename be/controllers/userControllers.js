import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const getProfile = async (req, res) => {
  try {

    const userId = req.userInfo.userId;
    const getUser = await User.findById(userId,"-password");
    res.status(200).json({user: getUser});

  } catch (error) {
    res.status(500).json({message: "Error fetching user profile", error: error.message});
  }
};



export const Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser)

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const Login = async (req,res)=>{
    try {

        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: "user not found in our records"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const payload = {
            userId: user._id,
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        const options = {
            expiresIn: '1h',
        }

        const token = jwt.sign(payload, secretKey, options);
        return res.json({token,user:{userid: user._id,username: user.username, email:user.email}});
  
    } catch (error) {
        res.status(500).json({message: "Error logging in", error: error.message});
    }
}
