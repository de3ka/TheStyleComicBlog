/* globals require module */
"use strict";

const mongoose = require("mongoose");
let dateFormat = require("dateformat");

const requiredMessage = "{PATH} is required";

let blogPostSchema = mongoose.Schema({
    title: {
        type: String,
        requred: requiredMessage
    },
    article: {
        type: String
            // required: requiredMessage
    },
    image: {
        type: String
    },
    category: {
        type: String,
        default: "Common"
    },
    subcategory: {
        type: String,
        default: "Common"
    },
    postedBy: {
        type: String
            // required: requiredMessage
    },
    postedOn: {
        type: String,
        default: dateFormat("mmm d")
    },
    tags: {
        type: [String]
    },
    comments: [{
        postedBy: String,
        postedOn: {
            type: String,
            default: dateFormat("mmm d")
        },
        content: String
    }]
});

mongoose.model("BlogPost", blogPostSchema);

module.exports = mongoose.model("BlogPost");