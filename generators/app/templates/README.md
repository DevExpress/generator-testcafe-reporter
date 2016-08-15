# testcafe-reporter-<%= reporterName %>
[![Build Status](https://travis-ci.org/<%= githubUsername %>/testcafe-reporter-<%= reporterName %>.svg)](https://travis-ci.org/<%= githubUsername %>/testcafe-reporter-<%= reporterName %>)

This is the **<%= reporterName %>** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/<%= githubUsername %>/testcafe-reporter-<%= reporterName %>/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-<%= reporterName %>
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter <%= reporterName %>
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('<%= reporterName %>') // <-
    .run();
```

## Author
<%= author %> <% if (website) { %>(<%= website %>)<% } %>
