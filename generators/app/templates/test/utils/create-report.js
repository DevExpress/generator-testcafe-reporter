const buildReporterPlugin = require('testcafe').embeddingUtils.buildReporterPlugin;
const pluginFactory       = require('../../lib');
const reporterTestCalls   = require('./reporter-test-calls');

module.exports = async function createReport (withColors) {
    const outStream = {
        data: '',

        write: function (text) {
            this.data += text;
        }
    };

    const plugin = buildReporterPlugin(pluginFactory, outStream);

    plugin.chalk.enabled = !plugin.noColors && withColors;

    // NOTE: disable errors coloring
    // because errors rendering is done by TestCafe
    // and can be changed regardless of the plugin state
    if (plugin.chalk.enabled) {
        const origFormatError = plugin.formatError;

        plugin.formatError = function () {
            plugin.chalk.enabled = false;

            const result = origFormatError.apply(plugin, arguments);

            plugin.chalk.enabled = true;

            return result;
        };
    }

    for (const call of reporterTestCalls)
        await plugin[call.method].apply(plugin, call.args);

    // NOTE: mock stack entries
    return outStream.data.replace(/\(.+:\d+:\d+.*\)/g, '(some-file:1:1)');
};
