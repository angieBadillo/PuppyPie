/*CommonJS: Module belongs to Node.js*/
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename'); //rename the output files
const cleanCSS= require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const util = require ('util');



gulp.task( 'sass', () => {   //compilation task
    return gulp.src('./src/scss/main.scss' ) //get the data
        //.pipe( sourcemaps.init()) //Depuracion de codigo
        .pipe( sass().on('error', sass.logError))
        //gulp uses pipes, the result of one process is passed to another pipe so it goes to the next process.
        //.pipe( rename ('all-styles.css'))
        //.pipe( sourcemaps.write())
        .pipe( gulp.dest( './dist/css'));
} );

gulp.task( 'watch', () => {
   watch( './src/scss/**/*.scss', ( file ) => {
       util.log( 'SCSS file changed: ', file.path);
       gulp.start( 'sass', function() {

       }).on( 'error', ( error ) => {
           util.log( util.colors.red( 'Error' ), error.message );
       });
   });

});

gulp.task( 'build', [ 'saas' ] );
gulp.task( 'default', ['sass', 'watch']);





