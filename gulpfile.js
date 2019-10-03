"use strict";

const gulp      = require("gulp");
const uglify    = require("gulp-uglify");
const babel     = require("gulp-babel");
const maps      = require("gulp-sourcemaps");
const rename    = require("gulp-rename");
const concat    = require("gulp-concat");
const sass      = require("gulp-sass");

const dirs = {
    src: "src/marky.js",
    dest: "libs"
}

gulp.task("compile-js", function() {
    return gulp.src(dirs.src)
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(maps.write(".maps"))
        .pipe(rename("marky.js"))
        .pipe(gulp.dest(dirs.dest));
});

gulp.task('compile-sass', function () {
  return gulp.src(["styles/codemirror.css", "styles/marky.css"])
    .pipe(concat("marky.min.css"))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dest'));
});

gulp.task("build", gulp.series("compile-sass", "compile-js", function() {
    return gulp.src(["libs/codemirror.js", "libs/markdown.js", "libs/marky.js"])
        .pipe(concat("marky.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dest"));
}));

gulp.task("watch", gulp.series("compile-js", "build", function() {
    gulp.watch(dirs.src, gulp.series("compile-js", "build"));
}))

gulp.task("default", gulp.series("compile-js"));
