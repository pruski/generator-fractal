var _ = require('lodash');
var FractalBase = require('./FractalBase');

var subgenBase = {
    initializing: function () {
        this._greetings();
    },

    writing: function(){
        this._write();
    },

    end: function(){
        this._bye();
    }
};

module.exports = {
    create: function (customs) {
        return FractalBase.extend(_.extend({}, subgenBase, customs));
    }
};