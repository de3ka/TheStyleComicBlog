let gulp = require("gulp"),
    gulpSync = require("gulp-sync")(gulp),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    minify = require("gulp-minify"),
    cleanCSS = require("gulp-clean-css"),
    babel = require("gulp-babel"),
    eslint = require("gulp-eslint");

gulp.task("scripts", () => {
    return gulp.src(["app/**/*.js", "helpers/*.js", "main.js", "!node_modules/**", "!bower_components/**"])
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(concat("all.js"))
        .pipe(minify())
        .pipe(gulp.dest("dist/"));
});

gulp.task("clean", () => {
    gulp.src("dist", { read: false })
        .pipe(clean());
});

gulp.task("lint:js", () => {
    return gulp.src(["app/**/*.js", "!node_modules/**", "!bower_components/**", "!build/**", "!dist/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("css", () => {
    return gulp
        .src(["app/css/**/*.css"])
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"));
});
gulp.task("lint", ["lint:js"]);

gulp.task("build", gulpSync.sync(["clean", "scripts", "css"]));

gulp.task("default", () => {
    gulp.start("build");
});