const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');

const path = {
  scss: 'src/scss/**/*.scss'
}

function css() {
  return src(path.scss)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('assets'));
}

function watchFiles() {
  watch([path.scss], css);
}

const build = parallel(watchFiles, css);

exports.default = build;
