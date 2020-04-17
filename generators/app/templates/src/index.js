const util = require('util');

export default function () {
    return {
        noColors: true,

        async reportTaskStart (startTime, userAgents, testCount) {
            this.write(util.inspect({ startTime, userAgents, testCount })).newline();
        },

        async reportFixtureStart (name, path, meta) {
            this.write(util.inspect({ name, path, meta })).newline();
        },

        async reportTestStart (name, meta) {
            // NOTE: This method is optional.
            this.write(util.inspect({ name, meta })).newline();
        },

        async reportTestDone (name, testRunInfo, meta) {
            this.write(util.inspect({ name, testRunInfo, meta })).newline();
        },

        async reportTaskDone (endTime, passed, warnings, result) {
            this.write(util.inspect({ endTime, passed, warnings, result })).newline();
        }
    };
}
