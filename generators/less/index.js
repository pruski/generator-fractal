"use strict";

var subgenFactory  = require('../../common/subgenFactory');

module.exports = subgenFactory.create({
    _context: 'css',
    _filenamePostfix: '.less',

    _postWriting: function () {
        this._injectNewModule();
    },

    _getInjectionIdx: function (content) {
        return content.length - 1;
    },

    _getInjectionData: function(content, injectionIndex) {
        var injectionData = {
            index: injectionIndex,
            content: ''
        };

        if (content.charAt(injectionData.index) === "}") {
            injectionData.index -= 1;
            injectionData.content += '\n    ';

        } else {
            injectionData.index += 1;
            injectionData.content += '\n';
        }

        injectionData.content += "@import '" + this.name + '/' + this.name + "';";

        return injectionData;
    }
});