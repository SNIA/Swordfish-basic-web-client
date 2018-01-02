Copyright 2017 Storage Networking Industry Association (SNIA), USA. All rights reserved. For the full SNIA copyright policy, see http://www.snia.org/about/corporate_info/copyright

Contributors that are not SNIA members must first agree to the terms of the SNIA Contributor Agreement for Non-Members:  www.snia.org/cla 

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
Run the below commands in terminal/console window.
  1. `cd views && npm install`
     `cd views` changes the current working directory(project) path to views folder where angular application resides, `npm install`  will install all modules listed as dependencies in  `package.json` in to the local `node_modules` folder.  which are required to run the angular application.
     
  2. `cd.. && npm install`
     `cd..` reverts the path from views folder to project folder. `npm install`  install all modules listed as dependencies in project's `package.json` in to the local `node_modules` folder required to run the node application.
     
  3. `npm start`
     This runs an arbitrary command specified in the package.json's  "start" property of its "scripts" object.Npm scripts let you group together and run logically related commands and establishes a development server to execute the  code , launches the application on browser.
     
  4. Open `http://localhost:3000/` in your browser to access the Web Client.
   `npm start` will launch the application on browser's  http protocal and localhost as IPaddress  on port 4200
  
# Credentials to access the Web Client:
  Username: snia@gmail.com<br />
  Password: snia@123
  
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
