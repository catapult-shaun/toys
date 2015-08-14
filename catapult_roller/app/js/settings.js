'use strict';

var ipc = require('ipc');
var configuration = require('../configuration');
var util = require('util');

var url = document.querySelector('.api_url');
var private_key = document.querySelector('.api_private_key');
var public_key = document.querySelector('.api_public_key');
var sound = document.querySelector('.sound');

var config = configuration.readSettings('api_config');
if (config == null){
    config = {};
    configuration.saveSettings('api_config', config);
}
console.log("api config is "+util.inspect(config));
url.value         = config['api_url'];
private_key.value = config['api_private_key']
public_key.value  = config['api_public_key'];
sound.checked     = config['sound'];

url.addEventListener('input', function(e){
	var v = e.currentTarget.value;
	console.log(v);
	config['api_url'] = v;
        configuration.saveSettings('api_config', config);
    });

private_key.addEventListener('input', function(e){
	var v = e.currentTarget.value;
	console.log(v);
	config['api_private_key'] = v;
        configuration.saveSettings('api_config', config);
    });

public_key.addEventListener('input', function(e){
	var v = e.currentTarget.value;
	console.log(v);
	config['api_public_key'] = v;
        configuration.saveSettings('api_config', config);
    });

sound.addEventListener('click', function(e){
	var v = e.currentTarget.checked;
	console.log(v);
	config['sound'] = v;
        configuration.saveSettings('api_config', config);
    });


var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
    ipc.send('close-settings-window');
});
