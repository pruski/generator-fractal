var FractalBase = require('../../common/FractalBase');

module.exports = FractalBase.extend({
    constructor: function () {
        FractalBase.apply(this, arguments);

        this.options.deep = true;
    },

    initializing: function () {
        this._greetings();
    },

    prompting: function () {
        var done = this.async();

        var prompts = [{
            type: 'list',
            choices: ['yes', 'no'],
            name: 'dir',
            message: 'Do you need a Directive?',
            default: 'yes'
        }, {
            type: 'list',
            choices: ['yes', 'no'],
            name: 'ctrl',
            message: 'Do you need a Controller?',
            default: 'yes'
        }, {
            type: 'list',
            choices: ['yes', 'no'],
            name: 'srv',
            message: 'Do you need a Service?',
            default: 'yes'
        }, {
            type: 'list',
            choices: ['yes', 'no'],
            name: 'tpl',
            message: 'Do you need a Template?',
            default: 'yes'
        }, {
            type: 'list',
            choices: ['yes', 'no'],
            name: 'less',
            message: 'Do you need a LESS file?',
            default: 'yes'
        }];

        this.prompt(prompts, function (props) {
            if(props.dir  === 'yes') {
                this._scheduleSubgen('dir');

            } else {
                this.log('---------------------------------');
            }

            if(props.ctrl === 'yes') this._scheduleSubgen('ctrl');
            if(props.srv  === 'yes') this._scheduleSubgen('srv');
            if(props.tpl  === 'yes') this._scheduleSubgen('tpl');
            if(props.less === 'yes') this._scheduleSubgen('less');

            this._scheduleSubgen('comp');

            done();
        }.bind(this));
    },

    writing: function () {
        this._releaseSubgenQueue();
    },

    end: function(){
        this._bye();
    }
});