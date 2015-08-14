
This is hacked version of the SoundMachine demo app below.
It is a desktop application to create enrolments from CSV file (drag and drop) and to query the api for existing enrolments.
Delete enrolments and create student is not implemented.

It uses the Catapult API.

This is the original article that explains the tech and provides the example commands etc you need to build the demo app (and also this app).
https://medium.com/@bojzi/building-a-desktop-application-with-electron-204203eeb658

Some notes:
You need nodejs and npm installed
 npm install will download and build the dependencies for this app. (See package.json for details.)

You can run the app with 
 npm start

You can build a version for all platforms with the following command.
 npm run-script package


These are the key commands:
 npm install --save-dev electron-prebuilt
 npm install --save-dev electron-packager

 npm install (run after changing the dependencies).
 npm start   (run the app during development) 

 npm run-script package (build the app for each platform - only need this for "deployment" once the app is ready/finished)
  After the app is built you just run it like any other desktop app, by double clicking the app icon.


You need to set some config in the app or for development convenience you can copy this json 
to a file (and put it in your home directory) called: catapult-api-roller-config.json
{
  "shortcutKeys": [
    "ctrl",
    "shift"
  ],
  "api_config": {
    "api_url": "http://joshua-demo.catapult-elearning.com/api",
    "api_public_key": "FyBenmJYhl123Ohk8eOrTmcuBMVctzl5uEdWBnK4hws",
    "api_private_key": "tph0kjwgRhr2x640lbQnPF3Etr8GYv85hwsr98X788"
  },
  "date_config": {
    "startDate": "2015-08-01",
    "endDate": "2015-08-20",
    "filter": ""
  }
}

This is the original content of this file:
# Accompanying repository for the Electron guide
![Sound Machine](https://rawgithub.com/bojzi/sound-machine/master/sketch/sound-machine.png)