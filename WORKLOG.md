
# Rostro - Remote hoST contROller Development LOG

Step 1) Install Node.js
--
Check what version of node.js should be installed on your system using the command: 
  "uname -m"
If the response starts with armv6 than that's the version that you will need.

Go to https://nodejs.org/en/download/ select the right version to download, 
then unzip the bundle in your system to /usr/local 
In this way node will be automatically added to path; to check if everything it's ok, run 
  "node -v"

Nice and simple tutorial on node.js: https://www.youtube.com/watch?v=TlB_eWDSMt4

Step 2) Configure Node.js application
--
Configure package.json to add "express" and "body-parser" 
Then run
  "npm install"

Step 3) Define the REST api
--
Using "os" default node.js modules (https://nodejs.org/api/os.html)
The call to "../system-info" should return a list of useful thinks of the system where node.js is running.
The call to "../" should serve an HTML file which should be BUILT with 
  "ng build" 
executed in the frontend application folder (https://expressjs.com/en/starter/static-files.html)

Step 4) Install Angular-cli and build a new Angular Project
--
To install CLI globally:
  "npm install -g @angular/cli"
  
Create a new Project: 
  "ng new my-project"

Build the project:
  "ng build"
The last command should produce the files in the folder "dist" that we should copy 
into the "public" location of node.js application.

Step 5) Use PM2 to RUN node.js application
--
Run
  "npm install pm2 -g"
Next execute
  "pm2 start app.js"
The application should be fine and running. 

Step 6) Using Bootstrap
--
Installing angular powered bootstrap 
with : 
  "npm install --save @ng-bootstrap/ng-bootstrap"
https://ng-bootstrap.github.io/
( the package will be automatically added to the package.json file ) 
and then including the bootstrap CDN into the index.html

Step 7) Defining Model class and a controller + HttpService to execute scheduled RestCalls 
--
export class SystemInfo {
  freemem: string; 
  .....
}
https://www.typescriptlang.org/docs/handbook/basic-types.html
and then using HttpClient module to execute calls but scheduled (to be called every 2 seconds)
using interval from 'rxjs/internal/observable/interval';
and startWith - switchMap from 'rxjs/operators';

remember to register the service into the providers listed in app.module.ts.

Step 9) added canvas to plot memory trend
--
Added chart.js using https://github.com/valor-software/ng2-charts.
Run:
  "npm install ng2-charts chart.js --save
Then add into angular.json the "chart.js" script (no need to add it to index.hmtl!)

Step 10) canvas of memory trend now updates and contains 100 values already at start 
--
Step 11) added HDD information on rest calling
--
Install new module for get disk information https://www.npmjs.com/package/diskspace
Defined new module "disk-service.js" which internally uses the one in link.
I've wrapped inside the js module the information about the os platform, to provide the module as simple as possible.

Step 12) splitted the call to the Node.js app to "polling" and "load" 
--
to not overload the network with not changing information.

Step 13) added photobox getting shit on flikr
--
Still I have to create custom angular2 module for this, without using jquery.
Next, I'll have to host the page using Apache HTTP server.
Next, I'll have to automatically generate thumbnails for my photos.
Next, I'll have to provide the same api now provided by flikr on my raspberry using node JS
The homepage should contain the folders where the server can find images

Step 14) chart js for HDD info
--
Chart js now correctly displays a doughnut for HDD free / used information.

Step 15) TANOPI Becoming a PWA
--
- I have installed an nginx server on host, with self signed certificates ( cert-bot on PI ) serving on port 80 and 443.
- Configured a domain (192.168.1.9) to serve on private ip (93.58.74.222)
- Configured gateway on router to PI host on demilitarized zone
- Installed angular PWA using ng add @angular/pwa
- Upgraded modules version
- Removed useless deployed shit
- Added readme

Step 16) removed photobox
--
Removed; It's out of the scope of this application.

Step 17) Automated build. Making repository private
--

Step 18) Login mask and routing
--
Added login mask and routing

Step 19) Restyling
--

Step 20) Added ping information
--
Added new accordion in home module with the information about the ping executed.

Step 21) GeoLocalized host position
--

Step 22) Added progress bar for mem ram and cpu percentages
--

Step 23) Used socket.io to get info about cpu ram and mem in realtime
--
I have used https://socket.io/docs/#Sending-volatile-messages

Step 24) Save DB informations 
--
- Install mongodb;
- create script to initialize schema
- save db/ram/temperature/cpu info on db each N minutes
- use capped collections

```
MongoDB: https://www.npmjs.com/package/mongodb
Mongoose : https://www.npmjs.com/package/mongoose
InstallDB on Debian    -> https://andyfelong.com/2019/03/mongodb-4-0-6-64-bit-on-raspberry-pi-3/
InstallDB on Raspberry -> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/
MongoShell useful commands: 
   https://docs.mongodb.com/manual/reference/mongo-shell/
- mongo
- show dbs
- use local
- show collections
- db.collection.find()
- db.collection.drop()
```
Step 25) Refactor  
--
Removed call to /Polling now using only socket.io (step23). Y axis for ram data

Step 26) Refactor 2
--
Moved graph of CPU and ram into correct position; enhanced ram with available memory(buffered)

Step 27) Renaming
--
1) project renamed in host-checker
2) changed backgrounds
3) change %occupied with %free
4) fixed some nullpointers

Step 28) Ping
--
Ping for windows hosts

Step 29) styling app + committed some libs for solid documentation
--

Step 30) general information
--

Step 31) added processes information
--

Step 32)  installed on raspberry
--

Step 33) killing process based on PID
-- 

Step 34) search processes based on name
--

Step 35) add port on process using tooltip
---
https://stackblitz.com/edit/ngbs-tooltip-dyn?file=app%2Ftooltip-tplwithcontext.ts

Step 36)  JWT shit
--
- add jwt token authentication https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
- added token-interceptor for all requests
- added redirect to login page if any 401 error code gets returned from server
- added cors handling on server

Step 37) Enabling private VPN, watering plants 
--

1) abilitare ssh 

2) connettersi in ssh tramite: raspberry /pi 

3) sudo apt-get update
   sudo apt-get full-upgrade
   
4) curl -L https://install.pivpn.io | bash

5) sudo pivpn add

6) installare 
--- GIT, 
sudo apt install git

--- NPM,NODE
sudo apt install nodejs

--- MONGODB, 
sudo apt install mongodb
sudo systemctl enable mongodb

--- NGINX
sudo apt install nginx
sudo /etc/init.d/nginx start

--- make
sudo apt-get install build-essential

--- uhubctl
sudo apt-get install libusb-1.0-0-dev
git clone https://github.com/mvp/uhubctl
cd uhubctl/
sudo make install 
