var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');

/**
 * Bumping version
 */
function inc(importance) {
    return gulp.src(['./package.json', 'frontend', 'backend'])
        .pipe(bump({ type: importance }))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('Bumps for new ' + importance + ' release.'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
}

gulp.task('patch', function() {
    return inc('patch');
});
gulp.task('feature', function() {
    return inc('minor');
});
gulp.task('release', function() {
    return inc('major');
});
