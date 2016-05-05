"use strict";

var log4js = require('log4js');
var layouts = log4js.layouts
var dgram = require('dgram')
var util = require('util');
function chaika (config, layout) {
  var udp = dgram.createSocket('udp4');
  var type = config.logType ? config.logType : config.category;
  layout =  layout || layouts.basicLayout;
  if(!config.fields) {
    config.fields = {};
  }
  return function log(loggingEvent) {

    config.fields.level = loggingEvent.level.levelStr;

    var logObject = {
      "time" : (new Date(loggingEvent.startTime)).toISOString(),
      "logType" : config.logType ? config.logType : config.category,
      "message" : layout(loggingEvent),//.data.join(''),
      "service" : config.service,
      "catalog": loggingEvent.categoryName,
      "level": loggingEvent.level.levelStr
    };
    sendLog(udp, config.host, config.port, logObject);
  };
}

function sendLog(udp, host, port, logObject) {
  var buffer = new Buffer(JSON.stringify(logObject));
  udp.send(buffer, 0, buffer.length, port, host, function(err, bytes) {
    if(err) {
      console.error(
        "log4js.chaika - %s:%p Error: %s", host, port, util.inspect(err)
      );
    }
  });
}

function configure(config) {
  var layout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return chaika(config, layout);
}

exports.appender = chaika;
exports.configure = configure;
