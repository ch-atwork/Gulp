const gulp = require('gulp');
const util = require('gulp-util');
const uglify = require('gulp-uglify');
const config = require('./config.json');
var devPath = '.';
var serverPath = '';
var env = '';
var src = function () {
  return {
    app: devPath + config.src.app.path,
    scripts: devPath + config.src.app.src + config.src.app.scripts + '/**/*.js',
    styles: devPath + config.src.app.src + config.src.app.styles + '/**/*.css',
    views: devPath + config.src.app.src + config.src.app.views + '/**/*.aspx',
    libs: devPath + config.src.lib + '/**/*.js',
    commonScripts: devPath + config.src.common + '/**/*.js',
    commonStyles: devPath + config.src.common + '/**/*.css',
    commonViews: devPath + config.src.common + '/**/*.aspx',
    componentScripts: devPath + config.src.component + '/**/*.js',
    componentStyles: devPath + config.src.component + '/**/*.css',
    componentViews: devPath + config.src.component + '/**/*.aspx',
  }
};

var dest = function () {
  return {
    app: serverPath + '/' + config.application + config.dest.app.path,
    scripts: serverPath + '/' + config.application + config.dest.app.src + config.dest.app.scripts,
    styles: serverPath + '/' + config.application + config.dest.app.src + config.dest.app.styles,
    views: serverPath + '/' + config.application + config.dest.app.src + config.dest.app.views,
    libs: serverPath + config.dest.lib,
    common: serverPath + config.dest.common,
    component: serverPath + config.dest.component
  }
};

gulp.task('default', function () {

});

gulp.task('prod', function () {

});

gulp.task('dev', ['setEnvDev', 'scripts'], function () {});

gulp.task('setEnvDev', function () {
  serverPath = "../Server/Dev"
  env = "dev";
});

gulp.task('setEnvProd', function () {
  serverPath = "../Server/Prod"
  env = "prod"
});

gulp.task('scripts', function () {
  processJS(src().scripts, dest().scripts, env);
});

gulp.task('libs', function () {
  processJS(src().libs, dest().libs, env);
});

gulp.task('commonScripts', function () {
  processJS(src().commonScripts, dest().commonScripts, env);
});

gulp.task('componentScripts', function () {
  processJS(src().componentScripts, dest().componentScripts, env);
});

gulp.task('views', function(){
  processViews(src().views, dest().views, env);
});

gulp.task('commonViews', function(){
  processViews(src().commonViews, dest().commonViews, env);
});

gulp.task('componentViews',function(){
  processViews(src().componentViews, dest().componentViews, env);
});

gulp.task('styles', function(){
  processCSS(src().styles, dest().styles, env);
});

gulp.task('commonStyles', function(){
  processCSS(src().commonStyles, dest().commonStyles, env);
});

gulp.task('componentStyles', function(){
  processCSS(src().componentStyles, dest().componentStyles, env);
});

var processViews = function (src, dest, env) {
  gulp.src(src)
    .pipe(gulp.dest(dest));
}

var processCSS = function (src, dest, env) {
  gulp.src(src)
    .pipe(gulp.dest(dest));
}

var processJS = function (src, dest, env) {
  gulp.src(src)
    .pipe(env === 'prod' ? uglify() : util.noop())
    .pipe(gulp.dest(dest));
}
