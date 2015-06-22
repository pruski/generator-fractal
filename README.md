Generator Fractal
===============

An Angular module generator supporting fractal-structured codebases.


## Yeoman

If you don't know Yeoman, [check it](http://yeoman.io/learning/).

## Installation

```bash
npm install -g generator-fractal
```

## Usage

To create a module, run:

```bash
yo fractal module-name
```

Generator will ask you a few questions, create a directory for the new component and place all the files inside it.
Additionally, in case of Less and Angular files, it will find parent module and inject import string.

If `unitTests` flag is enabled in config file, along with directive/controller/service files, generator will yield spec files.

## Naming convention

All the directories and filenames are hyphenated, as well as directives in html and css classes. Names in javascript are camelCased.

## Context files

By default new component directory will be created in the current working directory.
However, it is common practice to keep javascript files separated from html templates, styles or unit tests.
That's why Fractal allows you to specify where you want to keep which files, grouped by file context.

**In order to do that, you must run fractal under a defined context path.**

E.g. this sample config, stored in your app root directory as `.yo-rc.json` file

```json
{
    "generator-fractal": {
        "fileContext": {
            "html": {
            	"path": "js/"
        	},

            "js": {
            	"path": "js/"
        	},

            "css": {
            	"path": "css/"
        	},

        	"spec": {
        		"path": "test/unit/"
        	}
        },
        "templatesPath": "templates/angular/",
        "unitTests": true
    }
}
```
Combined with

```bash
yo fractal admin-dashboard
```

Will result in the following output:

    js/admin-dashboard/admin-dashboard-directive.js
    js/admin-dashboard/admin-dashboard-controller.js
    js/admin-dashboard/admin-dashboard-service.js
    js/admin-dashboard/admin-dashboard.html
    js/admin-dashboard/admin-dashboard-module.js
    css/admin-dashboard/admin-dashboard.less
    test/unit/admin-dashboard/admin-dashboard-controller.spec.js
    test/unit/admin-dashboard/admin-dashboard-service.spec.js
    test/unit/admin-dashboard/admin-dashboard-directive.spec.js

## Config file

`fileContext`   is a map of contexts and its settings
`templatesPath` is a public templates directory (eg. the one you prefix templateCache with)
`unitTests`     determines whether to automatically enqueue a corresponding test subgenerator for a javascript file


## Subgenerators

You may want to create only a directive, controller, service, etc. Currently available:

* `fractal:comp` - module definition

* `fractal:ctrl` - directive

* `fractal:dir` - controller

* `fractal:srv` - service

* `fractal:tpl` - template

* `fractal:less` - less css

* `fractal:tdir` - directive unit test

* `fractal:tctrl` - controller unit test

* `fractal:tsrv` - service unit test

In this case, the file will be crated in the current working directory.


## Current supported stack

Angular 1.x, Less, Jasmine


## Don't like my templates?

Change them. And save for later reuse.

I'm hoping to make this tool elastic enough to support different and custom setups in the future.

## Active development

The code needs a bit of refactoring and test coverage.

If you use it, please report bugs, ask for features.

Pull requests are welcome.
