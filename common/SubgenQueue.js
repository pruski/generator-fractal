module.exports = {
    _subqueue: [],

    _scheduleSubgen: function (subgenName) {
        if(!this._isSubgenQueued(subgenName)) {
            this._subqueue.push({name: subgenName, executed: false});
        }
    },

    _isSubgenQueued: function(subgenName) {
        return !this._subqueue.reduce(function(notQueued, subgen) {
            return notQueued && subgen.name !== subgenName;
        }, true);
    },

    _releaseSubgenQueue: function () {
        var pending = this._subqueue.filter(function(subgen) {
            return !subgen.executed;
        });

        if(pending.length > 0) {
            pending[0].executed = true;
            this._invoke(pending[0].name);
        }
    },

    _invoke: function(subgeneratorName) {
        this.composeWith('fractal:' + subgeneratorName, { args: [this.name], options: this.options});
    }
};