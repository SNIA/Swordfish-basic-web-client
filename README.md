Copyright 2017 Storage Networking Industry Association (SNIA), USA. All rights reserved. For the full SNIA copyright policy, see http://www.snia.org/about/corporate_info/copyright

Contributors that are not SNIA members must first agree to the terms of the SNIA Contributor Agreement for Non-Members:  www.snia.org/cla 

# Swordfish-basic-web-client
The Swordfish Basic Web Client can connect to one or more Swordfish services (including the Swordfish emulator), and present in a web UI frame the entire Swordfish hierarchy.  The basic web client also provides basic capabilities to modify configurable Properties (as specified in the schema), as well an providing a basic interface to add or remove elements from the service through a Web UI.

# Prerequisites
1.	Install `node.js` and `npm` if they are not already on your machine.
    Verify that you are running at least node 8.x.x and npm 5.x.x by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.
2.	Run `commands.bat` file to install angular-cli and express globally.
OR
Run the following commands in terminal/console window.
  1.	`npm install -g express`,
  2.	`npm install -g @angular/cli@latest`
# Web Client Installation
Run the below commands in terminal/console window.
  1. `cd views && npm install`
  2. `cd.. && npm install`
  3. `npm start`
Open `http://localhost:3000/` in your browser to access the Web Client.
Credentials to access the Web Client:
  Username: snia@gmail.com
  Password: snia@123
# Supported Browsers
1.	Chrome( Latest version), 
2.	Firefox(Latest version), 
3.	IE	(Versions 9,10,11 ), 
4.	Edge	(V14,13),
5.	Safari	(V7,8,9,10),
6.	IOS	(V7,8,9,10),
7.	Android	
  •	Nougat (V7.0),
  •	Marshmallow (V6.0),
  •	Lollipop (V5.0, 5.1),
  •	KitKat (V4.4),
  •	Jelly Bean (V4.1, 4.2, 4.3),
8.	IE Mobile	(V11)
