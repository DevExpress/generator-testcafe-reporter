export default function () {
    return {
        noColors: true,

        async reportTaskStart (/* startTime, userAgents, testCount */) {
            throw new Error('Not implemented');
        },

        async reportFixtureStart (/* name, path, meta */) {
            throw new Error('Not implemented');
        },

        async reportTestStart (/* name, meta */) {
            // NOTE: This method is optional.
        },

        async reportTestDone (/* name, testRunInfo, meta */) {
            throw new Error('Not implemented');
        },

        async reportTaskDone (/* endTime, passed, warnings, result */) {
            throw new Error('Not implemented');
        }
    };
}
