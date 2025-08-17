const e = require('express');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,       
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber:{
        type: String,
        required: true,  
        unique: true,
        trim: true,
    },
    address:{
        type: String,
        required: true,
        trim: true,
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    collegeName:{
        type: String,
        required: true,
        trim: true,
    },
    branchName:{
        type: String,  
        required: true,  
        trim: true,
    },
    yearOfPassing:{
        type: Number,
        required: true
    },

    courseName:{
        type: String,
        required: true,
        trim: true,
        enum: ["React JS", "Python", "Java", "AWS", "Data Science", "Python Testing"] 
    }
})

module.exports = mongoose.model('Student', studentSchema);