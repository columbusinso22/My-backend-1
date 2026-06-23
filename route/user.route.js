const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getAllUsers,
  getAllUserById,
  deleteUser,
  updateUser,
} = require("../controller/user.controller.js");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/:id", getAllUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
