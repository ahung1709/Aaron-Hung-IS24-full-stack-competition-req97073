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
* Run <span style="background-color:lightgrey">`git clone https://github.com/ahung1709/Aaron-Hung-IS24-full-stack-competition-req97073.git`</span>

### Navigate to the project directory

* Run <span style="background-color:lightgrey">`cd Aaron-Hung-IS24-full-stack-competition-req97073`</span>

### Install dependencies of this project

* Run <span style="background-color:lightgrey">`npm i`</span>

### Create a build directory with a production build of this project

* Run <span style="background-color:lightgrey">`npm run build`</span>

### Add environment variable to set fron-end server to run on PORT 3001 to avoid colliding with back end server which will run on PORT 3000 (Optional - This step can be ignored by entering <span style="background-color:lightgrey">`y`</span> when you are asked a question after running <span style="background-color:lightgrey">`npm start`</span> - see next step)

* Open the code of project, and add .env file in the root directory.
* Open the .env file, add <span style="background-color:lightgrey">`PORT=3001`</span>, and save the file.

### Run back-end server and front-end server in two separate terminals

* Keep the existing terminal, and open a new terminal and navigate to the project directory.
* In one terminal, run <span style="background-color:lightgrey">`nodemon server`</span>
    * If nodemon is not install, run <span style="background-color:lightgrey">`npm i -g nodemon`</span> before running <span style="background-color:lightgrey">`nodemon server`</span> to install nodemon.
* In another terminal, run <span style="background-color:lightgrey">`npm start`</span>
    * If no environment variable is added, enter <span style="background-color:lightgrey">`y`</span> when you are asked "Would you like to run the app on another port instead?".
* The app should run automatically in your browser.  If your app does not start automatically, open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### View API Swagger Documentation

* Open [http://localhost:3000/api/api-docs](http://localhost:3000/api/api-docs) to view it in your browser.
    

