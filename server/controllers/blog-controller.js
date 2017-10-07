"use strict";
module.exports = function(data) {
    return {
        create(req, res) {
            let blogPost = {
                title: req.body.title,
                article: req.body.article,
                image: req.body.image || "Not Provided",
                category: req.body.category,
                subcategory: req.body.subcategory,
                postedBy: req.body.postedBy,
                postedOn: req.body.postedOn,
                tags: req.body.tags,
                comments: req.body.comments
            };
            data.blogData.create(blogPost)
                .then(blog => {
                    if (!blog) {
                        res.status(404).json("Blog not created!");
                    }
                    res.status(201).json(blog);
                }).catch(err => res.status(500).json(err));
        },

        getAll(req, res) {
            data.blogData.all()
                .then(blogs => {
                    res.status(200).json(blogs);
                }).catch((err) => res.status(500).json(err, "Blogs not found"));
        },

        getById(req, res) {
            data.blogData.getById(req.params.id)
                .then(blog => {
                    if (!blog) {
                        res.status(404).json("Invalid ID");
                    }
                    res.status(200).json({ blog });
                }).catch((err) => res.status(500).json(err, "Blog not found"));
        },

        addComment(req, res) {
            let comment = {
                postedBy: req.body.postedBy,
                postedOn: req.body.postedOn,
                content: req.body.content
            };

            data.blogData.addComment(req.params.id, comment)
                .then(blog => {
                    if (!blog) {
                        res.status(400).json("Comments not added!");
                    }
                    res.status(200);

                });
        },

        listNewest(req, res) {
            data.blogData.sortByNewlyCreated()
                .then(blogs => {
                    res.status(200).json(blogs);
                }).catch((err) => res.status(500).json(err, "Blogs not found"));
        },

        listBlogsByCategoryByName(req, res) {
            data.blogData.getCategoryByName(req.params.subcategory, req.params.category)
                .then(blogs => {
                    res.status(200).json(blogs);
                }).catch((err) => res.status(500).json(err, "Blogs not found"));
        },

        searchBlogsCategory(req, res) {
            data.blogData.getSearchBlogsCategory(req.params.category)
                .then(blogs => {
                    res.status(200).json(blogs);
                }).catch((err) => res.status(500).json(err, "Blogs not found"));
        },

        searchBlogsSubCategory(req, res) {
            data.blogData.getSearchBlogsSubcategory(req.params.subcategory)
                .then(blogs => {
                    res.status(200).json(blogs);
                }).catch((err) => res.status(500).json(err, "Blogs not found"));
        },

        getAllBlogsPagination(req, res) {
            const page = +req.query.page || 0;
            const size = +req.query.size || 10;

            data.blogData.allWithPagination(page, size)
                .then(([blogs, pageCount]) => {
                    if (pageCount < page) {
                        return res.redirect(`/blogs?page=${pageCount - 1}&size=${size}`);
                    }

                    let pageCountArr = [];
                    let pagecountLength = +pageCount;
                    for (let i = 1; i <= pagecountLength; i++) {
                        pageCountArr.push(i);
                    }

                    const pagination = {
                        active: +pageCount > 1,
                        pageCount: pageCount,
                        pageCountArray: [],
                        pageSize: size,
                        previous: {
                            active: +page > 0,
                            value: +page - 1
                        },
                        next: {
                            active: +page < +pageCount - 1,
                            value: +page + 1
                        }
                    };
                    pagination.pageCountArray.push(...pageCountArr);

                    return res.status(200).json({
                        result: {
                            blogs,
                            pagination
                        }
                    });
                }).catch((err) => res.status(500).json(err, "Blogs not found"));
        }

    };
};