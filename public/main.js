/*globals Sammy, $ */
"use strict";
import blogsController from "./app/js/controllers/blogsController.js";
import usersController from "./app/js/controllers/usersController.js";
import strSearcher from "./helpers/search-params-verifier.js";
import notifier from "./helpers/notifier.js";

((function() {
    let sammyApp = Sammy("#content", function() {
        this.get("#/", function() {
            this.redirect("#/home");
        });
        this.get("#/home", blogsController.home);
        this.get("#/blog/:id", blogsController.byId);
        this.get("#/blogs/:subcategory/:category", blogsController.allByCategoryName);
        this.get("#/search/category/:category", blogsController.searchCategory);
        this.get("#/search/subcategory/:subcategory", blogsController.searchSubCategory);
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
        $(document).on("click", ".home-search-button", () => {
            let searchVal = $("#search-input").val();
            let newVal;
            if (strSearcher.searchparamsCategory(searchVal)) {
                if (searchVal === "dc") {
                    $(location).attr("href", "#/search/category/" + strSearcher.capitalizeFirstTwo(searchVal));
                }
                $(location).attr("href", "#/search/category/" + strSearcher.capitalizeFirst(searchVal));
            } else if (searchVal.includes("Comics") || searchVal.includes("comic") || searchVal.includes("comics")) {
                $("#search-input").val("Comics");
                newVal = $("#search-input").val();
                $(location).attr("href", "#/search/subcategory/" + newVal);
            } else if (searchVal.includes("Action") || searchVal.includes("action") || searchVal.includes("Figures") || searchVal.includes("figures")) {
                $("#search-input").val("Action Figures");
                newVal = $("#search-input").val();
                $(location).attr("href", "#/search/subcategory/" + newVal);
            } else if (searchVal.includes("Graphic") || searchVal.includes("graphic") || searchVal.includes("Novels") || searchVal.includes("novels") || searchVal.includes("novel")) {
                $("#search-input").val("Graphic Novels");
                newVal = $("#search-input").val();
                $(location).attr("href", "#/search/subcategory/" + newVal);
            } else {
                notifier.send("Invalid search request");
                notifier.explain(
                    "Search params must be valid category/subcategory", "warning");
            }
            $("#search-input").val("");

        });
        $("#logout").on("click", function() {
            localStorage.clear();
            $("#register").show();
            $("#login").show();
            $("#logout").hide();
            $("#create-post").hide();
            notifier.send("You logged out");
        });
    });
})());