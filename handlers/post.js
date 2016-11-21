var db = require('../lib/db');
var moment = require('moment');
module.exports = function (request, reply) {
    var title = request.payload.title;//post    get  params
    var text = request.payload.text;
    var json = {
        title: title,
        text: text,
        timestamp: moment().unix()
    }
    db.add('post', json, function (id) {
        return reply({
            id: id,
            title: title
        });
    });
}