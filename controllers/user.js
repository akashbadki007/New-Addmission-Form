const User = require("../models/StudentSchema")

exports.createUser = async (req,res) => {
    try{
        const {fullName,email, phoneNumber, address, dateOfBirth, collegeName, branchName, yearOfPassing, courseName} = req.body;

        // Validate required fields
        if(!fullName || !email || !phoneNumber || !branchName || !yearOfPassing || !courseName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = new User({
            fullName,
            email,
            phoneNumber,
            address,
            dateOfBirth,
            collegeName,
            branchName,
            yearOfPassing,
            courseName
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user });

    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}