const express = require('express')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')
const cookieParser = require('cookie-parser')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')

const router = require('./backend/router.js')
const webpackConfig = require('./build/webpack.dev.conf')

const app = express()
const port = process.env.PORT || 8080
const complier = webpack(webpackConfig)

app.use(webpackDevMiddleware(complier, {
    publicPath: webpackConfig.output.publicPath,
}))
// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json  
app.use(bodyParser.json())
// parse formdata
app.use(multipart())
// parse cookie
app.use(cookieParser())


app.use('/api', router)

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})