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
    css: {
        src: './asset-src/css/**/*.scss',
        dist: './dist/assets/css',
    },
    js: {
        src: './asset-src/js/**/*.js',
        dist: './dist/assets/js'
    }
}

//*// Run Babel & minify
const processJS = () => {
	return gulp.src(paths.js.src)
	.pipe(rollup({
		input: 'asset-src/js/send-mail.js',
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
    .pipe(gulp.dest(paths.js.dist));
}

//*// Run SASS & minify
const brandingStyles = async() => {
    console.log('running')
    return gulp.src(paths.css.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
            grid: 'autoplace'
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.css.dist))
}

const watchTemplates = () => {
    gulp.watch(paths.css.src, brandingStyles),
    gulp.watch([paths.js.src], processJS)
}

const watch = gulp.parallel(watchTemplates)
watch.description = 'Watching for changes'

const dev = gulp.series(brandingStyles, processJS, watch)
const build = gulp.series(brandingStyles, processJS)

exports.build = build
exports.dev = dev
exports.default = dev