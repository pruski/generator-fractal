"use strict";

var subgenFactory  = require('../../common/subgenFactory');

module.exports = subgenFactory.create({
    _context: 'js',
    _filenamePostfix: '-directive.js',

    _getExtraTemplateVars: function() {
        return {
            ctrl             : this._subgenerators.indexOf('ctrl') > -1,
            tpl              : this._subgenerators.indexOf('tpl') > -1,
            templateCacheName: (this._fractalCtxFound ? this._fractalConfig.tplDir : "") + this._fractalCtxRelativePath + this._rawFilePath + '.html',
        };
    }
});