const gulp = require('gulp')

//*// SASS includes
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')

//*// Babel & JS includes
const minify = require("gulp-babel-minify")
const babel = require('gulp-babel')
const rollup = require('gulp-rollup')

//*// Set paths
var paths = {
	assets: {
		css: {
			src: './assets/src/css/**/*.scss',
			dist: './assets/dist/css',
		},
		js: {
			src: './assets/src/js/**/*.js',
			dist: './assets/dist/js'
		}
	},
}

//*// Run Babel & minify
const processJS = () => {
	return gulp.src(paths.assets.js.src)
	.pipe(rollup({
		input: 'assets/src/js/send-mail.js',
		output: {format: 'esm'}
	}))
	.pipe(babel({
		presets: ['@babel/env']
	}))
    .pipe(minify({
		mangle: {
			keepClassName: true
		}
    }))
    .pipe(gulp.dest(paths.assets.js.dist));
}

//*// Run SASS & minify
const brandingStyles = async() => {
    return gulp.src(paths.assets.css.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
            grid: 'autoplace'
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.assets.css.dist))
}

const watchTemplates = () => {
    gulp.watch(paths.assets.css.src, brandingStyles),
    gulp.watch([paths.assets.js.src], processJS)
}

const watch = gulp.parallel(watchTemplates)
watch.description = 'Watching for SASS changes'

const dev = gulp.series(brandingStyles, processJS, watch)
const build = gulp.series(brandingStyles, processJS)

exports.build = build
exports.dev = dev
exports.default = dev