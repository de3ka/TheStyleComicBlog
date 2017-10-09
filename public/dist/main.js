"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _blogsController=require("./app/js/controllers/blogsController.js"),_blogsController2=_interopRequireDefault(_blogsController),_usersController=require("./app/js/controllers/usersController.js"),_usersController2=_interopRequireDefault(_usersController),_searchParamsVerifier=require("./helpers/search-params-verifier.js"),_searchParamsVerifier2=_interopRequireDefault(_searchParamsVerifier),_notifier=require("./helpers/notifier.js"),_notifier2=_interopRequireDefault(_notifier);!function(){var e=Sammy("#content",function(){this.get("#/",function(){this.redirect("#/home")}),this.get("#/home",_blogsController2.default.home),this.get("#/blog/:id",_blogsController2.default.byId),this.get("#/blogs/:subcategory/:category",_blogsController2.default.allByCategoryName),this.get("#/search/category/:category",_blogsController2.default.searchCategory),this.get("#/search/subcategory/:subcategory",_blogsController2.default.searchSubCategory),this.get("#/blogs/add",_blogsController2.default.post),this.get("#/register",_usersController2.default.register),this.get("#/login",_usersController2.default.login)});$(function(){e.run("#/"),$(document).ready(function(){$("#create-post").hide(),$(document).on("click",".login-click",function(){$("#create-post").show()})}),$(document).on("mouseout",".dropdown-item",function(){$(".dropdown-item").css("background-color","#222222")}),$(document).on("click",".register-click",function(){$("#create-post").show(),$("#login").hide()}),$(document).on("click",".home-search-button",function(){var e=$("#search-input").val(),r=void 0;_searchParamsVerifier2.default.searchparamsCategory(e)?("dc"===e&&$(location).attr("href","#/search/category/"+_searchParamsVerifier2.default.capitalizeFirstTwo(e)),$(location).attr("href","#/search/category/"+_searchParamsVerifier2.default.capitalizeFirst(e))):e.includes("Comics")||e.includes("comic")||e.includes("comics")?($("#search-input").val("Comics"),r=$("#search-input").val(),$(location).attr("href","#/search/subcategory/"+r)):e.includes("Action")||e.includes("action")||e.includes("Figures")||e.includes("figures")?($("#search-input").val("Action Figures"),r=$("#search-input").val(),$(location).attr("href","#/search/subcategory/"+r)):e.includes("Graphic")||e.includes("graphic")||e.includes("Novels")||e.includes("novels")||e.includes("novel")?($("#search-input").val("Graphic Novels"),r=$("#search-input").val(),$(location).attr("href","#/search/subcategory/"+r)):(_notifier2.default.send("Invalid search request"),_notifier2.default.explain("Search params must be valid category/subcategory","warning")),$("#search-input").val("")}),$("#logout").on("click",function(){localStorage.clear(),$("#register").show(),$("#login").show(),$("#logout").hide(),$("#create-post").hide(),_notifier2.default.send("You logged out")})})}();