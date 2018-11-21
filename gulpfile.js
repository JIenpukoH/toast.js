const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const autoprefixer = require('autoprefixer');
const $ = gulpLoadPlugins();
const postcssAssets = require('postcss-assets');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMedia = require('postcss-custom-media');
const postcssHexrgba = require('postcss-hexrgba');
const postcssColorRgbaFallback = require('postcss-color-rgba-fallback');
const postcssCalc = require('postcss-calc');
const postcssMatches = require('postcss-selector-matches');

gulp.task('babel', () => {
    return gulp.src(['src/js/*.js'])
        //.pipe($.sourcemaps.init())
        .pipe($.babel())
      //  .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/js'));
});

gulp.task('styles', [], () => {
    return gulp.src('src/sass/{,*/}*.scss')
        .pipe($.plumber())
        //.pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.'],
        }).on('error', $.sass.logError))
        .pipe($.postcss([
            autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}),
            postcssCustomProperties(),
            postcssCalc(),
            postcssHexrgba(),
            postcssColorRgbaFallback(),
            postcssCustomMedia(),
            postcssMatches(),
        ]))
       // .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/css'));
});

gulp.task('build', ['babel', 'styles'], () => {
    return gulp.src('src/*.html')
        .pipe($.useref({searchPath: ['.tmp', '.']}))
       .pipe($.if('*.js', $.uglify().on('error', function (err) {
            console.log(err);
            this.end();
        })))
        .pipe($.if('*.css', $.minifyCss({
            compatibility: '*',
            processImport: false,
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/sass/*.scss', ['build']);
    gulp.watch('src/js/**/*.js', ['build']);
});
