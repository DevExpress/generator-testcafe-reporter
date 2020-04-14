var createCallsiteRecord = require('callsite-record');

function someFunc () {
    throw new Error('Hey ya!');
}

try {
    someFunc();
}
catch (err) {
    const prevStacktrace = err.stack.split('\n');

    err.stack = `${prevStacktrace[0]}\n${prevStacktrace[1]}`;

    module.exports = createCallsiteRecord({ forError: err });
}
