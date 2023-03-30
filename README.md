# Aaron Hung - IS-24 Full Stack Developer Code Challenge req97073

## This project

* This project is my solution for the IS-24 Full Stack Developer Code Challenge req97073.
* Please see below for technologies used, and instructions to install and run this project.

## Technologies used

* Web languages
    * HTML
    * CSS
    * JavaScript
* Front-end framework
    * React.js
* Back-end web application framework
    * Express.js
* Server environment
    * Node.js
* Node.js module
    * dotenv
    * react-router-dom
    * swagger-jsdoc
    * swagger-ui-express

## Getting Started - Instruction to install and run this project

### Clone this project

* In the terminal, navigate to a desire folder:
* Run `git clone https://github.com/ahung1709/Aaron-Hung-IS24-full-stack-competition-req97073.git`

### Navigate to the project directory

* Run `cd Aaron-Hung-IS24-full-stack-competition-req97073`

### Install dependencies of this project

* Run `npm i`

### Create a build directory with a production build of this project

* Run `npm run build`

### Add environment variable to set fron-end server to run on PORT 3001 to avoid colliding with back end server which will run on PORT 3000 (This step is optional by entering `y` when you are asked a question after running `npm start` - see next step)

* Open the code of project, and add .env file in the root directory.
* Open the .env file, add `PORT=3001`, and save the file.

### Run back-end server and front-end server in two separate terminals

* Keep the existing terminal, and open a new terminal and navigate to the project directory.
* In one terminal, run `nodemon server`
    * If nodemon is not install, run `npm i -g nodemon` before running `nodemon server` to install nodemon.
* In another terminal, run `npm start`
    * If no environment variable is added, enter `y` when you are asked "Would you like to run the app on another port instead?".
* The app should run automatically in your browser.  If your app does not start automatically, open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### View API Swagger Documentation

* Open [http://localhost:3000/api/api-docs](http://localhost:3000/api/api-docs) to view it in your browser.
    

