var assert           = require('assert');
var normalizeNewline = require('normalize-newline');
var read             = require('read-file-relative').readSync;
var createReport     = require('./utils/create-report');

it('Should produce report with colors', async function () {
    var report   = await createReport(true);
    var expected = JSON.parse(read('./data/report-with-colors.json'));

    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    assert.strictEqual(report, expected);
});

it('Should produce report without colors', async function () {
    var report   = await createReport(false);
    var expected = read('./data/report-without-colors');

    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    assert.strictEqual(report, expected);
});
