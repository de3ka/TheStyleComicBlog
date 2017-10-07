/*globals $ */
"use strict";
import templates from "../../../helpers/templates.js";
import notifier from "../../../helpers/notifier.js";
import data from "../data/blogs-data.js";

export default {
    home: function(context) {
        Promise.all([data.all(), templates.load("home")])
            .then(function([blogs, template]) {
                context.$element().html(template({
                    blogs: blogs
                }));
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
    }
};