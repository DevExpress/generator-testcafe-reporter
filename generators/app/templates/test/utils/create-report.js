var buildReporterPlugin = require('testcafe').embeddingUtils.buildReporterPlugin;
var pluginFactory       = require('../../lib');
var reporterTestCalls   = require('./reporter-test-calls');

module.exports = async function createReport (withColors) {
    var outStream = {
        data: '',

        write: function (text) {
            this.data += text;
        }
    };

    var plugin = buildReporterPlugin(pluginFactory, outStream);

    plugin.chalk.enabled = withColors;

    for (const call of reporterTestCalls)
        await plugin[call.method].apply(plugin, call.args);

    // NOTE: mock stack entries
    return outStream.data.replace(/\(.+:\d+:\d+.*\)/g, '(some-file:1:1)');
};
