const TestRunErrorFormattableAdapter = require('testcafe').embeddingUtils.TestRunErrorFormattableAdapter;
const UncaughtErrorOnPage            = require('testcafe').embeddingUtils.testRunErrors.UncaughtErrorOnPage;
const ActionElementNotFoundError     = require('testcafe').embeddingUtils.testRunErrors.ActionElementNotFoundError;
const testCallsite                   = require('./test-callsite');


function makeErrors (errDescrs) {
    return errDescrs.map(function (descr) {
        return new TestRunErrorFormattableAdapter(descr.err, descr.metaInfo);
    });
}

module.exports = [
    {
        method: 'reportTaskStart',
        args:   [
            new Date('1970-01-01T00:00:00.000Z'),
            [
                'Chrome 41.0.2227 / Mac OS X 10.10.1',
                'Firefox 47 / Mac OS X 10.10.1'
            ],
            7
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'First fixture',
            './fixture1.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'First test in first fixture',
            {
                errs:           [],
                warnings:       [],
                durationMs:     74000,
                unstable:       false,
                screenshotPath: '/screenshots/1445437598847',
                screenshots:    [
                    {
                        screenshotPath:    '/screenshots/1445437598847',
                        thumbnailPath:     '/screenshots/1445437598847/thumbnail',
                        userAgent:         'Chrome 41.0.2227 / Mac OS X 10.10.1',
                        quarantineAttempt: 0,
                        takenOnFail:       false
                    }
                ],
                quarantine: null,
                skipped:    false
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Second test in first fixture',
            {
                errs: makeErrors([
                    {

                        err: new UncaughtErrorOnPage('Some error', 'http://example.org'),

                        metaInfo: {
                            userAgent:      'Chrome 41.0.2227 / Mac OS X 10.10.1',
                            screenshotPath: '/screenshots/1445437598847/errors',
                            callsite:       testCallsite,
                            testRunPhase:   'inTest'
                        }
                    },
                    {
                        err: new ActionElementNotFoundError({ apiFnChain: ['one', 'two', 'three'], apiFnIndex: 1 }),

                        metaInfo: {
                            userAgent:    'Firefox 47 / Mac OS X 10.10.1',
                            callsite:     testCallsite,
                            testRunPhase: 'inTest'
                        }
                    }
                ]),
                warnings:       [],
                durationMs:     74000,
                unstable:       false,
                screenshotPath: '/screenshots/1445437598847',
                screenshots:    [
                    {
                        screenshotPath:    '/screenshots/1445437598847',
                        thumbnailPath:     '/screenshots/1445437598847/thumbnail',
                        userAgent:         'Chrome 41.0.2227 / Mac OS X 10.10.1',
                        quarantineAttempt: 0,
                        takenOnFail:       true
                    },
                    {
                        screenshotPath:    '/screenshots/1445437598847',
                        thumbnailPath:     '/screenshots/1445437598847/thumbnail',
                        userAgent:         'Firefox 47 / Mac OS X 10.10.1',
                        quarantineAttempt: 0,
                        takenOnFail:       true
                    }
                ],
                quarantine: null,
                skipped:    false
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Third test in first fixture',
            {
                errs:           [],
                warnings:       [],
                durationMs:     74000,
                unstable:       false,
                screenshotPath: null,
                screenshots:    [],
                quarantine:     null,
                skipped:        false
            }
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'Second fixture',
            './fixture2.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'First test in second fixture',
            {
                errs:           [],
                warnings:       [],
                durationMs:     74000,
                unstable:       false,
                screenshotPath: null,
                screenshots:    [],
                quarantine:     null,
                skipped:        false
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Second test in second fixture',
            {
                errs:           [],
                warnings:       [],
                durationMs:     74000,
                unstable:       false,
                screenshotPath: null,
                screenshots:    [],
                quarantine:     null,
                skipped:        false
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Third test in second fixture',
            {
                errs:           [],
                warnings:       [],
                durationMs:     0,
                unstable:       false,
                screenshotPath: null,
                screenshots:    [],
                quarantine:     null,
                skipped:        false
            }
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'Third fixture',
            './fixture3.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'First test in third fixture',
            {
                errs: makeErrors([
                    {
                        err: new ActionElementNotFoundError({ apiFnChain: ['one', 'two', 'three'], apiFnIndex: 1 }),

                        metaInfo: {
                            userAgent:    'Firefox 47 / Mac OS X 10.10.1',
                            callsite:     testCallsite,
                            testRunPhase: 'inFixtureBeforeEachHook'
                        }
                    }
                ]),
                warnings:       [],
                durationMs:     0,
                unstable:       false,
                screenshotPath: '/screenshots/1445437598847',
                screenshots:    [
                    {
                        screenshotPath:    '/screenshots/1445437598847',
                        thumbnailPath:     '/screenshots/1445437598847/thumbnail',
                        userAgent:         'Firefox 47 / Mac OS X 10.10.1',
                        quarantineAttempt: 0,
                        takenOnFail:       false
                    }
                ],
                quarantine: null,
                skipped:    false
            }
        ]
    },
    {
        method: 'reportTaskDone',
        args:   [
            new Date('1970-01-01T00:15:25.000Z'),
            4,
            [
                'Was unable to take a screenshot due to an error.\n\nReferenceError: someVar is not defined',
                'Was unable to take a screenshot due to an error.\n\nReferenceError: someOtherVar is not defined'
            ],
            {
                failedCount:  2,
                passedCount:  5,
                skippedCount: 0
            }
        ]
    }
];
