/**
 * Created by aholt on 1/10/17.
 */
var gulp = require('gulp');
var sass = require('gulp-dart-sass');
var rename = require('gulp-rename');
var minifyCss = require('gulp-clean-css');
var clip = require('gulp-clip-empty-files');
var del = require('del');
var flatten = require('gulp-flatten');
var sourcemaps = require("gulp-sourcemaps");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('styles:build', function() {
    return gulp.src('./web/src/stylesheets/**/*.scss')
        .pipe(clip())
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['./web/src', './web/src/stylesheets', '.']
        }))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('./build/Stylesheets'))
        .pipe(sourcemaps.init({ debug: true }))
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('../Sourcemaps/', {
            sourceMappingURL: function(file) {
                var fn = file.path.lastIndexOf('/');
                if(fn > -1 && file.path.length > ++fn) fn = file.path.substring(fn);
                else fn = file.path;
                var pathSplit = file.path.split('/');
                var tn = null;
                if(pathSplit.length > 2) {
                    tn = pathSplit[pathSplit.length - 3];
                }
                return '/_sourcemaps/' + (tn == null ? '' : tn + '/') + fn + '.map';
            }
        }))
        .pipe(flatten({includeParents: 3}))
        .pipe(gulp.dest('./build/Stylesheets'))
        ;
});
gulp.task('styles:vendor', function() {
    return gulp.src(['./bower_components/select2/dist/css/select2.css'
    ])
        .pipe(clip())
        .pipe(gulp.dest('./build/Stylesheets/vendor'))
        .pipe(sourcemaps.init({ debug: true }))
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('../../Sourcemaps', {
            sourceMappingURL: function(file) {
                var fn = file.path.lastIndexOf('/');
                if(fn > -1 && file.path.length > ++fn) fn = file.path.substring(fn);
                else fn = file.path;
                return '/_sourcemaps/' + fn + '.map';
            }
        }))
        .pipe(flatten({includeParents: 3}))
        .pipe(gulp.dest('./build/Stylesheets/vendor'))
        ;
});
gulp.task('styles:clean', gulp.series('sourcemaps:clean', function(callback) {
    del(['./build/Stylesheets']).then(function(data) {
        callback();
    });
}));

gulp.task('styles', gulp.series('styles:clean', 'styles:build'));