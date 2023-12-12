const log = require("../models/log");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

exports.saveLog = catchAsyncError(async (req, res, next) => {
  const currentDate = Date.now();
  const { ip, email, password, action } = req.body;
  const logData = {
    ip_address: ip,
    timestamp: currentDate,
    tried_Ac: {
      email,
      password,
    },
    action,
  };

  await log.create(logData);
  return res.status(200).json({
    success: true,
  });
});

exports.getAllLogs = catchAsyncError(async (req, res) => {
  const user = req.user;
  if (user.role !== "admin") {
    return next(new ErrorHandler("Not authorized", 401));
  }
  const logs = await log.find();
  return res.status(200).json({
    success: true,
    data: logs,
    message: "All logs retrieved",
    error: "",
  });
});
