"use strict";

var _ = require('lodash');
var sep = require('path').sep;

var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.NamedBase.extend({
    _filenamePostfix: '.js',
    _greetingText   : 'Hi there!',
    _context        : 'js',
    _subgenerators  : [],

    constructor: function(preventDefaultFlags) {
        generators.NamedBase.apply(this, arguments);

        var fileCtx = this.config.get("fileContext");

        this.camelCasedName = _.camelCase(this.name);

        this._fractalConfig = {
            knownCtxs: Object.keys(fileCtx),
            ctxs: fileCtx ? fileCtx : false
        };

        this._fractalDistPath = this._getDistPath();
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

    _getDistPath: function () {
        var tmpDistPath  =  this.env.cwd.replace(this.destinationRoot() + sep, ''),
            contextFound = false;

        this._fractalConfig.knownCtxs.forEach(function(ctx) {
            if(tmpDistPath.indexOf(ctx + sep) === 0) {
                contextFound = true;
                tmpDistPath = tmpDistPath.replace(ctx + sep, '');
            }
        });

        if(contextFound) {
            return this.destinationRoot() + sep + this._fractalConfig.ctxs[this._context].path + sep + tmpDistPath + sep;

        } else {
            return this.env.cwd;
        }
    },

    _write: function (deep) {
        this._filePath = this._fractalDistPath + sep;

        if(deep) {
            this._filePath += this.name + sep;
        }

        this._filePath += this.name + this._filenamePostfix;

        this.fs.copyTpl(this.templatePath('template.ejs'), this._filePath, {
                dashedName       : this.name,
                camelCasedName   : this.camelCasedName,
                templateCacheName: 'templates/' + this.name,
                ctrl             : this._subgenerators.indexOf('ctrl') > -1
            }
        );
    },

    _subgenerator: function(subgeneratorName, content) {
        var opts = {
            deep: true
        };

        if(content) {
            opts.content = content;
        }

        this.composeWith('fractal:' + subgeneratorName, { args: [this.name], options: opts});
    }
});
