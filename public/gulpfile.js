let gulp = require("gulp"),
    gulpSync = require("gulp-sync")(gulp),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    minify = require("gulp-minify"),
    cleanCSS = require("gulp-clean-css"),
    babel = require("gulp-babel"),
    eslint = require("gulp-eslint"),
    pump = require("pump"),
    browserify = require("gulp-browserify"),
    uglify = require("gulp-uglify");


gulp.task("compileControllers:js", () => {
    return gulp.src(["./app/js/controllers/*.js",
            "!node_modules/**",
            "!bower_components/**"
        ])
        .pipe(babel({ presets: ["es2015"] }))
        .pipe(gulp.dest("./tmp/js/controllers"));
});

gulp.task("compileData:js", () => {
    return gulp.src(["./app/js/data/*.js",
            "!node_modules/**",
            "!bower_components/**"
        ])
        .pipe(babel({ presets: ["es2015"] }))
        .pipe(gulp.dest("./tmp/js/data"));
});

gulp.task("compileHelpers:js", () => {
    return gulp.src(["helpers/*.js",
            "!node_modules/**",
            "!bower_components/**"
        ])
        .pipe(babel({ presets: ["es2015"] }))
        .pipe(gulp.dest("./tmp/js/helpers"));
});

gulp.task("compileMain:js", () => {
    return gulp.src(["main.js",
            "!node_modules/**",
            "!bower_components/**"
        ])
        .pipe(babel({ presets: ["es2015"] }))
        .pipe(gulp.dest("./tmp"));
});

gulp.task("minify:css", () => {
    return gulp.src(["./app/css/*.css"])
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("minifyControllers:js", ["compileControllers:js"], () => {
    return pump([
        gulp.src("./tmp/js/controllers/*.js"),
        uglify(),
        gulp.dest("./dist/app/js/controllers")
    ]);
});

gulp.task("minifyData:js", ["compileData:js"], () => {
    return pump([
        gulp.src("./tmp/js/data/*.js"),
        uglify(),
        gulp.dest("./dist/app/js/data")
    ]);
});
gulp.task("minifyHelpers:js", ["compileHelpers:js"], () => {
    return pump([
        gulp.src("./tmp/js/helpers/*.js"),
        uglify(),
        gulp.dest("./dist/helpers")
    ]);
});

gulp.task("minifyMain:js", ["compileMain:js"], () => {
    return pump([
        gulp.src("./tmp/*.js"),
        uglify(),
        gulp.dest("./dist")
    ]);
});

gulp.task("build", ["minify:css", "minifyControllers:js", "minifyData:js", "minifyHelpers:js", "minifyMain:js"], () => {});