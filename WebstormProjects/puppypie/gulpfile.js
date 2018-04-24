/*CommonJS: Module belongs to Node.js*/
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename'); //rename the output files
const cleanCSS= require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const util = require ('util');
const fileinclude = require('gulp-file-include');


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

//Task to generate static pages from a template
gulp.task( 'file-include', () => {
    gulp.src(['./src/pages/wrappers/*.include.html'])
        .pipe(fileinclude({
            prefix : '@@',
            basepath: '@file'
        }))
        .pipe(rename((path) => {
            path.dirname += '/';
            path.basename = path.basename.replace(".include", "");
            path.extname = ".html"
        }))
        .pipe( gulp.dest( './dist/pages' ));
});

//Watch for changes in pages

gulp.task( 'watch', () => {
    watch( './src/pages/**/*.html', ( file ) => {
        util.log( 'HTML file changed: ', file.path);
        gulp.start( 'file-include', function() {

        }).on( 'error', ( error ) => {
            util.log( util.colors.red( 'Error' ), error.message );
        });
    });

});

//Copy static assets (images)
gulp.task( 'copy-assets', () => {
    return gulp.src('./src/img/*.png')
        .pipe( gulp.dest('./dist/img'));

});



gulp.task( 'build', [ 'file-include','saas' ] );
gulp.task( 'default', ['watch', 'build']);





