const autoprefixer      = require('autoprefixer');
const browserSync       = require('browser-sync').create();
const gulp              = require('gulp');
const postcss           = require('gulp-postcss');
const sass              = require('gulp-sass');
const imagemin          = require('gulp-imagemin');
const named             = require('vinyl-named');
const sourcemaps        = require('gulp-sourcemaps');
const webpack           = require('webpack-stream');


// Define settings
const config = {
  paths: {
    scripts: {
      src: 'src/js/*.js',
      dest: 'js',
    },
    styles: {
      src: './src/scss/*.scss',
      dest: 'css',
    },
    images: {
      src: 'src/img/*',
      dest: 'images',
    }
  },
  browserSync: {
    proxy: 'https://tcs.test',
    autoOpen: false,
    browsers: [
      'Google Chrome',
    ],
  }
};

// Styles Task - Dev version
function stylesDev(done) {
  gulp
    .src(config.paths.styles.src)
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 10,
      linefeed: 'lf'
    }))
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.styles.dest))
    .pipe(browserSync.stream());
  done();
}

// Styles Task - Prod version
function stylesProd(done) {
  gulp
    .src(config.paths.styles.src)
    .pipe(sass({
      outputStyle: 'compact',
      precision: 10,
      linefeed: 'lf'
    }))
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(config.paths.styles.dest));
  done();
}

function scripts(done) {
  gulp
    .src(config.paths.scripts.src)
    .pipe(named())
    .pipe(webpack({
      devtool: 'source-map',
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(config.paths.scripts.dest))
    .pipe(browserSync.stream());
  done();
}

// Image Optimization Task
function images(done) {
 gulp
   .src(config.paths.images.src)
   .pipe(imagemin())
   .pipe(gulp.dest(config.paths.images.dest));
 done();
}

// BrowserSync Task
function browserSyncWatch(done) {
  browserSync.init({
    proxy: config.browserSync.proxy,
    open: config.browserSync.autoOpen,
    browser: config.browserSync.browsers,
  });
  gulp.watch(config.paths.styles.src, stylesDev);
  gulp.watch(config.paths.scripts.src, scripts);
  done();
}

// BrowserSync Reload Task
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Define complex tasks
const compileDev = gulp.parallel(stylesDev, scripts, images);
const compileProd = gulp.parallel(stylesProd, scripts, images);

// export tasks
exports.default = gulp.series(compileDev, browserSyncWatch);
exports.prod = compileProd;
exports.js = scripts;
