/*
Author: Jordan Winslow
Description: This code demonstrates basic knowledge of how Node.js http servers work behind the scenes without utilizing a framework like express. This is for educational purposes only.
*/

const fs = require("fs")

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method
  if (url === "/") {
    res.write("<html>")
    res.write("<head><title>Enter Message</title><head>")
    res.write(
      '<body><h2>Enter a message to be written to a text file</h2><br /><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    )
    res.write("</html>")
    return res.end()
  }
  if (url === "/message" && method === "POST") {
    const body = []
    req.on("data", chunk => {
      console.log(chunk)
      body.push(chunk)
    })
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split("=")[1]
      fs.writeFile("message.txt", message, () => {
        console.log(message)
        res.statusCode = 302
        res.setHeader("Location", "/")
        return res.end()
      })
    })
  }
  res.setHeader("Content-Type", "text/html")
  res.write("<html>")
  res.write("<head><title>My First Node Server</title><head>")
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>")
  res.write("</html>")
  res.end()
}

module.exports = requestHandler

/* we can also export multiple values as follows:
exports.handler = requestHandler
exports.somethingElse = somethingElse

or 

module.exports = {handler: requestHandler, somethingElse: somethingElse}
*/