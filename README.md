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

Generator will ask you some questions, create a directory for the new component and place all the files inside.
Additionally, in case of Less and Angular files, it will find parent module and inject import string.

If `unitTests` flag is enabled in config file, along with directive/controller/service files, generator will yield spec files.

## Context files

It is common practice to keep javascript files separated from html templates, styles or unit tests.
Fractal allows you to specify where you want to keep your files, divided by different contexts.

This sample config, stored in your app root directry as `.yo-rc.json` file

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
        "templatesDir": "templates/angular/",
        "unitTests": true
    }
}
```
Combined with

```bash
yo fractal admin-dashboard
```

Will result in the following structure:

    js/admin-dashboard/admin-dashboard-directive.js
    js/admin-dashboard/admin-dashboard-controller.js
    js/admin-dashboard/admin-dashboard-service.js
    js/admin-dashboard/admin-dashboard.html
    js/admin-dashboard/admin-dashboard-module.js
    css/admin-dashboard/admin-dashboard.less
    test/unit/admin-dashboard/admin-dashboard-controller.spec.js
    test/unit/admin-dashboard/admin-dashboard-service.spec.js
    test/unit/admin-dashboard/admin-dashboard-directive.spec.js


**The command must be run under one of the context paths**


## Current supported stack

Angular 1.x, Less, Jasmine

## Subgenerators

You may want to create only a directive, controller, service, etc. Currently available:

* `fractal:comp` - module definition

* `fractal:ctrl` - directive

* `fractal:dir` - controller

* `fractal:srv` - service

* `fractal:tpl` - template

* `fractal:less` - less css

* `fractal:tdir` - less css

* `fractal:tctrl` - less css

* `fractal:tsrv` - less css

In this case, the file will be crated in the current directory.

## Don't like my templates?

Read the code and change them, and save for later reuse.

I'm hoping to make this tool elastic enough to support different and custom setups.

But it is what I need at the moment.

## Development

The code is quite messy, but it works well.

If you use it, please report bugs, ask for features.

Pull requests are welcome.
