const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require("browser-sync").create();

function buildStyles() {
  return src('sass/**/*.scss')
    .pipe(sass())
    .pipe(dest('./src/css'))
    .pipe(browserSync.stream());
}

function watchTask() {
  browserSync.init({
        server :{
            baseDir: "./"
        }
  });
  watch(['sass/**/*.scss'], buildStyles);
  watch("./*.html").on("change", browserSync.reload);
  watch("./src/**/*.js").on("change", browserSync.reload);
}

exports.default = series(buildStyles, watchTask)