const exec = require('child_process').exec;

module.exports = function runCmd (cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, { maxBuffer: 1024 * 500 }, function (err, stdout) {
            if (err) {
                console.error(stdout);
                return reject(err);
            }
            console.log(stdout);
            return resolve();
        });
    });
}
