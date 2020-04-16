const path = require('path');
var createCallsiteRecord = require('callsite-record');

function someFunc () {
    throw new Error('Hey ya!');
}

try {
    someFunc();
}
catch (err) {
    const scriptName = path.basename(__filename);

    err.stack = err.stack.split('\n').filter(stackFrame => stackFrame.includes(scriptName)).join('\n');

    module.exports = createCallsiteRecord({ forError: err });
}
