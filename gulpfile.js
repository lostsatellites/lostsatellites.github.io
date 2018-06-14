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
	return gulp.src('source/scss/style.scss')
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
	gulp.src(['source/js/main.js'])
			.pipe(include())
			.pipe(uglify())
			.pipe(gulp.dest("dist/js/"))
});

// Compress images
gulp.task('images', function () {
	return gulp.src('source/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.reload({stream:true}));
});

// Move fonts
gulp.task('fonts', function () {
	return gulp.src('source/fonts/*')
		.pipe(gulp.dest('dist/fonts'))
});

// Move files
var filesToMove = [
		'source/**/*.html',
		'source/work/**/*.*'
	];

gulp.task('files', function() {
	gulp.src(filesToMove, { base: 'source/' })
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});

// Watch files for changes
gulp.task('watch', ['sync'], function() {
		gulp.watch('source/**/*.html', reload);
		gulp.watch('source/scss/**/*.scss', ['sass']);
		gulp.watch('source/js/*.js', reload);
		gulp.watch('source/img/*', ['images']);
});

// Browser Sync
gulp.task('sync', function() {
	browserSync.init({
		server: ['source', 'dist']
	});
});

gulp.task('default', ['sass', 'images', 'fonts', 'files', 'watch', 'sync']);

