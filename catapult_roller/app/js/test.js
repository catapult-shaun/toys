'use strict';

//use node repl from CLI
//node 
//var x = require('./test.js'); x.list_enrolments();

var qs = require('querystring');
var request = require('request');

var url = "http://joshua-demo.catapult-elearning.com/api/enrolments";
var public_key = "FyBenmJYhl123Ohk8eOrTmcuBMVctzl5uEdWBnK4hws";
var private_key = "tph0kjwgRhr2x640lbQnPF3Etr8GYv85hwsr98X788";

exports.list_enrolments = function(){

    var oauth = {    consumer_key: public_key,
	          consumer_secret: private_key
                };

    var params = qs.stringify({date_from:'2015-08-01', 
			       date_to:'2015-08-20'
			       /*, filter:'started'*/});

    console.log("params: "+params);

    request.get({url:url+"?"+params, oauth:oauth, qs:null, json:true}, function (e, r, data) {
	    console.log("e: "+e);
	    console.log("r: "+r);
	    console.log("data: "+util.inspect(data));
    });

};






