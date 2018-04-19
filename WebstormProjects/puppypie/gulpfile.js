/*CommonJS: Module belongs to Node.js*/
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename'); //rename the output files
const cleanCSS= require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');



gulp.task( 'sass', () => {   //compilation task
    return gulp.src('./src/scss/main.scss' ) //get the data
        //.pipe( sourcemaps.init()) //Depuracion de codigo
        .pipe( sass().on('error', sass.logError))
        //gulp uses pipes, the result of one process is passed to another pipe so it goes to the next process.
        //.pipe( rename ('all-styles.css'))
        //.pipe( sourcemaps.write())
        .pipe( gulp.dest( './dist/css'));
} );

gulp.task( 'default', ['sass']);





