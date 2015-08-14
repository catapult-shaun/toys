'use strict';

var ipc = require('ipc');
var configuration = require('../configuration');
var util = require('util');

var startDate = document.querySelector('.startDate');
var endDate = document.querySelector('.endDate');
var filter = document.querySelector('.filter');

var config = configuration.readSettings('date_config');
if (config == null){
    config = {};
    configuration.saveSettings('date_config', config);
}
console.log("date config is "+util.inspect(config));

startDate.value = config['startDate'];
endDate.value   = config['endDate']
filter.value    = config['filter'];


startDate.addEventListener('input', function(e){
	var v = e.currentTarget.value;
	console.log(v);
	config['startDate'] = v;
        configuration.saveSettings('date_config', config);
    });

endDate.addEventListener('input', function(e){
	var v = e.currentTarget.value;
	console.log(v);
	config['endDate'] = v;
        configuration.saveSettings('date_config', config);
    });

filter.addEventListener('input', function(e){
	var v = e.currentTarget.value;
	console.log(v);
	config['filter'] = v;
        configuration.saveSettings('date_config', config);
    });


var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
    ipc.send('close-dateEntry-window');
});
