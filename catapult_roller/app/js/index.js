'use strict';

var ipc = require('ipc');
var remote = require('remote');
var Tray = remote.require('tray');
var Menu = remote.require('menu');
var path = require('path');
var catapult_api = require('./js/catapult_api.js');
var file_processor = require('./js/file_processor.js');
var configuration = require('../configuration');
var util = require('util');

var closeEl = document.querySelector('.close');
var settingsEl = document.querySelector('.settings');
var dateEntry = document.querySelector('.dateEntry');
var listEnrolments = document.querySelector('.listEnrolments');

var trayIcon = null;
var trayMenu = null;

//SE 
function check_server_creds(){
    var conf = configuration.readSettings('api_config');
    console.log(util.inspect(conf));
    if (conf){    
	catapult_api.url         = conf['api_url'];
	catapult_api.public_key  = conf['api_public_key'];
	catapult_api.private_key = conf['api_private_key'];
    }
    console.log(util.inspect(catapult_api));
    if (catapult_api.url        && 
	catapult_api.public_key && 
	catapult_api.private_key){
	return true;
    }else{
	alert("Please enter the server credentials.");
	return false;
    }
    return true;
};

window.playSound = function(soundName){
    var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    audio.currentTime = 0;
    audio.play();
}

//handle drop file on entire window.
var window = document.getElementById('main');
window.ondragover = function () {
    return false;
};
window.ondragleave = window.ondragend = function () {
    return false;
};
window.ondrop = function (e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    //console.log(e.dataTransfer.files.inspect);
    //console.log('File you dragged here is'+ file.path);
    //alert('File you dragged here is'+ file.path)

    if (check_server_creds() == false) {
	window.playSound("sad-trombone");
	return false;
    }

    file_processor.create_enrolments(catapult_api, file.path);
    window.playSound("money");
    return false;
};

dateEntry.addEventListener('click', function () {
    ipc.send('open-date-window');
});

listEnrolments.addEventListener('click', function () {
   if (check_server_creds() == false) {
       window.playSound("sad-trombone");
       return false;
   }

  var config = configuration.readSettings('date_config');
  if (config == null){
      alert("Please specify a date range and filter");
      return;
  }
  var startDate = config['startDate'];
  var endDate   = config['endDate'];
  var filter    = config['filter'];
  if (startDate == null || endDate == null || filter == null){
      alert("Please specify a date range and filter");
      return;
  }
  var ok = confirm("Retrieve \""+filter+"\" enrolments from:\n"+
		     catapult_api.url+"\nFrom: "+startDate+" to "+endDate);
  if (ok){
    window.playSound("burp");   
    file_processor.list_enrolments(configuration.getUserHome(), 
				   catapult_api, 
				   startDate, 
				   endDate, 
				   filter);
  }else{
    window.playSound("fart");
  }
});

closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});

settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window');
});
if (process.platform === 'darwin') {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
}
else {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}

var trayMenuTemplate = [
    {
        label: 'Catapult Roller (API client)',
        enabled: false
    },
    {
        label: 'Settings',
        click: function () {
            ipc.send('open-settings-window');
        }
    },
    {
        label: 'Quit',
        click: function () {
            ipc.send('close-main-window');
        }
    }
];
trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);