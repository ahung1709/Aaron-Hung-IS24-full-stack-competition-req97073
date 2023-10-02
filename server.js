const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")
const logger = require("morgan")

const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")

require("dotenv").config()

const app = express()

app.use(logger("dev"))
app.use(express.json())

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")))
app.use(express.static(path.join(__dirname, "build")))

app.use("/api/product", require("./routes/api/products"))

// Definition for Swagger documentation
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Aaron Hung IS-24 Full Stack Competition API Documentation",
            version: "0.1",
            description:
          "This is a product management API application made with Express and documented with Swagger",
            contact: {
                name: "Aaron Hung",
                url: "https://www.linkedin.com/in/aaron-h-b608ab142/",
                email: "ahungwork@yahoo.ca",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["./routes/api/*.js"],
}

// setup Swagger UI to serve Swagger documentation
const spacs = swaggerjsdoc(options)
app.use(
    "/api/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
)

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const expressPort = 3000

app.listen(expressPort, function() {
    console.log(`Express app running on port ${expressPort}`)
})

app.use(express.static(path.join(__dirname, "build")))

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})
