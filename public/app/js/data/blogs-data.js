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
    addComment: function(id, comment) {
        return requester.post("/blogs/" + id, comment);
    },
    byCategoryName: function(subcategory, category) {
        return requester.get("/blogs/" + subcategory + "/" + category).then(blogs => {
            return blogs;
        });
    },
    allCategoryName: function(category) {
        return requester.get("/search/category/" + category).then(blogs => {
            return blogs;
        });
    },
    allSubcategoryName: function(subcategory) {
        return requester.get("/search/subcategory/" + subcategory).then(blogs => {
            return blogs;
        });
    }
};