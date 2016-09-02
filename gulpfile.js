const gulp = require('gulp');

const sass = require('gulp-sass');
const pug = require('gulp-pug');
const babel = require('gulp-babel');

const concat = require('gulp-concat');


const paths = {
  sass: {
    watch: 'sass/**/*.sass',
    files: ['sass/**/*.sass', '!sass/**/_*.sass'],
    dest: 'web/src/css',
  },
  pug: {
    watch: 'pug/**/*.pug',
    files: ['pug/**/*.pug', '!pug/**/_*.pug'],
    dest: 'web',
  },
  babel: {
    watch: 'babel/**/*.babel',
    files: ['babel/**/*.babel', '!babel/**/_*.babel'],
    dest: 'web/src/js',
  },
};

gulp.task('sass', function() {
  return gulp.src(paths.sass.files)
    .pipe(sass())
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('pug', function() {
  return gulp.src(paths.pug.files)
    .pipe(pug({
      basedir: __dirname + '/pug',
    }))
    .pipe(gulp.dest(paths.pug.dest));
});

gulp.task('babel', function() {
  return gulp.src(paths.babel.files)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.babel.dest));
});

gulp.task('build', ['sass', 'pug', 'babel']);

gulp.task('watch', ['sass', 'pug', 'babel'], function() {
  gulp.watch(paths.sass.watch, ['sass']);
  gulp.watch(paths.pug.watch, ['pug']);
  gulp.watch(paths.babel.watch, ['babel']);
});

gulp.task('default', ['watch']);