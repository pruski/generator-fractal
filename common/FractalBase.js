"use strict";

var _     = require('lodash');
var fs    = require('fs');
var sep   = require('path').sep;
var chalk = require('chalk');

var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.NamedBase.extend({
    _filenamePostfix: '.js',
    _greetingText   : 'Hi there!           Let\'s get started!',
    _context        : 'js',
    _subgenerators  : [],

    constructor: function(preventDefaultFlags) {
        generators.NamedBase.apply(this, arguments);

        var fileCtx   = this.config.get("fileContext"),
            tplDir    = this.config.get("templatesDir"),
            unitTests = this.config.get("unitTests");

        this.camelCasedName = _.camelCase(this.name);

        this._fractalConfig = {
            knownCtxs: fileCtx ? Object.keys(fileCtx) : [],
            ctxs     : fileCtx ? fileCtx : false,
            tplDir   : typeof tplDir === "string" ? tplDir : "",
            unitTests: typeof unitTests === "boolean" ? unitTests : false
        };

        this._setFractalPaths();
    },

    _greetings: function () {
        if(!this.options.yosay) {
            this.options.yosay = true;
            this.log(yosay(this._greetingText));
        }
    },

    _bye: function () {
        if(!this.options.bye) {
            this.options.bye = true;
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

        this._rawFilePath = "";

        if(this.options.deep) {
            this._rawFilePath += this.name + sep;
        }

        this._rawFilePath += this.name;
        this._filePath = this._fractalDistPath + this._rawFilePath + this._filenamePostfix;
    },

    _write: function () {
        this.fs.copyTpl(this.templatePath('template.ejs'), this._filePath, this._getTemplateVars());
    },

    _scheduleSubgen: function (subgenName) {
        if(!this._isSubgenQueued(subgenName)) {
            this._subgenerators.push({name: subgenName, executed: false});
        }
    },

    _isSubgenQueued: function(subgenName) {
        return !this._subgenerators.reduce(function(notQueued, subgen) {
            return notQueued && subgen.name !== subgenName;
        }, true);
    },

    _releaseSubgenQueue: function () {
        var pending = this._subgenerators.filter(function(subgen) {
            return !subgen.executed;
        });

        if(pending.length > 0) {
            pending[0].executed = true;
            this._subgenerator(pending[0].name);
        }
    },

    _subgenerator: function(subgeneratorName) {
        this.composeWith('fractal:' + subgeneratorName, { args: [this.name], options: this.options});
    },

    _getTemplateVars: function () {
        var tplVars = {
            dashedName       : this.name,
            camelCasedName   : this.camelCasedName
        };

        if(typeof this._getExtraTemplateVars === 'function') {
            tplVars = _.extend(tplVars, this._getExtraTemplateVars());
        }

        return tplVars;
    },

    _injectNewModule: function () {
        var parentModulePath,
            splittedPath = this._fractalDistPath.split(sep).filter(function (dir) {
                return dir.length > 0;
            });

        if(splittedPath[splittedPath.length - 1] === this.name) {
            splittedPath.pop();
        }

        parentModulePath = sep + splittedPath.join(sep)+ sep + splittedPath[splittedPath.length - 1] + this._filenamePostfix;

        if(fs.existsSync(parentModulePath)) {
            this._injectDependency(parentModulePath);
        }
    },

    _injectDependency: function (parentModulePath) {
        var content       = fs.readFileSync(parentModulePath, "utf8").trim(),
            injectionData = this._getInjectionData(content, this._getInjectionIdx(content)),
            feedback      = '   ' + chalk.green.bold(this.camelCasedName) + ' ' + chalk.green('have been injected into ' + parentModulePath.replace(this.destinationRoot(), ''))

        this.conflicter.force = true;
        fs.writeFileSync(parentModulePath, content.slice(0, injectionData.index) + injectionData.content + content.slice(injectionData.index));
        this.log(feedback);
    }
});
