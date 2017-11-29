'use strict'

    const bodyParser = require('body-parser');
    const express = require('express');
    const fs = require('fs');
    const app = express();

    var cors = require('cors');
    var http = require('http');
    var path = require('path');
    var request = require('request');
    var port = '4200';
    http.createServer(function(req, res) {});


    app.use(bodyParser.json());
    app.use(cors());
    app.set('port',port);

    app.use(express.static(path.join(__dirname, "views/dist")));
    app.use(express.static(path.join(__dirname, '/node_modules')));

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,X-Auth-Token,Cookie-Headers');
        res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
        res.header('Allow','HEAD, GET, PATCH, POST, OPTIONS, DELETE');
        next();
    });

	app.get('/getCollectionData', function(req, response){
		var urlString = req.query.Ip;
		 request({
            headers: {
                'X-Auth-Token':req.get('X-Auth-Token'),
                'Cookie':req.get('Cookie-Headers')
            },
            uri: urlString,
            method: 'GET'
        }, function (err, res, body) {
             return response.send(JSON.parse(body));
        });
	});
	app.post('/addCollection', function(req, response) {
        request({
            uri: req.body.Ip,
            method: 'POST',
            headers: {
                'X-Auth-Token':req.get('X-Auth-Token'),
                'Cookie':req.get('Cookie-Headers')
            },
        }, function (err, res) {
            return response.send(res);
        });

    });
	app.post('/updateCollection', function(req, response) {
        var urlString = req.query.Ip;
		request({
            headers: {
                'X-Auth-Token':req.get('X-Auth-Token'),
                'Cookie':req.get('Cookie-Headers')
            },
			uri: urlString,
			method: 'PUT',
			json:req.body
		}, function (err, res) {
			return response.send(res);
		});
	});

	app.post('/getCookie', function(req, response) {
		var cred = {
			UserName:req.body.UserName,
			Password:req.body.Password
		};
        request({
            uri: req.body.postUrl,
            method: 'POST',
            json: cred
        }, function (err, res) {
            if(res.headers['x-auth-token'] != null  ){
                response.setHeader('X-Auth-Token',res.headers['x-auth-token']);
            }
            if(res.headers['set-cookie'] != null){
                response.setHeader('Cookie-Headers',res.headers['set-cookie']);
            }
            return response.send(res);
        });
	});

	app.delete('/deleteService',function(req,response) {
        var urlString = req.query.Ip;
        request({
            uri: urlString,
            method: 'DELETE',
            json:req.body,
            headers:{
                'Content-Type':'application/json'
            }
        }, function (err, res) {
            return response.send(res);
        });
    });

	app.listen(3300, function(){
	  console.log('Listening on port 3000, Live  http://localhost:3000');
	});

module.exports = app;
