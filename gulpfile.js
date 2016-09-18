const gulp = require('gulp');

const sass = require('gulp-sass');
const pug = require('gulp-pug');
const babel = require('gulp-babel');

const concat = require('gulp-concat');

const errorHandler = function(name) {
  return function(err) {
    console.error('########### ERROR ' + name.toUpperCase() + ' ############');
    // err.showStack = true;
    err.showProperties = true;
    console.error(err.toString());
    console.error('########### ERROR ' + name.toUpperCase() + ' ############');
    this.emit('end')
  };
};

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
  lib: {
    files: 'lib/**/*.*',
    dest: 'web/src/lib',
  },
};

gulp.task('sass', function() {
  return gulp.src(paths.sass.files)
    .pipe(sass())
    .on('error', errorHandler('sass'))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('pug', function() {
  return gulp.src(paths.pug.files)
    .pipe(pug({
      basedir: __dirname + '/pug',
    }))
    .on('error', errorHandler('pug'))
    .pipe(gulp.dest(paths.pug.dest));
});

gulp.task('babel', function() {
  return gulp.src(paths.babel.files)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .on('error', errorHandler('babel'))
    .pipe(gulp.dest(paths.babel.dest));
});

gulp.task('lib', function() {
  return gulp.src(paths.lib.files)
    .pipe(gulp.dest(paths.lib.dest));
});

gulp.task('build', ['sass', 'pug', 'babel', 'lib']);

gulp.task('watch', ['sass', 'pug', 'babel', 'lib'], function() {
  gulp.watch(paths.sass.watch, ['sass']);
  gulp.watch(paths.pug.watch, ['pug']);
  gulp.watch(paths.babel.watch, ['babel']);
});

gulp.task('default', ['watch']);