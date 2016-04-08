"use strict";

var subgenFactory  = require('../../common/subgenFactory');

module.exports = subgenFactory.create({
    _context: 'ts',
    _filenamePostfix: '-component.ts',

    initializing: function () {
        this._greetings();
        this._scheduleSubgen('ctrl');
    },

    prompting: function () {
        var prompts = [];

        if(!this.options.deep && !this._isSubgenQueued('ctrl')) {
            prompts.push({
                type: 'list',
                choices: ['yes', 'no'],
                name: 'tpl',
                message: 'Do you need a Template?',
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

        if(prompts.length) {
            var done = this.async();

            this.prompt(prompts, function (props) {
                if (props.tpl === 'yes') {
                    this._scheduleSubgen('tpl');
                }

                this.log('---------------------------------');
                done();

            }.bind(this));
        }
    },

    _getExtraTemplateVars: function() {
        return {
            tpl          : this._isSubgenQueued('tpl'),
            tplFullPath  : this._fractalConfig.tplPath+ this._fractalCtxRelativePath + this._rawFilePath + '.html'
        };
    }
});