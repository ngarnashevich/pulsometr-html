const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const fileinclude = require("gulp-file-include");
const del = require("del");

// Task for HTML
gulp.task("html", function (callback) {
	return gulp
		.src("./src/html/pages/*.html")
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "HTML include",
						sound: false,
						message: err.message
					};
				})
			})
		)
		.pipe(fileinclude({ prefix: "@@" }))
		.pipe(gulp.dest("./build/"))
		.pipe(browserSync.stream());
	callback();
});

// Task for  SCSS in CSS
gulp.task("scss", function (callback) {
	return gulp
		.src("./src/scss/main.scss")
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "Styles",
						sound: false,
						message: err.message
					};
				})
			})
		)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 4 versions"]
			})
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./build/css/"))
		.pipe(browserSync.stream());
	callback();
});

// Copy Images
gulp.task("copy:img", function (callback) {
	return gulp.src("./src/img/**/*.*").pipe(gulp.dest("./build/img/"));
	callback();
});

// Copy JS
gulp.task("copy:js", function (callback) {
	return gulp.src("./src/js/**/*.*").pipe(gulp.dest("./build/js/"));
	callback();
});

// Copy Fonts
gulp.task("copy:fonts", function (callback) {
	return gulp.src("./src/fonts/**/*.*").pipe(gulp.dest("./build/fonts/"));
	callback();
});

// Watch for HTML and CSS and reload browser
gulp.task("watch", function () {
	// Watch for js and image files
	watch(
		["./build/js/**/*.*", "./build/img/**/*.*"],
		gulp.parallel(browserSync.reload)
	);

	// Watch for SCSS and compile  
	watch("./src/scss/**/*.scss", function () {
		setTimeout(gulp.parallel("scss"), 500);
	});

	// Watch for html build
	watch("./src/html/**/*.html", gulp.parallel("html"));

	// Watch for images and js, fonts files and copy to the build directory
	watch("./src/img/**/*.*", gulp.parallel("copy:img"));
	watch("./src/js/**/*.*", gulp.parallel("copy:js"));
	watch("./src/fonts/**/*.*", gulp.parallel("copy:fonts"));
});

// Task for start server in folder src
gulp.task("server", function () {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
});

gulp.task("clean:build", function () {
	return del("./build");
});

// Default Task
// start task server and watch
gulp.task(
	"default",
	gulp.series(
		gulp.parallel("clean:build"),
		gulp.parallel("scss", "html", "copy:img", "copy:js", "copy:fonts"),
		gulp.parallel("server", "watch")
	)
);
