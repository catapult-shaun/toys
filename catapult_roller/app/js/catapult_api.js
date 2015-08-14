'use strict';
var when = require('when');
var qs = require('querystring');
var request = require('request');

//Catapult API
//http(s)://shaun.catapult-elearning.com/api,
//Catapult API conforms to version 1.0 of the OAuth specification.
// This class is responsible for interacting with the catapult api.

// Simple http client.
// See: https://www.npmjs.com/package/request#oauth-signing
var request = require('request');

//set externally. \0/
exports.url = "";
exports.public_key = "";
exports.private_key = "";

function mimic_call(callback){
    function delay(secs) {
	var d = when.defer();
	setTimeout(function () {
		d.resolve(secs);
	    }, secs * 1000);
	return d.promise;
    }
    /* Mimic call
    delay(3).then(function(){
         callback(null, "faked response from the server");    
    });
    */
}

/*
 GET /api/enrolments
 Parameters ----------
 date_from
 date_to
 filter [(one of) started | submitted | marked | completed]
*/
exports.list_enrolments = function(from_date, to_date, filter_by, callback){

        var url = exports.url+"/enrolments";

	var oauth = { consumer_key: exports.public_key,
		      consumer_secret: exports.private_key,
		      transport_method : 'query'
	};
	var params = qs.stringify({date_from:from_date, 
				   date_to:to_date, 
				   filter:filter_by
	});

	request.get({url:url+"?"+params, oauth:oauth, qs:params, json:true}, function (e, r, data) {
		console.log("e: "+e);
     		console.log("r: "+r);
      		console.log("data: "+util.inspect(data));
		callback(e, data);
	});
};


/*
POST /api/enrolments
  Parameters: ----------
  student[login] student[first_name] student[surname] student[phone] student[email] student[password] student[address_one] student[address_two]
  - unique identifier for student
  May 22, 2014
  1/7
  student[suburb] student[state] student[post_code] student[phone] student[mobile]
  trainer[login] trainer[first_name] trainer[surname] trainer[phone] trainer[email] trainer[password] trainer[address_one] trainer[address_two] trainer[suburb] trainer[state] trainer[post_code] trainer[phone] trainer[mobile]
  unit_code
  - unique identifier for trainer
 */
exports.create_enrolment = function(encoded_object, callback){

    var url = exports.url+"/enrolments";

    var oauth = { consumer_key: exports.public_key,
		  consumer_secret: exports.private_key,
		  transport_method : 'query'
	};
    var params = qs.stringify(encoded_object);
        params = params.replace(/%5B/g,"[").replace(/%5D/g,"]");
    console.log("params: "+params);

    mimic_call(callback);

    request.post({url:url+"?"+params, oauth:oauth, qs:null, json:true}, 
		 function (e, r, data) {
		
		     console.log("e: "+e);
		     console.log("r: "+r);
		     console.log("data: "+util.inspect(data));
		     callback(e, data );
	});

};

/*
  DELETE API delete must be params, POST is body.
  NOTE: The parameters above must be given via the request body for 
  the POST verb. For the DELETE verb they must be given as 
  query-string parameters,
  DELETE /api/enrolments?student_login=john.smith&unit_code=BSBAAA123A
   or 
  POST /api/enrolments?action=delete
*/
exports.delete_enrolment = function(){
    alert('not supported');
};

exports.create_student = function(){
    alert('not supported');
};

console.log("catapult api loaded.");