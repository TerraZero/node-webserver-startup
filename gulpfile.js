const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

const paths = {
  sass: {
    watch: 'sass/**/*.sass',
    files: 'sass/**/*.sass',
    dest: 'web/src/css',
  },
  pug : {
    watch: 'pug/**/*.pug',
    files: 'pug/**/*.pug',
    dest: 'web',
  },
};

gulp.task('sass', function() {
  return gulp.src(paths.sass.files)
    .pipe(sass())
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('pug', function() {
  return gulp.src(paths.pug.files)
    .pipe(pug())
    .pipe(gulp.dest(paths.pug.dest));
});

gulp.task('build', ['sass', 'pug']);

gulp.task('watch', ['sass', 'pug'], function() {
  gulp.watch(paths.sass.watch, ['sass']);
  gulp.watch(paths.pug.watch, ['pug']);
});

gulp.task('default', ['watch']);