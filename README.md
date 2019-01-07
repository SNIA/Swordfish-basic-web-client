Copyright 2017-2018 Storage Networking Industry Association (SNIA), USA. All rights reserved. For the full SNIA copyright policy, see http://www.snia.org/about/corporate_info/copyright

Contributors that are not SNIA members must first agree to the terms of the SNIA Contributor Agreement for Non-Members:  https://www.snia.org/cla 

# Swordfish-basic-web-client
The Swordfish Basic Web Client can connect to one or more Swordfish services (including the Swordfish emulator), and present in a web UI frame the entire Swordfish hierarchy.  The basic web client also provides basic capabilities to modify configurable Properties (as specified in the schema), as well an providing a basic interface to add or remove elements from the service through a Web UI.

# Prerequisites
1.	Install `node.js` and `npm` if they are not already on your machine.<br />
    Verify that you are running at least node 8.x.x and npm 5.x.x by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.<br />
2.	Run `commands.bat` file to install angular-cli and express globally.<br />
OR<br />
Run the following commands in terminal/console window.<br />
  • 	`npm install -g express`,<br />
  •	  `npm install -g @angular/cli@latest`
  
# Web Client Installation

Run the below commands in terminal/console window, if you are running the application for the first time.
  1. `cd views && npm install` <br />
     `cd views` changes the current working directory(project) path to views folder where angular application resides, `npm install`  will install all modules listed as dependencies in  `package.json` in to the local `node_modules` folder.  which are required to run the angular application. <br />
     
  2.`ng build` <br />
     The `ng build` command is intended for building the app and deploying the build artifacts. The build artifacts will be stored in the dist/ directory
     
  3. `cd .. && npm install` <br />
     `cd ..` reverts the path from views folder to project folder. `npm install`  install all modules listed as dependencies in project's `package.json` in to the local `node_modules` folder required to run the node application.
	  
  4. `npm start` <br />
     This runs an arbitrary command specified in the package.json's  "start" property of its "scripts" object.Npm scripts let you group together and run logically related commands and establishes a development server to execute the  code , launches the application on browser. <br />
     
  4. Open `http://localhost:3000/` in your browser to access the Web Client. <br />
   `npm start` will launch the application on browser's  http protocol and localhost as IPaddress  on port 3000 <br />
   
** Note: build to angular application is required  upon any pull request or if, any changes are detected. Follow the below steps to build and run the application <br />
  1. `cd views && ng build` <br />
  2. `cd .. && npm start` <br />
  
  Or <br /> 
  Directly run the application using `npm start`.


  
# Default Credentials to access the Web Client:
  Username: swordfish@snia.org<br />
  Password: snia@123<br />
  
 The information about the credentials are listed in `views/src/assets/json/login.json` file
  
# Supported Browsers
1.	Chrome( Latest version), 
2.	Firefox(Latest version), 
3.	IE	(Versions 9,10,11 ), 
4.	Edge	(V14,13),
5.	Safari	(V7,8,9,10),
6.	IOS	(V7,8,9,10),
7.	Android	<br />
  •	Nougat (V7.0),<br />
  •	Marshmallow (V6.0),<br />
  •	Lollipop (V5.0, 5.1),<br />
  •	KitKat (V4.4),<br />
  •	Jelly Bean (V4.1, 4.2, 4.3),<br />
8.	IE Mobile	(V11)
