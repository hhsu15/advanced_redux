const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");
const app = express();

// DB set up
// previously I had mogodb://localhost/auth:auth but it does not work!!
mongoose.connect("mongodb://localhost/auth");

// app set up
// morgan and bodyParser are middlewares
app.use(morgan("combined")); // morgan is a logging framework so you will see the incoming requests
app.use(bodyParser.json({ type: "*/*" })); // parse every incoming request to json, the regex pattern means it takes any request type

// wire router to app
router(app);

//server setup using http.createServer
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
// you cam simply do app.listen(port)
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on", port);
