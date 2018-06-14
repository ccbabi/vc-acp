const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('default', () => {
  return gulp.src('src/acp.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename({
      basename: 'vc-acp'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
})
