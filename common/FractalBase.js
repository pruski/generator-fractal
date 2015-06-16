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

        var fileCtx = this.config.get("fileContext"),
            tplDir  = this.config.get("templatesDir");

        this.camelCasedName = _.camelCase(this.name);

        this._fractalConfig = {
            knownCtxs: Object.keys(fileCtx),
            ctxs     : fileCtx ? fileCtx : false,
            tplDir   : typeof tplDir === "string" ? tplDir : ""
        };

        this._setFractalPaths();
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

    _setFractalPaths: function () {
        var cwd             = this.env.cwd + sep,
            distPath        = cwd,
            ctxRelativePath = cwd.replace(this.destinationRoot() + sep, ''),
            tmpDistPath     = ctxRelativePath,
            contextFound    = false;

        this._fractalConfig.knownCtxs.forEach(function(ctx) {
            if(tmpDistPath.indexOf(ctx + sep) === 0) {
                contextFound = true;
                tmpDistPath = tmpDistPath.replace(ctx + sep, '');
            }
        });

        if(contextFound) {
            distPath        = this.destinationRoot() + sep + this._fractalConfig.ctxs[this._context].path + tmpDistPath;
            ctxRelativePath = tmpDistPath;
        }

        this._fractalDistPath        = distPath;
        this._fractalCtxRelativePath = ctxRelativePath;
        this._fractalCtxFound        = contextFound;
    },

    _write: function (deep) {
        this._filePath = "";

        if(deep) {
            this._filePath += this.name + sep;
        }

        this._filePath += this.name;

        this.fs.copyTpl(this.templatePath('template.ejs'), this._fractalDistPath + this._filePath + this._filenamePostfix, {
                dashedName       : this.name,
                camelCasedName   : this.camelCasedName,
                templateCacheName: (this._fractalCtxFound ? this._fractalConfig.tplDir : "") + this._fractalCtxRelativePath + this._filePath + '.html',
                ctrl             : this._subgenerators.indexOf('ctrl') > -1,
                tpl              : this._subgenerators.indexOf('tpl') > -1
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
