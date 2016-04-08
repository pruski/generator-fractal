"use strict";

var subgenFactory  = require('../../common/subgenFactory');

module.exports = subgenFactory.create({
    _context: 'ts',
    _filenamePostfix: '-component.ts',

    initializing: function () {
        this._greetings();
    },

    prompting: function () {
        var done = this.async();

        var prompts = [];

        if(!this.options.deep && !this._isSubgenQueued('ctrl')) {
            prompts.push({
                type: 'list',
                choices: ['yes', 'no'],
                name: 'ctrl',
                message: 'Do you need a Controller?',
                default: 'no'
            });
        }

        if(!this.options.deep && !this._isSubgenQueued('tpl')) {
            prompts.push({
                type: 'list',
                choices: ['yes', 'no'],
                name: 'tpl',
                message: 'Do you need a Template?',
                default: 'no'
            });
        }

        this.prompt(prompts, function (props) {
            if(props.link === 'yes') {
                this.options.linkFn = true;
            }

            if(props.ctrl === 'yes') {
                this._scheduleSubgen('ctrl');
            }

            if(props.tpl === 'yes') {
                this._scheduleSubgen('tpl');
            }

            this.log('---------------------------------');
            done();
        }.bind(this));
    },

    _getExtraTemplateVars: function() {
        return {
            link         : this.options.linkFn,
            ctrl         : this._isSubgenQueued('ctrl'),
            tpl          : this._isSubgenQueued('tpl'),
            tplFullPath  : this._fractalConfig.tplPath+ this._fractalCtxRelativePath + this._rawFilePath + '.html'
        };
    }
});