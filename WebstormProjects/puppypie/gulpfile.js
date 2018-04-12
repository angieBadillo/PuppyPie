//CommonJS: Node.js Modules

const gulp = requiere('gulp');
const sass = requiere('gulp-sass');

gulp.task( 'sass', function(){
    return gulp.src('./src/scss/main.scss')
        .pipe( sass().on('error', sass.logError))
        .pipe( gulp.dest( './dist/scss' ));
});