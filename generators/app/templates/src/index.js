const util = require('util');

export default function () {
    return {
        noColors: true,

        async reportTaskStart (startTime, userAgents, testCount) {
            this.write(util.inspect({ startTime, userAgents, testCount })).newline();
        },

        async reportFixtureStart (name) {
            this.write(util.inspect({ name })).newline();
        },

        async reportTestDone (name, testRunInfo) {
            this.write(util.inspect({ name, testRunInfo })).newline();
        },

        async reportTaskDone (endTime, passed, warnings, result) {
            this.write(util.inspect({ endTime, passed, warnings, result })).newline();
        }
    };
}
