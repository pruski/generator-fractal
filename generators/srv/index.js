"use strict";

var subgenFactory  = require('../../common/subgenFactory');

module.exports = subgenFactory.create({
    _context: 'ts',
    _filenamePostfix: '-service.ts',

    initializing: function () {
        this._greetings();

        if(this._fractalConfig.unitTests) {
            this._scheduleSubgen('tsrv');
        }
    }
});