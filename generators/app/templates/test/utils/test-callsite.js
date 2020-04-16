const path = require('path');
const findLastIndex = require('lodash.findlastindex');
var createCallsiteRecord = require('callsite-record');

function someFunc () {
    throw new Error('Hey ya!');
}

try {
    someFunc();
}
catch (err) {
    const scriptName = path.basename(__filename);

    const frames = err.stack.split('\n');

    err.stack = frames.slice(0, findLastIndex(frames, frame => frame.includes(scriptName)) + 1).join('\n');

    module.exports = createCallsiteRecord({ forError: err });
}
