var gulp = require('gulp'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	jade = require('gulp-jade-php'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	php = require('gulp-connect-php'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

// GEt NAME FOLDER TO PACKAGE JSON
gulp.packageJson = require('./package.json');
var dist = gulp.packageJson.name;

// CLEAN
gulp.task('clean', function () {
	return gulp.src(dist, {read: false})
	.pipe(clean());
});

// COPY
// copiando folder ico para dist
gulp.task('copyico', function(){
	gulp.src('app/ico/**/*')
	.pipe(gulp.dest(dist+'/ico/'));
});

// copiando folder fonts para dist
gulp.task('copyfonts', function(){
	gulp.src('app/fonts/**/*')
	.pipe(gulp.dest(dist+'/fonts/'));
});

// TASK SASS
gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest(dist+'/css/'));
});
gulp.task('sass:watch', function () {
	gulp.watch('app/sass/**/*.sass', ['sass']);
});

// TASK JADE
gulp.task('jade', function() {
	return gulp.src('app/template/**/*.jade')
	.pipe(jade({
		locals: {
        	title: 'jade-template'
        }
	}))
	.pipe(gulp.dest(dist+'/'))
 	.on('end', browserSync.reload);
});

// TASK JS
gulp.task('js', function() {
	return gulp.src(['app/js/lib/*.js','app/js/app/*.js'])
	.pipe(concat('main.js'))
	.pipe(gulp.dest(dist+'/js/'));
});

// Concatenar js inseridos no header.php
gulp.task('jshead', function() {
	return gulp.src('app/js-head/*.js')
	.pipe(concat('main-head.js'))
	.pipe(gulp.dest(dist+'/js/'));
});

// JS DIST MINIFY
gulp.task('jsminify', function() {
	return gulp.src(['app/js/lib/*.js','app/js/app/*.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(dist+'/js/'));
});

// IMAGEMIN
gulp.task('imagemin', function () {
  	return gulp.src('app/images/**/*')
  	.pipe(imagemin({
	    progressive: true,
	    svgoPlugins: [{removeViewBox: false}],
	    use: [pngquant()]
  	}))
  	.pipe(gulp.dest(dist+'/images'))
});

// Configurações de tasks que rodarão com o reload nos arquivos assistidos
gulp.task('js-watch', ['js'], reload);
gulp.task('sass-watch', ['sass'], reload);
// gulp.task('jade-watch', ['jade'], reload);
gulp.task("watch:jade", function () {
    browserSync.watch("app/template/**/*.jade").on("change", function () {
        gulp.start("jade");
    });
});

// CONNECT PHP
gulp.task('php', function() {
	php.server({ base: dist, port: 8010, keepalive: true});
});

// BROWSERSYNC
gulp.task('browser-sync',['php'], function() {
	browserSync({
		proxy: '127.0.0.1:8010',
		port: 8080,
		open: true,
		notify: false
	});
});

// SERVER LIVERELOAD
gulp.task('serve', ['browser-sync', 'default', 'jade'], function () {
	gulp.watch("app/sass/**/*.sass",['sass-watch']);
	// gulp.watch("app/**/*.jade",['jade']);
	gulp.start("watch:jade");
	gulp.watch("app/images/**/*",['imagemin']);
	gulp.watch("app/js/**/*.js", ['js-watch']);
	// gulp.watch(dist+'/**/*.php').on('change', function () { browserSync.reload(); });
});

gulp.task('default', [
	'jade',
	'js',
	'jshead',
	'sass',
	'imagemin',
	'copyico',
	'copyfonts'
]);

gulp.task('app', [
	'jade',
	'js',
	'sass'
]);