const mongoose = require("mongoose");

const userLoginSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        
    }
});

module.exports = mongoose.model("userLogin", userLoginSchema);
