const express = require('express')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 8080
const router = require('./backend/router.js')

// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json  
app.use(bodyParser.json())
// parse formdata
app.use(multipart())
// parse cookie
app.use(cookieParser())


app.use('/api', router)
app.get('/', (req, res) => {
    res.end('index')
})
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})