/**
 * Created by marcin on 23/11/15.
 */
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('should');
var File = require('gulp-util').File;
var gulp = require('gulp');

var streamFromArray = require('stream-from-array');


var gulpConcatWrap = require('../gulp-concat-wrap/gulp-concat-wrap.js');

describe('concatWrap', function() {

    it('should throw, when prefix or suffix  arguments is missing', function () {
        function missingArgument() {
            gulpConcatWrap({prefix: '//prefix'});
        } expect(missingArgument).to.throw('Missing prefix or suffix text!');
    });
    it('should throw, when output file name is not defined', function () {
        function missingArgument() {
            gulpConcatWrap({prefix: '//prefix', suffix: '//suffix'});
        } expect(missingArgument).to.throw('Missing output file name!');
    });

    it('should concat files and add prefix and suffix text', function(done) {
        var expectedValue = '//prefix\ninput file 1\ninput file 2\n//suffix';
        var testFile_1 = new File({
            base: __dirname,
            cwd: __dirname,
            path: __dirname + '/' + 'test/file.js',
            contents: new Buffer('input file 1')
        });
        var testFile_2 = new File({
            base: __dirname,
            cwd: __dirname,
            path: __dirname + '/' + 'test/file.js',
            contents: new Buffer('input file 2')
        });

         streamFromArray.obj([testFile_1, testFile_2])
         .pipe(gulpConcatWrap({name:'file.js', prefix:'//prefix', suffix: '//suffix'}))
         .on('data', function(file) {
            expect(String(file.contents)).to.eq(expectedValue);
            done();

         });
    });
});