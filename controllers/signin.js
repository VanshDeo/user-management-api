import User from "../models/User.js";

const signin = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const chkUser = await User.findOne({ email });
    if (chkUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const user = User.create({
      firstName,
      lastName,
      email,
      phone,
      password
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export default signin;