"use strict";

var _ = require('lodash');

var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.NamedBase.extend({
    _filenamePostfix: '*placeholder*',
    _greetingText   : 'Hi there!',

    constructor: function () {
        generators.NamedBase.apply(this, arguments);

        this.option('deep'); // --deep flag


        this.camelCasedName = _.camelCase(this.name);
    },

    _greetings: function () {
        if(!this.options.deep) {
            this.log(yosay(this._greetingText));
        }
    },

    _bye: function () {
        if(!this.options.deep) {
            this.log('\n\nThanks for using Fractal!\n\n');
        }
    },

    _write: function () {
        if(this.options.deep) {
            this._filePath = this.name + '/' + this.name + this._filenamePostfix;

        } else {
            this._filePath = this.name + this._filenamePostfix;
        }

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(this._filePath),
            { camelCasedName: this.camelCasedName }
        );
    }
});
