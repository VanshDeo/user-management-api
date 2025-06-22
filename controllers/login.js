import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
         const user = await User.findOne({ email });
         if(!user){
            return res.status(400).json({ message: "Invalid email or password"});
         }

         const isMatch = await bcrypt.compare(password, user.password);
         if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
         }

         const token = jwt.sign(
            {id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h" }
         );

         res.status(200).json({ message: "Login succesful", token, user });
    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error", error: err.message});
    }
}

export default login;