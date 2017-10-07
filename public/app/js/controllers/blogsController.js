/*globals $ */
"use strict";
import templates from "../../../helpers/templates.js";
import notifier from "../../../helpers/notifier.js";
import data from "../data/blogs-data.js";

export default {
    home: function(context) {
        let page = context.params.page;
        let size = context.params.size;
        Promise.all([data.all(page, size), templates.load("home")])
            .then(function([result, template]) {
                let homeBlogs = JSON.parse(JSON.stringify(result.result.blogs));
                let homePagination = JSON.parse(JSON.stringify(result.result.pagination));
                context.$element().html(template({
                    blogs: homeBlogs,
                    pagination: homePagination
                }));
            });
    },
    allByCategoryName: function(context) {
        let subcategory = context.params.subcategory;
        let category = context.params.category;
        Promise.all([data.byCategoryName(subcategory, category), templates.load("list-blogs-category")])
            .then(function([blogs, template]) {
                console.log(blogs);
                context.$element().html(template({
                    blogs: blogs
                }));
            });
    },
    byId: function(context) {
        let id = context.params.id;
        Promise.all([data.byId(id), templates.load("single-blog")])
            .then(function([blog, template]) {
                let user = localStorage.getItem("user");
                let newUser = JSON.parse(user);

                context.$element().html(template(blog.blog));
                $("#leave-reply-submit").on("click", function(ev) {
                    ev.preventDefault();
                    let comment = {
                        content: $("#leave-reply-text").val(),
                        postedBy: newUser.username || "Stranger"
                    };
                    data.addComment(id, comment);
                    location.reload(true);
                });
            });
    },
    post: function(context) {
        templates.load("blog-create")
            .then(template => {
                context.$element().html(template());

                $("#btn-create-post").on("click", function() {
                    let user = localStorage.getItem("user");
                    let newUser = JSON.parse(user);

                    let tagsStr = $("#create-tags").val();
                    var tagsArray = tagsStr.split(" ").filter(i => i);

                    let post = {
                        title: $("#title").val(),
                        category: $("#category").val(),
                        subcategory: $("#subcategory").val(),
                        image: $("#image").val(),
                        article: $("#article").val(),
                        tags: [],
                        postedBy: newUser.username
                    };
                    post.tags.push(...tagsArray);

                    data.create(post)
                        .then(() => {
                            notifier.send("Post created!");
                            context.redirect("#/home");
                        });
                });
            });
    },
    searchCategory: function(context) {
        let category = context.params.category;
        Promise.all([data.allCategoryName(category), templates.load("list-blogs-category")])
            .then(function([blogs, template]) {
                console.log(blogs);
                context.$element().html(template({
                    blogs: blogs
                }));
            });
    },
    searchSubCategory: function(context) {
        let subcategory = context.params.subcategory;
        Promise.all([data.allSubcategoryName(subcategory), templates.load("list-blogs-category")])
            .then(function([blogs, template]) {
                console.log(blogs);
                context.$element().html(template({
                    blogs: blogs
                }));
            });
    }
};