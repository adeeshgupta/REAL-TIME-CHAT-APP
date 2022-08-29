const bodyParser = require("body-parser")
const compression = require("compression")
const cors = require("cors")

module.exports = function (app) {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))
    // parse application/json
    app.use(bodyParser.json())
    // compression of data
    app.use(compression(9))
    // CORS
    app.use(cors())
}