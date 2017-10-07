"use strict";
const express = require("express");
let Router = express.Router;
module.exports = function({ app, controller }) {
    let router = new Router();

    router
        .get("/blogs", controller.blogController.getAllBlogsPagination)
        .get("/blogs/:id", controller.blogController.getById)
        .post("/blogs/:id", controller.blogController.addComment)
        .get("/blogs/:subcategory/:category", controller.blogController.listBlogsByCategoryByName)
        .get("/search/category/:category", controller.blogController.searchBlogsCategory)
        .get("/search/subcategory/:subcategory", controller.blogController.searchBlogsSubCategory)
        .get("/users", controller.userController.getAll)
        .get("/users/:id", controller.userController.getById)
        .post("/blogs", controller.blogController.create)
        .post("/register", controller.authController.register)
        .post("/login", controller.authController.login)
        .post("/logout", controller.authController.logout);
    app.use(router);

    return router;
};