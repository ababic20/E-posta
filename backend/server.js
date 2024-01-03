const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const RestUser = require("./services/restUser.js");
const restuser = new RestUser();
const RestMessages = require("./services/restMessages.js");
const restmessages = new RestMessages();
const app = express()
const port = 3001

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  restuser.getUser(req,res)
})

app.post('/register', (req, res) => {
  restuser.insertUser(req,res)
})

app.get('/sentMessages', (req, res) => {
  restmessages.getSentMessages(req,res)
})

app.get('/receivedMessages', (req, res) => {
  restmessages.getReceivedMessages(req,res)
})

app.get('/updateMessageStatus', (req, res) => {
  restmessages.setMessageStatus(req,res)
})

app.post('/send', (req, res) => {
  restmessages.sendMessage(req,res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})