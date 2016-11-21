'use strict';
const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');
var post = require('./handlers/post');
var posts = require('./handlers/posts');
var config = require('./config.js');
const server = new Hapi.Server();
const port = config.port;

server.connection({
    host: '0.0.0.0',
    port: port
});
//inert
server.register(require('inert'), (err) => {
    Hoek.assert(!err, err);
    server.route({
        method: 'POST',
        path: '/api/post',
        handler: post
    });
    server.route({
        method: 'GET',
        path: '/api/posts',
        handler: posts
    });
    /*
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'static',
                listing: true
            }
        }
    });*/
    server.route({
        method: 'GET',
        path: '/lib/{param*}',
        handler: {
            directory: {
                path: 'bower_components',
                listing: true
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/css/{param*}',
        handler: {
            directory: {
                path: 'static/css',
                listing: true
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/js/{param*}',
        handler: {
            directory: {
                path: 'static/js',
                listing: true
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/img/{param*}',
        handler: {
            directory: {
                path: 'static/img',
                listing: true
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/templates/{param*}',
        handler: {
            directory: {
                path: 'templates',
                listing: true
            }
        }
    });
    //pages
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./templates/index.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/post',
        handler: function (request, reply) {
            reply.file('./templates/post.html');
        }
    });
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', port);
});