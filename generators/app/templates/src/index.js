const util = require('util');

export default function () {
    return {
        noColors: true,

        async reportTaskStart (startTime, userAgents, testCount) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ startTime, userAgents, testCount })).newline();
        },

        async reportFixtureStart (name, path, meta) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ name, path, meta })).newline();
        },

        async reportTestStart (name, meta) {
            // NOTE: This method is optional.
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ name, meta })).newline();
        },

        async reportTestDone (name, testRunInfo, meta) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ name, testRunInfo, meta })).newline();
        },

        async reportTaskDone (endTime, passed, warnings, result) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ endTime, passed, warnings, result })).newline();
        }
    };
}
