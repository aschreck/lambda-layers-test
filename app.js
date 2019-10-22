const express = require("express");
const fs = require("fs");
const app = express();
const sls = require('serverless-http');
const port = 3000;

const configHandler = (req, res) => {
  if (!req.query.selection || !(req.query.selection == "a" || req.query.selection == "b")) {
    res.status(400);
    res.send("Improper Query Parameters")
  }
  let data = fs.readFileSync("./data.json")

  data = JSON.parse(data);
  if (req.query.selection == "a") {
    data = data["a"]
  } else {
    data = data["b"]
  }
  console.log(data)
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data, null, 4))
}

app.get('/config', configHandler);

module.exports.server = sls(app);
// app.listen(port, () => console.log(`Lambda test app listening on port ${port}!`))