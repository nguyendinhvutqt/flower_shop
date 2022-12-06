const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const connectDB = require('./configs/configDB')
const configViewEngine = require('./configs/configViewEngine')
const routes = require('./routes/index')

const app = express();
const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/user', express.static(path.join(__dirname, 'public')))

configViewEngine(app);
connectDB()

routes(app)

app.listen(port, () => console.log('Server is running on port ' + port))