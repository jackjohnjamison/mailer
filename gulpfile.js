const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')

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

//*// Run SASS
const brandingStyles = async(path) => {
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
    gulp.watch(paths.assets.css.src, brandingStyles)
}

const watch = gulp.parallel(watchTemplates)
watch.description = 'Watching for SASS changes'

const dev = gulp.series(brandingStyles, watch)
const build = gulp.series(brandingStyles)

exports.build = build
exports.dev = dev
exports.default = dev