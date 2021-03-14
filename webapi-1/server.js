const http = require('http')
const port = process.env.port || 9191
const app = require('./app')
const mongodb = require('mongoose')
require('dotenv').config()

const serverUri = 'http://localhost:' + port
const mongoUri = process.env.DATABASE_URI
  

// webserver
  http.createServer(app).listen(port, () => console.log('WEBSERVER: ' + serverUri))

// connecting to mongodb database
mongodb
.set('useCreateIndex', true)
.connect(mongoUri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MONGODB: Running'))
.catch((error) => console.log(error))