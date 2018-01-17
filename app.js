/*
 Copyright (c) 2017, The Storage Networking Industry Association.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of The Storage Networking Industry Association (SNIA) nor
 the names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 THE POSSIBILITY OF SUCH DAMAGE.
 */
'use strict'
    const bodyParser = require('body-parser');
    const express = require('express');
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
		     if(err) {
                  if(err.code == 'ECONNREFUSED') {
                     return response.status(502).send({ error: err.code + ': Connection refused' })
                 }
                 else if(err.code == 'ETIMEDOUT ') {
                     return response.status(502).send({ error: err.code + ': Connection Timed Out' })
                 }
                 else{
                     return response.status(502).send({ error: err.code  })
                 }
             }
             try {
                 return response.send(JSON.parse(body));
             } catch (e) {
                return response.status(404).send({ error: ' Connection refused' })
             }
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
            if(err) {
                return response(404).send({error:'not found'});
            }
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
            if(err) {
                if(err.code == 'ENOTFOUND') {
                    return response.status(502).send({ error: err.code + ': Invalid IPAddress/port' })
                }
                else if(err.code == 'ECONNREFUSED') {
                    return response.status(502).send({ error: err.code + ': Connection refused' })
                }
                else if(err.code == 'ETIMEDOUT ') {
                    return response.status(502).send({ error: err.code + ': Error Connection Timed Out' })
                }
                else{
                    return response.status(502).send({ error: err.code  })
                }
            }
            if(res.headers['x-auth-token'] != null  ){
                response.setHeader('X-Auth-Token',res.headers['x-auth-token']);
            }
            if(res.headers['set-cookie'] != null){
                response.setHeader('Cookie-Headers',res.headers['set-cookie']);
            }
            if(res.headers['location'] != null) {
                response.setHeader('location',res.headers['location']);
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
            if(err) {
                return response.status(405).send({error:'Deletion Failed'});
            }
            return response.send(res);

        });
    });
    app.delete('/deleteSession',function(req,response) {
        var urlString = req.query.Ip;
        request({
            uri: urlString,
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }, function (err, res) {
            if(err) {
                console.log("error");
                return response.send(err)
            }
            return response.send(res);
        });
    });
	app.listen(3300, function(){
	  console.log('Listening on port 3000, Live  http://localhost:3000');
	});

module.exports = app;