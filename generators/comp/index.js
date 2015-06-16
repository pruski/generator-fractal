"use strict";

var subgenFactory = require('../../common/subgenFactory');

module.exports = subgenFactory.create({
    _context: 'js',
    _filenamePostfix: '-module.js',

    _postWriting: function () {
        this._injectNewModule();
    },

    _getInjectionIdx: function (content) {
        return content.indexOf(']);') - 1;
    },

    _getInjectionData: function(content, injectionIndex) {
        var injectionData = {
            index: injectionIndex,
            content: ''
        };

        if (content.charAt(injectionData.index - 1) === "'") {
            injectionData.content += ',\n';
        }

        injectionData.content += "    '" + this.camelCasedName + "'";

        return injectionData;
    }
});









