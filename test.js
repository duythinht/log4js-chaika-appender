var log4js = require('log4js');
var chaika = require('./chaika.js')

var count = 0

log4js.addAppender(chaika.configure({
  "type": "log4js-syslog-appender",
  "host": "127.0.0.1", //defaults to localhost
  "port": 2435, //defaults to 12201
  "facility": "WTF", //defaults to nodejs-server
  "service": 'hydra-2'
}))

var logger = log4js.getLogger('hydra');

setInterval(() => {
  logger.debug(`Just a log for chaika, count:`, count++);
}, 3000)
