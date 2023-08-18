const path = require('path');
const bunyan = require('bunyan');
const errorPath = path.join(__dirname, '../', 'error.log');
const bunyanOpts = {
    name: 'expense-tracker v1.0',
    streams: [
        {
            level: 'debug',
            stream: process.stdout       // log INFO and above to stdout
        },
        {
            level: 'info',
            path: errorPath // log ERROR and above to a file
        }
    ]
};
const logger = bunyan.createLogger(bunyanOpts);

module.exports = logger;
