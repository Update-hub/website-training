const { src, dest, parallel, watch, series } = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const path = {
  scss: 'src/scss/**/*.scss',
  image: 'src/images/**/*',
  static: 'static/**/*',
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

function image() {
  return src(path.image)
    .pipe(imagemin([]))
    .pipe(dest('assets/images'))
    .pipe(webp())
    .pipe(dest('assets/images'));
}

function static() {
  return src(path.static)
    .pipe(dest('assets'))
}

function watchFiles() {
  watch([path.scss], css);
  watch([path.image], image);
  watch([path.static], static);
}

const build = parallel(css, image, static);

exports.build = build;
exports.default = series(build, watchFiles);
