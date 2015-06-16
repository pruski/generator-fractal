"use strict";

var fs            = require('fs');
var chalk         = require('chalk');
var sep           = require('path').sep;
var subgenFactory  = require('../../common/subgenFactory');

module.exports = subgenFactory.create({
    _context: 'css',
    _filenamePostfix: '.less',

    _postWriting: function () {
        var parentModulePath,
            splittedPath = this._fractalDistPath.split(sep).filter(function (dir) {
                return dir.length > 0;
            });

        if(splittedPath[splittedPath.length - 1] === this.name) {
            splittedPath.pop();
        }

        parentModulePath = sep + splittedPath.join(sep)+ sep + splittedPath[splittedPath.length - 1] + this._filenamePostfix;

        if(fs.existsSync(parentModulePath)) {
            this._injectDependency(parentModulePath);
        }
    },

    _injectDependency: function (parentModulePath) {
        var content          = fs.readFileSync(parentModulePath, "utf8").trim(),
            injectionIdx     = content.length - 1,
            injectionContent = '',
            feedback         = '   ' + chalk.green.bold(this.camelCasedName) + ' ' + chalk.green('have been injected into ' + parentModulePath.replace(this.destinationRoot(), ''))

        if (content.charAt(injectionIdx) === "}") {
            injectionIdx -= 1;
            injectionContent += '\n    ';

        } else {
            injectionIdx += 1;
            injectionContent += '\n';
        }

        injectionContent += "@import '" + this.camelCasedName + '/' + this.camelCasedName + "';";


        this.conflicter.force = true;
        fs.writeFileSync(parentModulePath, content.slice(0, injectionIdx) + injectionContent + content.slice(injectionIdx));
        this.log(feedback);
    }
});