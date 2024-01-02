const express = require('express')
const bodyParser = require('body-parser');
const RestUser = require("./services/restUser.js");
const restuser = new RestUser();
const app = express()
const port = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  restuser.getUser(req,res)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})