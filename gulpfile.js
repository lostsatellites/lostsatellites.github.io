var gulp 						= require('gulp'),
		sass 						= require('gulp-sass'),
		cleanCSS 				= require('gulp-clean-css'),
		sourcemaps 			= require('gulp-sourcemaps'),
		autoprefixer		= require('gulp-autoprefixer'),
		imagemin    		= require('gulp-imagemin'),
		uglify					= require('gulp-uglify'),
		include 				= require('gulp-include'),
		watch 					= require('gulp-watch'),
		browserSync 		= require('browser-sync').create(),
		reload 					= browserSync.reload;

var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Compile Sass
gulp.task('sass', function () {
	return gulp.src('scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

// Concatenate scripts
gulp.task("scripts", function() {
	gulp.src(['js/main.js'])
			.pipe(include())
			.pipe(uglify())
			.pipe(gulp.dest("dist/js/"))
});

// Compress images
gulp.task('images', function () {
	return gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.reload({stream:true}));
});

// Move fonts
gulp.task('fonts', function () {
	return gulp.src('fonts/*')
		.pipe(gulp.dest('dist/fonts'))
});

// Watch files for changes
gulp.task('watch', ['sync'], function() {
		gulp.watch('*.html', reload);
		gulp.watch('scss/**/*.scss', ['sass']);
		gulp.watch('js/*.js', reload);
		gulp.watch('img/*', ['images']);
});

// Browser Sync
gulp.task('sync', function() {
 browserSync.init({
	 proxy: "webj.dev",
	 files: "*.js,*.css,*.html,css/*css"
	});
});

gulp.task('default', ['sass', 'images', 'fonts', 'watch', 'sync']);

