const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getUserById, updateUser, deleteUser} = require("../controllers/user")
const {verifyToken,userOnly,adminOnly} = require("../Middleware/authMiddleware");

// post --->> create
// get --->> all users
// get --->> user by id
// put --->> update user
// delete --->> delete user


router.post("/create/user",verifyToken,userOnly, createUser);
router.get("/get/users", verifyToken,userOnly, getAllUsers);
router.get("/get/user/:id", verifyToken,userOnly, getUserById);
router.put("/update/user/:id", verifyToken,userOnly, updateUser);
router.delete("/delete/user/:id", verifyToken,userOnly, deleteUser);

module.exports = router;