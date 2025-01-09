const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 74,
        },
        // password validation
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

// check if the email exist or not