/*globals Sammy, $ */
"use strict";
import blogsController from "./app/js/controllers/blogsController.js";
import usersController from "./app/js/controllers/usersController.js";

((function() {
    let sammyApp = Sammy("#content", function() {
        this.get("#/", function() {
            this.redirect("#/home");
        });
        this.get("#/home", blogsController.home);
        this.get("#/blog/:id", blogsController.byId);
        this.get("#/blogs/:subcategory/:category", blogsController.allByCategoryName);
        this.get("#/blogs/add", blogsController.post);
        this.get("#/register", usersController.register);
        this.get("#/login", usersController.login);
    });

    $(function() {
        sammyApp.run("#/");
        $(document).ready(() => {
            $("#create-post").hide();
            $(document).on("click", ".login-click", () => {
                $("#create-post").show();
            });
        });
        $(document).on("click", ".register-click", () => {
            $("#create-post").show();
            $("#login").hide();
        });
    });
})());