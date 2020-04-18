const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

// app set up
// morgan and bodyParser are middlewares
app.use(morgan("combined")); // morgan is a logging framework so you will see the incoming requests
app.use(bodyParser.json({ type: "*/*" })); // parse every incoming request to json

//server setup using http.createServer
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
// you cam simply do app.listen(port)
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on", port);
