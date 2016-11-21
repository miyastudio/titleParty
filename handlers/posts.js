var db = require('../lib/db');
var moment = require('moment');
module.exports = function (request, reply) {
    db.get('post',{}, function (json) {
        return reply(json);
    });
}