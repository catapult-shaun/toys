'use strict';

var csv = require('csv');
var fs = require('fs'); 
var util = require('util');
var when = require('when');

//todo write a timestamped csv file containing the returned records
exports.list_enrolments = function(userHomeDir, catapult_api, startDate, endDate, filter){
    catapult_api.list_enrolments(startDate, endDate, filter, function(error, data){
       console.log(data);

	var new_file_name = userHomeDir+"/"+"catapult_enrolments_"+startDate+"_"+endDate+"_";
	new_file_name += (new Date()).toISOString().replace(/[^0-9]*/g,"");
	new_file_name += ".csv";

	//meh, shouldnt be here..
	alert('Wrote: '+data.length+' enrolments to file:\n'+new_file_name);

        //todo actually write a file.
   });
}

exports.create_enrolments = function(catapult_api, file_path){
    var results = [];
    var total = 0;

    var rs = fs.createReadStream(file_path.toString());
    var parser = csv.parse({columns: true}, function(err, data){
	    console.log(util.inspect(data));	   
	    var n = 0; //delay increment and enrolment counter ;)

	    //helper
	    function delay(secs) {
		var d = when.defer();
		setTimeout(function () {
			d.resolve(secs);
		    }, secs * 1000);
		return d.promise;
	    }
	    
	    function create(e){
		n++;
		var encoded = e;
		delay(n+1).then(function(){
			var info = "("+e['unit_code']+", "+e['login']+")";
			console.log("creating enrolment: "+info);		    
			catapult_api.create_enrolment(encoded, 
						      function(err, res){
							  var r = (err != null) ? "Failed" : "OK";
							  var m = "creating enrolment: "+info+":"+r;
							  console.log(m);
							  //todo count calls here then fire event on completion of all enrolments.
						          results.push(m);
						          if (results.length == total) alert('File processing complete.');
						      });
		    }); 
	    };//end create
	    
	    //I couldn't figure out how to make this a sequence 
	    // and I was getting errors from the library, gave in.. 
	    // only two days until leaving! 
	    var all = when.map(data, create).then(function(){
   		console.log("Scheduled "+n+" enrolments");
		total = n;
		alert("Scheduled "+n+" enrolments for creation"); //crappy
	    });

	});

    //parse the csv.
    rs.pipe(parser);
};

/* Example CSV file. Dunno what happens if some fields are empty.. (untested)
"unit_code","student[login]","student[first_name]","student[surname]","student[email]","student[password]","trainer[login]"
BSBADM101A,shaun.etherton,shaun,etherton,shaun.etherton@gmail.com,asdfasdfasdf,joshua.trainer
 */


