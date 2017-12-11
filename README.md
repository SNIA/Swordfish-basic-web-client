Copyright 2017 Storage Networking Industry Association (SNIA), USA. All rights reserved. For the full SNIA copyright policy, see http://www.snia.org/about/corporate_info/copyright

Contributors that are not SNIA members must first agree to the terms of the SNIA Contributor Agreement for Non-Members:  www.snia.org/cla 

# Swordfish-basic-web-client
The Swordfish Basic Web Client can connect to one or more Swordfish services (including the Swordfish emulator), and present in a web UI frame the entire Swordfish hierarchy.  The basic web client also provides basic capabilities to modify configurable Properties (as specified in the schema), as well an providing a basic interface to add or remove elements from the service through a Web UI.

# Prerequisites
Install `node.js` and `npm` if they are not already on your machine.
Verify that you are running at least node 8.x.x and npm 5.x.x by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.

Run `commands.bat` file to install angular-cli and express globally.
OR 
Run `npm install -g express`
Run `npm install -g @angular/cli@latest`

# Development server
Run `cd views && npm install` for a dev server. It Install's all the dependencies in the local node_modules folder.By default, npm install will install all modules listed as dependencies in package.json ,for angular-cli project.

Run `cd..`

Run `npm install` to add all the dependencies required to run node application.

Run `npm start` after installation of dependencies. Navigate to `http://localhost:3000/`. 
