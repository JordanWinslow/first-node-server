/*
Author: Jordan Winslow
Description: This code demonstrates basic knowledge of how Node.js http servers work behind the scenes without utilizing a framework like express. This is for educational purposes only.
*/
const http = require("http")

const routing = require("./routing")

const server = http.createServer(routing)

server.listen(3000)
