const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getUserById, updateUser, deleteUser} = require("../controllers/user")

// post --->> create
// get --->> all users
// get --->> user by id
// put --->> update user
// delete --->> delete user


router.post("/create/user", createUser);
router.get("/get/users", getAllUsers);
router.get("/get/user/:id", getUserById);   
router.put("/update/user/:id", updateUser);
router.delete("/delete/user/:id", deleteUser);

module.exports = router;