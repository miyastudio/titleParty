MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var config = require('../config');
var mongoUrl = config.connString;
//mongodb://user:password@yourserver:27017/yourdb
db = {
    title: 'haha',
    conn: function (callback, callback_err) {
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) {
                callback_err();
            } else {
                callback();
            }
            //assert.equal(null, err);
        });
        console.log(mongoUrl);
    },
    get: function (collection, query_obj, callback) {
        MongoClient.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            db.collection(collection).find(query_obj).toArray(function (err, result) {
                assert.equal(err, null);
                callback(result);
                db.close();
            });
        });
    },
    get_one: function (collection, query_obj, callback) {
        MongoClient.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            db.collection(collection).find(query_obj).toArray(function (err, result) {
                assert.equal(err, null);
                if (err) {
                    result[0].err = true;
                }
                //res.json(result);
                //callback(result);
                //console.log(result);
                callback(result[0]);
                db.close();
            });
        });
    },
    update: function (collection, query_obj, new_key_and_value, callback) {
        MongoClient.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            db.collection(collection).updateOne(
                query_obj,
                {
                    $set: new_key_and_value
                    //$currentDate: {"lastModified": true}
                }, function (err, results) {
                    console.log(results.result);
                    callback(results.result);
                });
        });
    },
    add: function (collection, obj, callback) {
        MongoClient.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            db.collection(collection).insertOne(obj, function (err, result) {
                assert.equal(err, null);
                //res.json(result);
                //callback(result);
                callback(result.ops[0]._id);
                db.close();
            });
        });
    },
    getMaxValue: function (collection, query_obj, valueName, limit, callback) {
        MongoClient.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            var sort = {};
            sort.score = -1;
            limit = parseInt(limit);
            db.collection(collection).find(query_obj).sort(sort).limit(limit).toArray(function (err, arr) {
                console.log('limit:' + limit);
                console.log(query_obj);
                callback(arr);
                db.close();
            });
        });
    },
    getCount: function (collection, query_obj, callback) {
        MongoClient.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            db.collection(collection).find(query_obj).toArray(function (err, arr) {
                callback(arr.length);
                db.close();
            });
        });
    }
}
module.exports = db;