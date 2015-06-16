"use strict";

var subgenFactory  = require('../../common/subgenFactory');

module.exports = subgenFactory.create({
    _context: 'js',
    _filenamePostfix: '-controller.js',

    initializing: function () {
        this._greetings();

        if(this._fractalConfig.unitTests) {
            this._scheduleSubgen('tctrl');
        }
    }
});