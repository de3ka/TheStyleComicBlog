"use strict";
import requester from "../../../helpers/requester.js";

export default {
    all: function(page, size) {
        return requester.get("/blogs?page=" + page + "&size=" + size);
    },
    byId: function(id) {
        return requester.get("/blogs/" + id).then(blog => {
            return blog;
        });
    },
    create: function(post) {
        return requester.post("/blogs", post);
    },
    byCategoryName: function(subcategory, category) {
        return requester.get("/blogs/" + subcategory + "/" + category).then(blogs => {
            return blogs;
        });
    }
};