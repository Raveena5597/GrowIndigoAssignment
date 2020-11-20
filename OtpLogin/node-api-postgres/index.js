require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const db = require('./queries')
const port = process.env.PORT || 8000

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))
app.get('/', (request, response) => { response.json({ info: 'Node.js,Express and Postgresql API' }) })
app.get('/users', db.getUsers)
app.post('/createuser', db.postUsers)
app.use('/verify', require('./verify'))
app.get('/finduser', db.findUser)
app.listen(port, () => { console.log(`App is running on port ${port}`) })