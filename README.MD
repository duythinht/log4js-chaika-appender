### Log4js-chaika-appenders

Simple example:

    var log4js = require('log4js');
    var chaika = require('log4js-chaika-appender')

    var count = 0

    log4js.addAppender(chaika.configure({
      "type": "log4js-syslog-appender",
      "host": "54.254.228.180", //defaults to localhost
      "port": 2435, //defaults to 12201
      "facility": "node-test-server", //defaults to nodejs-server
      "service": 'chaika'
    }))


    var logger = log4js.getLogger('princess');

    logger.debug(`Just a log for chaika, count:`, count++);
