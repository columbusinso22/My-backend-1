const User = require("../model/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const {
      email,
      userName,
      address,
      phoneNumber,
      age,
      gender,
      country,
      password,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "Email already Exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      userName,
      address,
      phoneNumber,
      age,
      gender,
      country,
      password: hashedPassword,
    });
    res.status(201).json({
      sucess: true,
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//// LOGIN

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT,
      { expiresIn: "1hr" },
    );
    res.status(201).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(201).json({
      success: true,
      message: "Users retrieved successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

////GET BY ID////////
exports.getAllUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return;
      res.status(404).json({
        success: false,
        message: "user not Found",
      });
    }
    res.status(201).json({
      success: "true",
      message: "retrived successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

////// UPDATE USER

exports.updateUser = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };
    /// if password is updated hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return;
      res.status(404).json({
        success: false,
        message: "user not Found",
      });
    }
    res.status(201).json({
      success: true,
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/////DELETE USER

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return;
      res.status(404).json({
        success: false,
        message: "user not Found",
      });
    }
    res.status(201).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
