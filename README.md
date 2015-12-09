# generator-testcafe-reporter
*Scaffold out a TestCafe reporter*

[![Build Status](https://api.travis-ci.org/DevExpress/generator-testcafe-reporter.svg)](https://travis-ci.org/DevExpress/generator-testcafe-reporter)

TestCafe can build test run reports in your own format and style. What you have to do is create a custom reporter plugin.
This Yeoman generator scaffolds out such a plugin, so that you only need to write a few lines of code.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-testcafe-reporter using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-testcafe-reporter
```

Then generate your new project:

```bash
yo generator-testcafe-reporter
```

##Implementing the Reporter

Now that the reporter has been scaffolded, look at the `src/index.js` file.

You have to implement four methods:

```js
reportTaskStart (/* startTime, userAgents, testCount */) {
	throw new Error('Not implemented');
},

reportFixtureStart (/* name, path */) {
	throw new Error('Not implemented');
},

reportTestDone (/* name, errs, durationMs, unstable, screenshotPath */) {
	throw new Error('Not implemented');
},

reportTaskDone (/* endTime, passed */) {
	throw new Error('Not implemented');
}
```

They should output the desired information at certain moments during test run.

* `reportTaskStart` - fires when a test task is started (i.e., at the beginning of testing);
* `reportFixtureStart` - fires each time a fixture is started;
* `reportTestDone` - fires each time a test is finished;
* `reportTaskDone` - fires when the entire task is finished (i.e., at the end of testing).

All the required data is provided to these methods through their parameters.

To output information, use helper methods and libraries exposed by the `ReporterPluginHost` object (**[TODO - documentation]**). The object you are currently editing will be mixed in with `ReporterPluginHost`, so you can refer to its methods by using `this`.

**Example**

```js
reportTaskStart (startTime, userAgents, testCount) {
	var uaList = userAgents
		.map(ua => this.chalk.blue(ua))
		.join(', ');

	this.startTime = startTime;
	this.testCount = testCount;

	this.setIndent(0)
		.useWordWrap(true)
		.write(this.chalk.bold(`Running tests in: ${uaList}`))
		.newline()
		.newline();
},
```
 
##Testing the Reporter

In addition to production parts of the reporter, this generator scaffolds a convenient testing infrastructure.

To get it to work, you need to provide baseline reports in your format.

First, you need to know what data to use in these reports. There are two ways to find this:

* Refer to the test data at `/generators/app/templates/test/data/test-calls.js`, study this JSON file and figure out the meaning of the values in there.
* An easier way is to use an existing reporter - say, the *list* reporter at https://github.com/DevExpress/testcafe-reporter-list. You can either run the `preview` Gulp task to view the report in your terminal, or find the etalon report at `/test/data/report-without-colors`.

Then, compose two baseline reports by presenting the data you discovered in the desired format.

* A regular report. Put it to `/test/data/` and name it `report-without-colors`.
* A colored report, which is a JSON file that consists of a single string - the report text with additional color information specified using [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code). Put this JSON file to `/test/data/` and name it `report-with-colors.json`.

You can now use the `test` Gulp task to test that your reporter works well.

##Preview the Report

You can preview a report built by your reporter using the `preview` Gulp task that is automatically generated for you.

##Publish the Reporter

To publish the reporter at npm, use the `publish` Gulp task.

## Author

Developer Express Inc.([http://devexpress.com](http://devexpress.com))
