const express = require("express");

const {
  
  registerUser,
  logoutUser,
  getUserDetail,
  getAllUsers,
  updateUserDetail,
  deleteUser,
  
  changeRole,
} = require("../controllers/userController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);



router.route("/logout").get(isAuthenticatedUser, logoutUser);

router
  .route("/details")
  .get(isAuthenticatedUser, getUserDetail)
  .put(isAuthenticatedUser, updateUserDetail);

router.route("/cms").get(isAuthenticatedUser, getAllUsers);
router
  .route("/cms/:userId")
  .delete(isAuthenticatedUser, deleteUser)
  .put(isAuthenticatedUser, changeRole);


module.exports = router;
