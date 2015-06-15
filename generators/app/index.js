var FractalBase = require('../../common/FractalBase');

module.exports = FractalBase.extend({
    _context: 'js',
    _filenamePostfix: '-module.js',

    constructor: function () {
        FractalBase.apply(this, arguments);
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
            if(props.ctrl === 'yes') this._subgenerators.push('ctrl');
            if(props.dir  === 'yes') this._subgenerators.push('dir');
            if(props.srv  === 'yes') this._subgenerators.push('srv');
            if(props.tpl  === 'yes') this._subgenerators.push('tpl');
            if(props.less === 'yes') this._subgenerators.push('less');

            this.log('---------------------------------');
            done();
        }.bind(this));
    },

    writing: function () {
        this._write(true);

        this._subgenerators.forEach(function (subgeneratorName) {
            this._subgenerator(subgeneratorName);

        }, this);
    },

    end: function(){
        this._bye();
    }
});