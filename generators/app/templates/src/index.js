export default function () {
    return {
        noColors: true,
        <% if (errorDecorator) { %>
        createErrorDecorator () {
            return {
                'span category':       () => '',
                'span step-name':      str => `"${str}"`,
                'span user-agent':     str => this.chalk.gray(str),
                'div screenshot-info': str => str,
                'a screenshot-path':   str => this.chalk.underline(str),
                'code':                str => this.chalk.yellow(str),
                'code step-source':    str => this.chalk.magenta(this.indentString(str, 4)),
                'span code-line':      str => `${str}\n`,
                'span last-code-line': str => str,
                'code api':            str => this.chalk.yellow(str),
                'strong':              str => this.chalk.cyan(str),
                'a':                   str => this.chalk.yellow(`"${str}"`)
            };
        },
        <% } %>
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
