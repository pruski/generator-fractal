"use strict";

var _ = require('lodash');

var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.NamedBase.extend({
    _filenamePostfix: '*placeholder*',
    _greetingText   : 'Hi there!',
    _subgenerators  : [],


    constructor: function(preventDefaultFlags) {
        generators.NamedBase.apply(this, arguments);

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

    _write: function (deep) {
        if(deep) {
            this._filePath = this.name + '/' + this.name + this._filenamePostfix;

        } else {
            this._filePath = this.name + this._filenamePostfix;
        }

        this.fs.copyTpl(this.templatePath('template.js'), this.destinationPath(this._filePath), {
                dashedName       : this.name,
                camelCasedName   : this.camelCasedName,
                templateCacheName: 'templates/' + this.name,
                ctrl             : this._subgenerators.indexOf('ctrl') > -1
            }
        );
    },

    _subgenerator: function(subgeneratorName, content) {
        var done = this.async();
        var opts = {
            deep: true
        };

        if(content) {
            opts.content = content;
        }

        this.invoke("fractal:" + subgeneratorName, {args: [this.name], options: opts}, function(){
            done();
        });
    }
});
