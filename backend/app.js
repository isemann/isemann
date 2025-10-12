const https = require('https')
const fs = require('fs');
const options = {
  key: fs.readFileSync('isemann_at.key'),
  cert: fs.readFileSync('fullchain.pem'),
};

require("dotenv").config(); // install dependency with npm install dotenv to import .env variables
const influxConnectTem = require("./queryTem"); //import query
const influxConnectHum = require("./queryHum"); //import query
const influxConnectPre = require("./queryPre"); //import query
const influxConnectBat = require("./queryBat"); //import query

const app = https.createServer(options, async (req, res) => {
  const url = req.url
  console.log(url)
  if (url === '/tem') {
    const data = await influxConnectTem()
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify(data.temData))
  }
  if (url === '/hum') {
    const data = await influxConnectHum()
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify(data.humData))
  }
  if (url === '/pre') {
    const data = await influxConnectPre()
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify(data.preData))
  }
  if (url === '/bat') {
    const data = await influxConnectBat()
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify(data.batData))
  }
}
)

const PORT = process.env.PORT || 8088
//const hostname = '127.0.0.1';

app.listen(8088, () => {
  console.log(`Server is listening on port ${PORT}`)
})