const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const nameLength = name.length;
  const dummy_1 = await bcrypt.hash(`${mobile}@${name}`, salt);
  const dummy_2 = await bcrypt.hash(`${name}@${mobile}`, salt);
  const dummy_3 = await bcrypt.hash(
    `${name.substring(0, nameLength - 2)}#${mobile}`,
    salt
  );
  const dummy_4 = await bcrypt.hash(`${name}#${mobile.substring(0, 4)}`, salt);

  const user = await User.create({
    name,
    email,
    password_1: hashedPassword,
    password_2: dummy_1,
    password_3: dummy_2,
    password_4: dummy_3,
    password_5: dummy_4,
    mobile,
  });

  return res.status(200).json({
    success: true,
    data: user
  })
});



// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
    error: "",
  });
});

//Get user Detail --Profile
exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    },
    message: "Success",
    error: "",
  });
});

//update profile
exports.updateUserDetail = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  const { name, mobile } = req.body;

  user.name = name;
  user.mobile = mobile;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    },
    message: "Success",
    error: "",
  });
});


//Get all users --CMS
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  
  
  const users = await User.find();
  return res.status(200).json({
    success: true,
    message: "All users",
    data: users,
    error: "",
  });
});

//delete user  --CMS
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  const user = req.user;
  
  await User.findByIdAndDelete(userId);

  return res.status(200).json({
    success: true,
    message: "User deleted",
    error: "",
  });
});

//Assign role
exports.changeRole = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  
  const { userId } = req.params;
  const targetUser = await User.findById(userId);

  if (targetUser.role === "user") {
    targetUser.role = "admin";
  } else {
    targetUser.role = "user";
  }

  await targetUser.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Role changed",
    data: {
      name: targetUser.name,
      role: targetUser.role,
    },
  });
});
