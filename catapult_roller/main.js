'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var configuration = require('./configuration');
var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;
var dateWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        height: 368,
        resizable: false,
        width: 368
    });
    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});

ipc.on('close-main-window', function () {
    app.quit();
});

ipc.on('open-date-window', function () {
    if (dateWindow) {
        return;
    }
    dateWindow = new BrowserWindow({
        frame: false,
        height: 300,
        resizable: false,
        width: 300
    });
    dateWindow.loadUrl('file://' + __dirname + '/app/dateEntry.html');
    dateWindow.on('closed', function () {
        dateWindow = null;
    });
});



ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }
    settingsWindow = new BrowserWindow({
        frame: false,
        height: 300,
        resizable: false,
        width: 300
    });
    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');
    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

ipc.on('close-dateEntry-window', function () {
    if (dateWindow) {
        dateWindow.close();
    }
});
