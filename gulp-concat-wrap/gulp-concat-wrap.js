/**
 * Created by marcin on 23/11/15.
 */
var through = require('through2');
var gutil = require('gulp-util');


var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-concat-wrap';


var contents ='';
var outFile = '';

function gulpConcatWrap(params) {
    if (!params['prefix'] || !params['suffix']) {
        throw new PluginError(PLUGIN_NAME, 'Missing prefix or suffix text!');
    }
    if (!params['name']) {
        throw new PluginError(PLUGIN_NAME, 'Missing output file name!');
    }
    outFile = params['name'];
    prefixText = new Buffer(params['prefix']);
    suffixText = new Buffer(params['suffix']);

    contents = contents+prefixText;

    var data = function(file, enc, callback) {
        contents = contents + '\n' + file.contents;
        callback();
    };

    var flush = function(callback) {
        contents = contents + '\n' + suffixText;

        var vinylFile = new gutil.File({
            base: __dirname,
            cwd: __dirname,
            path: __dirname + '/' + outFile,
            contents: new Buffer(contents)
        });
        this.push(vinylFile);
        callback();
    };
    return through.obj(data, flush);
}

module.exports = gulpConcatWrap;