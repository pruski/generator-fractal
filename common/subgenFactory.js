var _ = require('lodash');
var FractalBase = require('./FractalBase');

var subgenBase = {
    constructor: function () {
        FractalBase.apply(this, arguments);

        this.option('deep'); // --deep flag
    },

    initializing: function () {
        this._greetings();
    },

    writing: function(){
        this._write(this.options.deep);

        if(typeof this._postWriting === 'function') {
            this._postWriting();
        }
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