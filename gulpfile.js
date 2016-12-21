var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var all = require('gulp-all');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;

var uglify = require('gulp-uglify');
var pump = require('pump');

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath).mode
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});

gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
    ]).then(function () {
        done();
    });
});

gulp.task('copy', [
    'copy:.htaccess',
    'copy:requirejs',
    'copy:jquery',
    'copy:bootstrap',
    'copy:font-awesome',
    'copy:clipboard',
    'copy:license',
    'copy:img',
    'copy:css',
    'copy:misc',
    'copy:normalize'
]);

gulp.task('copy:.htaccess', function () {
    return gulp.src('node_modules/apache-server-configs/dist/.htaccess')
               .pipe(plugins.replace(/# ErrorDocument/g, 'ErrorDocument'))
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
               .pipe(plugins.rename('jquery-' + pkg.devDependencies.jquery + '.min.js'))
               .pipe(gulp.dest(dirs.dist + '/js/vendor'));
});

gulp.task('copy:font-awesome', function() {
   return all(
        gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
            .pipe(gulp.dest(dirs.dist + '/js/vendor/font-awesome/css')),
        gulp.src(['node_modules/font-awesome/fonts/*'])
            .pipe(gulp.dest(dirs.dist + '/js/vendor/font-awesome/fonts'))
   ) ;
});

gulp.task('copy:requirejs', function() {
    return all(
        gulp.src(['node_modules/requirejs/require.js'])
            .pipe(uglify())
            .pipe(plugins.rename('require.min.js'))
            .pipe(gulp.dest(dirs.dist + '/js/vendor/requirejs')),
        gulp.src([dirs.src + '/js/require.config.js'])
            .pipe(plugins.replace(/{{JQUERY_VERSION}}/g, pkg.devDependencies.jquery))
            .pipe(uglify())
            .pipe(gulp.dest(dirs.dist + '/js'))
    );
});

gulp.task('copy:bootstrap', function () {
    return all(
        gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest(dirs.dist + '/js/vendor/bootstrap/css')),
        gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js'])
            .pipe(uglify())
            .pipe(plugins.rename('bootstrap.min.js'))
            .pipe(gulp.dest(dirs.dist + '/js/vendor/bootstrap/js')),
        gulp.src(['node_modules/bootstrap/dist/fonts/*'])
            .pipe(gulp.dest(dirs.dist + '/js/vendor/bootstrap/fonts'))
    );
});

gulp.task('copy:clipboard', function () {
    return gulp.src('node_modules/clipboard/dist/clipboard.min.js')
        .pipe(gulp.dest(dirs.dist + '/js/vendor/clipboard'));
});

gulp.task('copy:license', function () {
    return gulp.src('LICENSE.txt')
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:img', function () {
    return gulp.src(dirs.src + '/img/**/*')
        .pipe(gulp.dest(dirs.dist + "/img"));
});

gulp.task('copy:css', function () {

    var banner = '/*! HTML5 Boilerplate v' + pkg.version +
                    ' | ' + pkg.license.type + ' License' +
                    ' | ' + pkg.homepage + ' */\n\n';

    return gulp.src(dirs.src + '/css/**/*.css')
               .pipe(plugins.header(banner))
               .pipe(plugins.autoprefixer({
                   browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
                   cascade: false
               }))
               .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('copy:misc', function () {
    return gulp.src([

        // Copy all files
        dirs.src + '/**/*',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!' + dirs.src + '/img/**/*',
        '!' + dirs.src + '/css/**/*.css',
        '!' + dirs.src + '/js/**/*.js'
    ], {

        // Include hidden files by default
        dot: true

    })
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:normalize', function () {
    return gulp.src('node_modules/normalize.css/normalize.css')
               .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        dirs.src + '/js/*.js',
        dirs.test + '/*.js'
    ]).pipe(plugins.jscs())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src([dirs.src + '/js/**/*.js', '!' + dirs.src + '/js/require.config.js']),
            uglify(),
            gulp.dest(dirs.dist + "/js")
        ],
        cb
    );
});

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
    done);
});

gulp.task('build', function (done) {
    runSequence(
        ['clean', 'lint:js'],
        'compress',
        'copy',
    done);
});

gulp.task('default', ['build']);
