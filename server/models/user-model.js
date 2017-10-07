/* globals module require String */
"use strict";
const mongoose = require("mongoose");
const requiredMessage = "{PATH} is required!";

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: requiredMessage,
        unique: true,
        minlength: 4,
        maxlength: 30
    },
    password: {
        type: String,
        require: requiredMessage,
        minlength: 6,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        require: requiredMessage
    },
    avatar: {
        type: String,
        default: "http://www.subdimension.co.uk/style/assets/avatar.png"
    }
});

mongoose.model("User", userSchema);
module.exports = mongoose.model("User");